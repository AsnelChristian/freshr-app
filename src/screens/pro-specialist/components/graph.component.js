import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useAnimatedProps,
  useDerivedValue,
  interpolate,
} from "react-native-reanimated";
import {
  getYForX,
  mixPath,
  parse,
  ReText,
  round,
  useVector,
  Vector,
} from "react-native-redash";
import { rgba } from "polished";
import { theme } from "../../../infrastructure/theme";
import Svg, { G, Path } from "react-native-svg";
import { Spacer } from "../../../components/spacer/spacer.component";
import { PaddedContainer } from "../../components/details-screen.component";
import { Text } from "../../../components/typography/typography.component";
import styled, { useTheme } from "styled-components/native";
import { BlurView } from "expo-blur";
import { scaleLinear, scaleTime } from "d3-scale";
import { curveBasis, line } from "d3-shape";

const CURSOR = 50;
const styles = StyleSheet.create({
  cursor: {
    width: CURSOR,
    height: CURSOR,
    borderRadius: CURSOR / 2,
    backgroundColor: rgba(theme.colors.brand.quaternary, 0.2),
    justifyContent: "center",
    alignItems: "center",
  },
  cursorBody: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: "white",
  },
});

const GlassBackground = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 15px;
`;

const ChartButton = styled.TouchableOpacity`
  padding: 8px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  position: relative;
`;

export const Cursor = ({ index, translation }) => {
  const isActive = useSharedValue(true);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      isActive.value = true;
    },
    onActive: (event) => {
      translation.x.value = event.x;
      translation.y.value = getYForX(index, translation.x.value) || 0;
    },
    onEnd: () => {
      isActive.value = true;
    },
  });

  const style = useAnimatedStyle(() => {
    const translateX = translation.x.value - CURSOR / 2;
    const translateY = translation.y.value - CURSOR / 2;
    return {
      transform: [
        { translateX },
        { translateY },
        { scale: withSpring(isActive.value ? 1 : 0) },
      ],
    };
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.cursor, style]}>
            <View style={styles.cursorBody} />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const GRAPH_HEIGHT = 150;
const GRAPH_WIDTH = Dimensions.get("window").width;
const AnimatedPath = Animated.createAnimatedComponent(Path);

const BalanceView = ({ translation, index, xScale }) => {
  const theme = useTheme();
  // const data = useDerivedValue(() => index);
  const price = useDerivedValue(() => {
    const p = interpolate(
      translation.y.value,
      [0, GRAPH_WIDTH],
      [index.max, index.min]
    );
    return `$ ${round(p, 1).toLocaleString("en-US", { currency: "USD" })}`;
  });
  // const percentChange = useDerivedValue(
  //   () => `${round(data.value.percentChange, 3)}%`
  // );
  // const convert = (param) => {
  //   return `${xScale.invert(param)}`;
  // };
  // const label = useDerivedValue(() => translation.x.value);
  // const style = useAnimatedStyle(() => ({
  //   fontWeight: "500",
  //   fontSize: 24,
  //   color: data.value.percentChange > 0 ? "green" : "red",
  // }));
  // console.log(label);
  return (
    <View style={{ padding: 16 }}>
      <GlassBackground intensity={10} />

      {/*<ReText*/}
      {/*  style={{*/}
      {/*    fontSize: 14,*/}
      {/*    textTransform: "uppercase",*/}
      {/*    color: theme.colors.ui.quaternary,*/}
      {/*    letterSpacing: 1,*/}
      {/*  }}*/}
      {/*  text={label}*/}
      {/*/>*/}
      {/*<Spacer position="bottom" size="medium" />*/}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/*<Feather name="dollar-sign" size={40} color="white" />*/}
        {/*<Spacer position="left" size="medium" />*/}
        <ReText
          style={{ color: "white", fontSize: 28, fontWeight: "bold" }}
          text={price}
        />
      </View>
    </View>
  );
};

export const makeGraph = (data) => {
  const max = Math.max(...data.map((val) => val.value));
  const min = Math.min(...data.map((val) => val.value));
  const y = scaleLinear().domain([0, max]).range([GRAPH_HEIGHT, 35]);

  const x = scaleTime()
    .domain([new Date(2000, 1, 1), new Date(2000, 1, 15)])
    .range([0, GRAPH_WIDTH - 10]);

  const curvedLine = line()
    .x((d) => x(new Date(d.date)))
    .y((d) => y(d.value))
    .curve(curveBasis)(data);

  return [
    x,
    {
      max,
      min,
      curve: parse(curvedLine),
    },
  ];
};

export const LineChart = ({
  height,
  width,
  data,
  bottomPadding,
  leftPadding,
  setBalance,
}) => {
  const translation = useVector();
  const selectedGraph = useSharedValue(0);
  const previousGraph = useSharedValue(0);
  const isAnimationComplete = useSharedValue(true);
  const transition = useSharedValue(1);
  const [currentGraph, setCurrentGraph] = useState(0);

  const onQuarterTapped = (quarter) => {
    setCurrentGraph(quarter - 1);
    setBalance(quarter - 1);

    if (isAnimationComplete.value) {
      isAnimationComplete.value = false;
      transition.value = 0;
      selectedGraph.value = quarter - 1;
      transition.value = withTiming(1, {}, () => {
        previousGraph.value = selectedGraph.value;
        isAnimationComplete.value = true;
      });
    }
  };

  const animatedProps = useAnimatedProps(() => {
    return {
      d: mixPath(
        transition.value,
        data[previousGraph.value][1].curve,
        data[selectedGraph.value][1].curve
      ),
    };
  });

  const q1Tapped = () => onQuarterTapped(1);
  const q2Tapped = () => onQuarterTapped(2);
  const q3Tapped = () => onQuarterTapped(3);
  const q4Tapped = () => onQuarterTapped(4);

  const buttons = [
    { action: q1Tapped, label: "1 Y" },
    { action: q2Tapped, label: "1 M" },
    { action: q3Tapped, label: "1 W" },
    { action: q4Tapped, label: "Today" },
  ];

  return (
    <>
      <View>
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            top: 0,
            left: 16,
          }}
        >
          <BalanceView
            translation={translation}
            index={data[selectedGraph.value][1]}
            xScale={data[selectedGraph.value][0]}
          />
        </View>
        <Animated.View>
          <Svg width={width} height={height} stroke="white">
            <G>
              <AnimatedPath animatedProps={animatedProps} strokeWidth="2" />
            </G>
          </Svg>
        </Animated.View>
        <Cursor
          translation={translation}
          index={data[selectedGraph.value][1].curve}
        />

        <Spacer position="top" size="large" />
        <PaddedContainer
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {buttons.map((button, index) => (
            <View key={`${index}-chart`} style={{ flexDirection: "row" }}>
              <ChartButton onPress={button.action}>
                <GlassBackground
                  intensity={currentGraph === index ? 100 : 30}
                  style={{ borderRadius: 8 }}
                />
                <Text style={{ color: "white", fontSize: 14 }}>
                  {button.label}
                </Text>
              </ChartButton>
              <Spacer position="left" size="medium" />
            </View>
          ))}
        </PaddedContainer>
      </View>
    </>
  );
};

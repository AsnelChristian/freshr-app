import styled, { useTheme } from "styled-components/native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SceneMap, TabView } from "react-native-tab-view";
import BottomSheet from "@gorhom/bottom-sheet";
import { renderTabBar } from "../../normal-app/utils";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { HistoryCard } from "./history-card.component";
import { Text } from "../../../components/typography/typography.component";

const GlassBackground = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 15px;
`;

const QueueCardContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  position: relative;
  overflow: hidden;
`;
const CustomerProfile = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 55px;
  overflow: hidden;
`;

const QueueCard = ({ index, expand }) => {
  const theme = useTheme();
  const customerProfilePicture =
    "https://media.istockphoto.com/photos/barber-shop-owner-wearing-protective-face-mask-and-cutting-customers-picture-id1297946321?b=1&k=20&m=1297946321&s=170667a&w=0&h=fyWRxzdghvvsuRnpE0C1gbwby5A1JQukbRFZxLz9XiM=";
  const name = "John doe";

  return (
    <QueueCardContainer style={{ backgroundColor: theme.colors.ui.quaternary }}>
      <GlassBackground intensity={10} />
      <CustomerProfile source={{ uri: customerProfilePicture }} />
      <Spacer position="left" size="medium" />
      <View style={{ flex: 1 }}>
        <Text variant="caption" style={{ fontSize: 14 }}>
          {name}
        </Text>
        <Spacer position="bottom" size="medium" />
        <Text>4 services</Text>
      </View>
      <View style={{ flex: 1 }} />
      <TouchableOpacity onPress={expand}>
        <Ionicons name="expand" size={24} color="black" />
      </TouchableOpacity>
    </QueueCardContainer>
  );
};

export const ProActivityModal = (props) => {
  const theme = useTheme();
  // ref
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ["20%", "40%", "60", "85%"], []);
  const [index, setIndex] = useState(0);
  const [routesWithQueue] = useState([
    { key: "queue", title: "Queue" },
    { key: "history", title: "History" },
  ]);

  const [routesWithoutQueue] = useState([{ key: "history", title: "History" }]);

  const renderHistory = () => {
    return (
      <View style={{ position: "relative" }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
          renderItem={({ item }) => (
            <View key={item.id}>
              <HistoryCard />
              <Spacer position="bottom" size="medium" />
            </View>
          )}
          keyExtractor={(item) => item.id}
          // style={{ backgroundColor: theme.colors.ui.quaternary }}
        />
      </View>
    );
  };

  const renderQueue = () => {
    return (
      <View>
        <Spacer position="top" size="large" />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
          renderItem={({ item }) => (
            <View key={item.id}>
              <QueueCard index={item.id} expand={props.expand} />
              <Spacer position="bottom" size="medium" />
            </View>
          )}
          keyExtractor={(item) => item.id}
          // style={{ backgroundColor: theme.colors.ui.quaternary }}
        />
      </View>
    );
  };

  const renderSceneWithQueue = SceneMap({
    history: renderHistory,
    queue: renderQueue,
  });

  const renderSceneWithoutQueue = SceneMap({
    history: renderHistory,
    queue: renderQueue,
  });

  const isQueue = true;

  // callbacks
  const handleSheetChanges = useCallback((i) => {
    console.log("Handle changes", i);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={props.index}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      style={{ borderRadius: 30, overflow: "hidden" }}
      elevation={3}
      enablePanDownToClose={false}
    >
      <View style={{ flex: 1, position: "relative" }}>
        <Spacer position="bottom" size="large" />
        <TabView
          renderTabBar={(params) =>
            renderTabBar({ scrollable: false, ...params })
          }
          navigationState={{
            index,
            routes: isQueue ? routesWithQueue : routesWithoutQueue,
          }}
          renderScene={isQueue ? renderSceneWithQueue : renderSceneWithoutQueue}
          onIndexChange={setIndex}
          // initialLayout={{ width: "100%" }}
          style={{ height: 400 }}
        />
      </View>
    </BottomSheet>
  );
};

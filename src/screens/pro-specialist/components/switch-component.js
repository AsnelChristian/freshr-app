import { Switch } from "react-native-switch";
import { useTheme } from "styled-components/native";

export const SwitchInput = ({
  value,
  trueAction,
  falseAction,
  color = "default",
  circleColor = "white",
}) => {
  const theme = useTheme();
  return (
    <Switch
      value={value}
      onValueChange={(val) => (val ? trueAction() : falseAction())}
      disabled={false}
      activeText={"Online"}
      inActiveText={"Offline"}
      circleSize={28}
      barHeight={18}
      circleBorderWidth={1}
      backgroundActive={theme.colors.brand.primary}
      backgroundInactive={color === "default" ? theme.colors.ui.border : color}
      circleActiveColor={circleColor}
      circleInActiveColor={circleColor}
      // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
      changeValueImmediately={false} // if rendering inside circle, change state immediately or wait for animation to complete
      innerCircleStyle={{
        alignItems: "center",
        justifyContent: "center",
      }} // style for inner animated circle for what you (may) be rendering inside the circle
      outerCircleStyle={{}} // style for outer animated circle
      renderActiveText={true}
      renderInActiveText={true}
      switchLeftPx={3} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
      switchRightPx={3} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
      switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
      switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
    />
  );
};

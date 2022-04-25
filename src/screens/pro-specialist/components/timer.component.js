import { useTheme } from "styled-components/native";
import { Text } from "../../../components/typography/typography.component";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export const TimerView = ({ duration, size = 70 }) => {
  const theme = useTheme();
  return (
    <CountdownCircleTimer
      isPlaying={true}
      duration={180}
      size={size}
      strokeWidth={4}
      colors={[
        theme.colors.brand.quaternary,
        theme.colors.brand.primary,
        theme.colors.brand.secondary,
        "#A30000",
      ]}
      colorsTime={[10, 6, 3, 0]}
      onComplete={() => ({ shouldRepeat: true, delay: 2 })}
    >
      {({ remainingTime, color }) => (
        <Text style={{ color, fontSize: 16 }}>{remainingTime}</Text>
      )}
    </CountdownCircleTimer>
  );
};

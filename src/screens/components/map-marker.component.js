import React from "react";
import { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";

import { useTheme } from "styled-components/native";

export const MapMarker = (props) => {
  const theme = useTheme();
  const { coordinate, onPress, isSelected } = props;
  return (
    <Marker coordinate={coordinate} onPress={onPress}>
      <FontAwesome
        name="map-marker"
        size={30}
        color={
          isSelected ? theme.colors.brand.secondary : theme.colors.ui.primary
        }
      />
    </Marker>
  );
};

export const MapMarkerLocation = (props) => {
  const theme = useTheme();
  const { coordinate } = props;
  return (
    <Marker coordinate={coordinate} draggable>
      <FontAwesome
        name="map-marker"
        size={30}
        color={theme.colors.ui.primary}
      />
    </Marker>
  );
};

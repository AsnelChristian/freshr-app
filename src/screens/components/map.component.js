import React, { useEffect, useRef, useState } from "react";
import MapView from "react-native-maps";

import styled, { useTheme } from "styled-components/native";
import { Dimensions, View } from "react-native";
import { MapMarker } from "./map-marker.component";
import Carousel from "react-native-snap-carousel";
import { connect } from "react-redux";
import { selectFacility } from "../../redux/booking/booking.actions";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { IconButton } from "../../components/button/button.component";
import { useNavigation } from "@react-navigation/native";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import { rgba } from "polished";
import { LinearGradient } from "expo-linear-gradient";

const mapStyles = require("./mapStyles.json");
const { width } = Dimensions.get("window");

const MapOuterContainer = styled.View.attrs((props) => ({
  shadowColor: props.theme.colors.ui.border,
  shadowOffset: {
    width: 10,
    height: 10,
  },
  shadowOpacity: 1,
  shadowRadius: 5,
}))`
  position: relative;
  ${({ fullMap }) =>
    fullMap
      ? "flex: 1"
      : "elevation: 50; flex-direction: column; align-items: center; justify-content: center; margin: 1px; flex: 1; overflow: hidden;"};
`;
const MapContainer = styled(MapView)`
  ${({ fullMap }) =>
    fullMap
      ? "position: absolute; top: 0; bottom: 0; left: 0; right: 0; flex: 1; height: 100%"
      : "height: 300px; width: 100%; border-radius: 30px; overflow: hidden"};
`;

const DataContainer = styled.View`
  ${({ carouselBottom, theme }) =>
    carouselBottom
      ? "position: absolute; top: 12px;  left: 0px; right: 0;"
      : `padding: 8px 0px; background-color: transparent;`};
`;

const ContainerGradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ExpandButtonContainer = styled.View`
  position: absolute;
  bottom: 16px;
  right: 8px;
`;

const Map = ({
  location = {},
  data,
  renderItem,
  itemWidth,
  fullMap = true,
  resizeMap,
  carouselBottom = true,
  ...restProps
}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { lat = 37.788221, lng = -122.43232 } = location;
  const flatList = useRef();
  const map = useRef();

  useEffect(() => {
    if (!restProps.selectedFacility || !flatList) {
      return;
    }
    const index = data.findIndex(
      (item) => item.id === restProps.selectedFacility.id
    );
    flatList.current?.snapToItem(index);

    const selectedData = data[index];
    const region = {
      latitude: selectedData.location.lat,
      longitude: selectedData.location.lng,
      latitudeDelta: 0.08,
      longitudeDelta: 0.02,
    };
    map.current?.animateToRegion(region);
  }, [restProps.selectedFacility]);

  return (
    <>
      {!fullMap &&
        <View style={{ paddingHorizontal: 24, backgroundColor: "white"}}>
        <Spacer position="bottom" size="medium" />

        <Text
          variant="caption"
          style={{
            fontSize: 13,
            color: theme.colors.brand.quaternary,
          }}
        >
          Press{" "}
          <Text
            variant="caption"
            style={{ fontSize: 16, color: theme.colors.brand.secondary }}
          >
            show results
          </Text>{" "}
          and pick the right professional for you
        </Text>
        <Spacer position="bottom" size="large" />
      </View>}
      <MapOuterContainer fullMap={fullMap}>
        <MapContainer
          fullMap={fullMap}
          customMapStyle={mapStyles}
          ref={map}
          region={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.8,
            longitudeDelta: 0.8,
          }}
          provider="google"
        >
          {data.map((item) => (
            <MapMarker
              key={`marker-${item.id}`}
              coordinate={{
                latitude: item.location.lat,
                longitude: item.location.lng,
              }}
              isSelected={
                restProps.selectedFacility
                  ? item.id === restProps.selectedFacility.id
                  : false
              }
              onPress={() => restProps.setFacility(item)}
            />
          ))}
        </MapContainer>
          <ExpandButtonContainer>
            <IconButton
              active={false}
              activeColor={'white'}
              inactiveColor={theme.colors.brand.secondary}
              onPress={() => resizeMap()}
            >
              {!fullMap ? <FontAwesome name="expand" size={20} color={"white"} /> : <Entypo name="resize-100" size={24} color="white" />}
                </IconButton>
          </ExpandButtonContainer>


      </MapOuterContainer>
      <DataContainer carouselBottom={carouselBottom}>
        {!fullMap && (
          <>
            {/*<ContainerGradient*/}
            {/*  colors={[*/}
            {/*    rgba(theme.colors.brand.quaternary, 1),*/}
            {/*    rgba(theme.colors.brand.primary, 1),*/}
            {/*  ]}*/}
            {/*  start={[0, 1]}*/}
            {/*  end={[1, 0]}*/}
            {/*/>*/}

            {/*<View style={{ paddingHorizontal: 16, backgroundColor: theme.colors.brand.secondary}}>*/}
            {/*  <Spacer position="bottom" size="medium" />*/}

            {/*  <Text*/}
            {/*    variant="caption"*/}
            {/*    style={{*/}
            {/*      fontSize: 16,*/}
            {/*      fontWeight: "normal",*/}
            {/*      textAlign: "center",*/}
            {/*      color: "white",*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    Press{" "}*/}
            {/*    <Text*/}
            {/*      variant="caption"*/}
            {/*      style={{ fontSize: 16, color: theme.colors.brand.quaternary }}*/}
            {/*    >*/}
            {/*      show results*/}
            {/*    </Text>{" "}*/}
            {/*    and pick the right professional for you*/}
            {/*  </Text>*/}
            {/*  <Spacer position="bottom" size="large" />*/}
            {/*</View>*/}
          </>
        )}
        <Carousel
          ref={flatList}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `bottom-flat-map-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          sliderWidth={width}
          itemWidth={(width - 48) * 0.97}
          onSnapToItem={(index) => restProps.setFacility(data[index])}
        />
      </DataContainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  selectedFacility: state.booking.facility,
});

const mapDispatchToProps = (dispatch) => ({
  setFacility: (facility) => dispatch(selectFacility(facility)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);

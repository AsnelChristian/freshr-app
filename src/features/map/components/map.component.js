import { useEffect, useRef, useState } from "react";
import MapView from "react-native-maps";

import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { MapMarker } from "../../../../../freshr-app-clone/src/screens/components/map-marker.component";
import Carousel from "react-native-snap-carousel";
import { connect } from "react-redux";

const MapContainer = styled(MapView)`
  flex: 1;
`;

const DataContainer = styled.View`
  position: absolute;
  bottom: ${({ theme }) => theme.space[2]};
  left: 0;
  right: 0;
`;

const Map = ({
  location = {},
  data, page= "facility",
  renderItem,
  itemWidth,
  selectedFacility
}) => {
  const { lat = 46.829853, lng = -71.254028 } = location;
  const [selectedDataId, setSelectedDataId] = useState(null);
  const flatList = useRef();
  const map = useRef();

  useEffect(() => {
    if (!selectedDataId || !flatList) {
      return;
    }
    const index = data.findIndex((item) => item.id === selectedDataId);
    flatList.current?.snapToItem(index);

    const selectedData = data[index];
    const region = {
      latitude: selectedData.location.lat,
      longitude: selectedData.location.lng,
      latitudeDelta: 0.8,
      longitudeDelta: 0.02,
    };
    map.current?.animateToRegion(region);
  }, [selectedDataId]);

  return (
    <>
      <MapContainer
        ref={map}
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.8,
          longitudeDelta: 0.8,
        }}
      >
        {data.map((item) => (
          <MapMarker
            key={`marker-${item.id}`}
            coordinate={{
              latitude: item.location.lat,
              longitude: item.location.lng,
            }}
            isSelected={item.id === selectedDataId}
            onPress={() => setSelectedDataId(item.id)}
          />
        ))}
      </MapContainer>
      <DataContainer facilitySelected={(selectedFacility && page === "facility") }>
        <Carousel
          ref={flatList}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `bottom-flat-map-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={itemWidth}
          onSnapToItem={(index) => setSelectedDataId(data[index].id)}
        />
      </DataContainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  selectedFacility: state.booking.facility,
});

export default connect(mapStateToProps, null)(Map);

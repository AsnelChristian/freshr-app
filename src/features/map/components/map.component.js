import { useEffect, useRef, useState } from "react";
import MapView from "react-native-maps";

import styled from "styled-components/native";
import { SpecialistCard } from "./specialist-card.component";
import { Dimensions, FlatList } from "react-native";
import { MapMarker } from "./map-marker.component";

const MapContainer = styled(MapView)`
  flex: 1;
`;

const DataContainer = styled.View`
  padding: 0px ${({ theme }) => theme.space[2]};
  position: absolute;
  bottom: ${({ theme }) => theme.space[2]};
`;

export const Map = ({ location = {}, renderItem, onItemPress }) => {
  const data = [
    {
      id: "1234",
      coverImage:
        "https://media.gq-magazine.co.uk/photos/5efcae3187e549a3c5063a64/master/w_1920,h_1280,c_limit/20200701-barbers-02.jpg",
      name: "John doe",
      address: "Koblenz metternich",
      rating: 4.3,
      ratingCnt: 1003,
      priceRange: [15, 60],
      location: {
        lat: 46.829853,
        lng: -71.254028,
      },
      gallery: [
        "https://i2-prod.manchestereveningnews.co.uk/incoming/article21411590.ece/ALTERNATES/s615/0_gettyimages-1207048163-170667a.jpg",
        "https://media.beam.usnews.com/d7/18/446edaba4d22a0da5d6f382c5e54/hairdresser.jpg",
        "https://st2.depositphotos.com/2931363/9695/i/950/depositphotos_96952024-stock-photo-young-handsome-man-in-barbershop.jpg",
        "https://ak.picdn.net/shutterstock/videos/9643772/thumb/1.jpg",
        "https://www.thebarbersinc.com/cwsd.php?Z3AuPTQ0MQ/NDM/Zmp8ZClraXIjNit4f2Q.jpg",
      ],
      serviceCnt: 20,
    },
    {
      id: "1235",
      coverImage:
        "http://americanbarber.org/wp-content/uploads/2021/09/iStock-1302315949-Copy-scaled.jpg",
      name: "Philips McGood",
      address: "Utah washington",
      rating: 4.3,
      ratingCnt: 1003,
      priceRange: [15, 60],
      serviceCnt: 20,
      location: {
        lat: 46.629853,
        lng: -71.354028,
      },
      gallery: [
        "https://i2-prod.manchestereveningnews.co.uk/incoming/article21411590.ece/ALTERNATES/s615/0_gettyimages-1207048163-170667a.jpg",
        "https://media.beam.usnews.com/d7/18/446edaba4d22a0da5d6f382c5e54/hairdresser.jpg",
        "https://st2.depositphotos.com/2931363/9695/i/950/depositphotos_96952024-stock-photo-young-handsome-man-in-barbershop.jpg",
        "https://ak.picdn.net/shutterstock/videos/9643772/thumb/1.jpg",
        "https://www.thebarbersinc.com/cwsd.php?Z3AuPTQ0MQ/NDM/Zmp8ZClraXIjNit4f2Q.jpg",
      ],
    },
    {
      id: "1236",
      coverImage:
        "https://www.betterteam.com/images/barber-job-description-5184x3456-20201124.jpeg?crop=40:21,smart&width=1200&dpr=2",
      name: "Paul walker",
      address: "Munich planegg campus",
      rating: 4.3,
      ratingCnt: 1003,
      priceRange: [15, 60],
      serviceCnt: 20,
      location: {
        lat: 46.529853,
        lng: -71.154028,
      },
      gallery: [
        "https://i2-prod.manchestereveningnews.co.uk/incoming/article21411590.ece/ALTERNATES/s615/0_gettyimages-1207048163-170667a.jpg",
        "https://media.beam.usnews.com/d7/18/446edaba4d22a0da5d6f382c5e54/hairdresser.jpg",
        "https://st2.depositphotos.com/2931363/9695/i/950/depositphotos_96952024-stock-photo-young-handsome-man-in-barbershop.jpg",
        "https://ak.picdn.net/shutterstock/videos/9643772/thumb/1.jpg",
        "https://www.thebarbersinc.com/cwsd.php?Z3AuPTQ0MQ/NDM/Zmp8ZClraXIjNit4f2Q.jpg",
      ],
    },
  ];
  const { lat = 46.829853, lng = -71.254028 } = location;
  const [selectedDataId, setSelectedDataId] = useState(null);
  const flatList = useRef();
  const map = useRef();

  const viewConfig = useRef({ itemVisiblePercentThreshold: 70 });
  const onViewChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const selectedData = viewableItems[0].item;
      setSelectedDataId(selectedData.id);
    }
  });

  useEffect(() => {
    if (!selectedDataId || !flatList) {
      return;
    }
    const index = data.findIndex((item) => item.id === selectedDataId);
    flatList.current?.scrollToIndex({ index });

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
      <DataContainer>
        <FlatList
          ref={flatList}
          data={data}
          renderItem={({ item }) => (
            <SpecialistCard
              onPress={() => onItemPress(item)}
              specialist={item}
            />
          )}
          keyExtractor={(item) => `bottom-flat-map-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={Dimensions.get("window").width - 70}
          snapToAlignment={"center"}
          decelerationRate={"fast"}
          viewabilityConfig={viewConfig.current}
          onViewableItemsChanged={onViewChanged.current}
        />
      </DataContainer>
    </>
  );
};

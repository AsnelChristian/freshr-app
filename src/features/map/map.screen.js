import styled from "styled-components/native";
import MapView from "react-native-maps";
import { useCallback, useMemo, useRef } from "react";
import { Entypo, FontAwesome, Octicons } from "@expo/vector-icons";
import { Text } from "../../components/typography/typography.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { SafeArea } from "../../components/utils/safearea.component";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Button, View, StyleSheet } from "react-native";

const MapScreenContainer = styled.View`
  flex: 1;
  background-color: white;
`;

const MapScreenHeader = styled.View`
  padding: ${({ theme }) => theme.space[3]};
  elevation: 2;
`;
const MapScreenSearchBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SearchButton = styled.TouchableOpacity`
  flex: 1;
  padding: ${({ theme }) => theme.space[3]};
  border-radius: ${({ theme }) => theme.space[4]};
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  flex-direction: row;
  align-items: center;
`;

const ResultFilterButton = styled.TouchableOpacity``;

const SearchFilter = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.space[4]};
  elevation: 2;
  background-color: white;
  margin: 1px;
`;

const MapContainer = styled.View`
  flex: 1;
`;

const Map = styled(MapView)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
`;

const FilterContainer = styled.ScrollView``;

export const MapScreen = () => {
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const filters = [
    {
      name: "Type of service",
      right: "dropdown",
    },
    { name: "services", right: "count", value: 0 },
    { name: "gender", value: "", right: "dropdown" },
    { name: "Price range", right: "dropdown", value: "" },
  ];

  const createFilterButton = (filter) => {
    let right;
    if (filter.right === "dropdown") {
      right = <Entypo name="chevron-down" size={16} color="black" />;
    } else {
      right = <Text variant="body">({filter.value})</Text>;
    }
    return (
      <Spacer position="right" size="small">
        <SearchFilter onPress={handlePresentModalPress}>
          <Text variant="body">{filter.name}</Text>
          <Spacer position="left" size="small" />
          {right}
        </SearchFilter>
      </Spacer>
    );
  };
  return (
    <SafeArea>
      <MapScreenContainer>
        <MapScreenHeader>
          <MapScreenSearchBar>
            <SearchButton>
              <FontAwesome name="search" size={20} />
              <Spacer position="left" size="medium">
                <Text variant="body" style={{ color: "gray" }}>
                  Search services...
                </Text>
              </Spacer>
            </SearchButton>
            <Spacer position="left" size="large">
              <ResultFilterButton>
                <Octicons name="settings" size={25} />
              </ResultFilterButton>
            </Spacer>
          </MapScreenSearchBar>
          <Spacer position="top" size="medium">
            <FilterContainer
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              {filters.map((filter) => createFilterButton(filter))}
            </FilterContainer>
          </Spacer>
          <Spacer position="bottom" size="small" />
        </MapScreenHeader>

        <MapContainer>
          <Map />
        </MapContainer>
      </MapScreenContainer>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

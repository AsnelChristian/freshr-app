import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";


import { SectionTitle } from "../../screens/components/details-screen.component";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/typography.component";
import { Row } from "../helpers/helpers.component";
import SpecialistCard from "../../screens/components/specialist-card.component";
import { setSortMethod } from "../../redux/booking/booking.actions";
import { SortButton, SortFilterContainer, SortFilterContainerSeparator } from "./bottom-sheet.component";

const SpecialistsModalComponent = (props) => {
  // ref
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ["1%", "40%", "93%"], []);

  // callbacks
  const handleSheetChanges = useCallback((i) => {
    props.setIndex(i);
    console.log("Handle changes", i);
  }, []);

  const checkSortMethod = (label) => {
    return label === props.sortMethod;
  };

  const handleSortButtonPress = (label) => {
    props.setSortMethod(label);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={props.index}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      style={{ borderRadius: 30, overflow: "hidden" }}
      elevation={1}
      enablePanDownToClose={true}
    >
      <View style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <SectionTitle>Professionals</SectionTitle>
          <Spacer position="bottom" size="medium" />
          <Text variant="caption">Select professional and book a seat</Text>
          <Spacer position="bottom" size="large" />
          <Spacer position="bottom" size="medium" />

          <Row>
            <MaterialIcons name="sort" size={16} />
            <Spacer position="left" size="medium" />
            <Text variant="caption" style={{ fontSize: 16 }}>
              Sort by
            </Text>
          </Row>

          <Spacer position="bottom" size="medium" />
          <SortFilterContainer>
            <SortButton
              active={checkSortMethod("pricing")}
              onPress={() => handleSortButtonPress("pricing")}
            >
              <Text
                variant="caption"
                style={{
                  color: checkSortMethod("pricing") ? "white" : "black",
                }}
              >
                Pricing
              </Text>
            </SortButton>
            <SortFilterContainerSeparator />
            <SortButton
              active={checkSortMethod("popularity")}
              onPress={() => handleSortButtonPress("popularity")}
            >
              <Text
                variant="caption"
                style={{
                  color: checkSortMethod("popularity") ? "white" : "black",
                }}
              >
                Popularity
              </Text>
            </SortButton>
            <SortFilterContainerSeparator />
            <SortButton
              active={checkSortMethod("rating")}
              onPress={() => handleSortButtonPress("rating")}
            >
              <Text
                variant="caption"
                style={{ color: checkSortMethod("rating") ? "white" : "black" }}
              >
                Rating
              </Text>
            </SortButton>
          </SortFilterContainer>
        </View>

        <BottomSheetFlatList
          style={{ paddingHorizontal: 16 }}
          showsVerticalScrollIndicator={false}
          data={props.facility ? props.facility.professionals : []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SpecialistCard
              navigation={props.navigation}
              onPress={() => {
                props.setSpecialist(item);
                props.navigation.navigate("SpecialistDetails", {
                  edit: false,
                });
              }}
              specialist={item}
            />
          )}
        />
      </View>
    </BottomSheet>
  );
};

const mapStateToProps = (state) => ({
  sortMethod: state.booking.sortBy,
});

const mapDispatchToProps = (dispatch) => ({
  setSortMethod: (method) => dispatch(setSortMethod(method)),
});

export const SpecialistsModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpecialistsModalComponent);

import React, { useEffect, useState } from "react";

import styled, { useTheme } from "styled-components/native";
import { connect } from "react-redux";
import {
  Content,
  PageContainer,
  Row,
  Separator,
} from "../../components/helpers/helpers.component";
import { renderSearch } from "./utils";
import { SafeArea } from "../../components/utils/safearea.component";
import {
  Entypo,
  Feather,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Spacer } from "../../components/spacer/spacer.component";
import Map from "../components/map.component";
import FacilityCard from "../components/facility-card.component";
import { setMatchingFacilities } from "../../redux/facilities/facilities.actions";
import { facilitiesMock } from "../../mocks/facilities-mock";
import { specialistsMock } from "../../mocks/specialists-mock";
import { setMatchingSpecialists } from "../../redux/specialists/specialists.action";
import {
  clearCart,
  selectFacility,
  setSpecialist,
} from "../../redux/booking/booking.actions";
import { rgba } from "polished";
import {
  FilterButton,
  IconButton,
} from "../../components/button/button.component";
import { SpecialistsModal } from "../../components/bottom-sheet/SpecialistModal";
import { SearchRadiusModal } from "../../components/bottom-sheet/SearchRadiusModal";
import { CategoryModal } from "../../components/bottom-sheet/CategoryModal";
import { SortFacilityModal } from "../../components/bottom-sheet/SortFacilityModal";
import { LocationModal } from "../../components/bottom-sheet/LocationModal";
import { GenderModal } from "../../components/bottom-sheet/GenderModal";
import { PriceRangeModal } from "../../components/bottom-sheet/PriceRangeModal";

const FiltersContainer = styled.ScrollView``;

const SearchCategory = styled.View`
  border-radius: 30px;
  height: 60%;
  align-items: center;
  justify-content: center;
  padding: 0px ${({ theme }) => theme.space[2]};
  background-color: ${({ theme }) => theme.colors.brand.primary};
  margin-right: 4px;
`;

const SearchMapScreen = (props) => {
  const theme = useTheme();
  const [showSortFacilityFilter, setShowSortFacilityFilter] = useState(false);
  const [showSearchRadiusFilter, setShowSearchRadiusFilter] = useState(false);
  const [showGenderFilter, setShowGenderFilter] = useState(false);
  const [showPriceRangeFilter, setShowPriceRangeFilter] = useState(false);
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [bottomSheetIndex, setBottomSheetIndex] = useState(0);

  const handleShowGenderFilterChange = () => {
    setShowGenderFilter(!showGenderFilter);
  };

  const handleShowPriceRangeFilterChange = () => {
    setShowPriceRangeFilter(!showPriceRangeFilter);
  };

  const handleShowLocationFilterChange = () => {
    setShowLocationFilter(!showLocationFilter);
  };

  const handleShowCategoryFilterChange = () => {
    setShowCategoryFilter(!showCategoryFilter);
  };

  const handleShowSortFacilityFilterChange = () => {
    setShowSortFacilityFilter(!showSortFacilityFilter);
  };

  const handleShowSearchRadiusFilterChange = () => {
    setShowSearchRadiusFilter(!showSearchRadiusFilter);
  };

  const renderPriceRange = (value) => {
    return (
      <Text variant="caption" style={{ fontSize: 14, fontWeight: "bold" }}>
        <Feather name="dollar-sign" size={16} />
        {value[0]} - <Feather name="dollar-sign" size={16} />
        {value[1]}
      </Text>
    );
  };

  const renderGender = (value) => {
    return (
      <Text
        variant="caption"
        style={{
          fontSize: 14,
          fontWeight: "bold",
        }}
      >
        Style for {value}
      </Text>
    );
  };

  const renderCategory = (value) => {
    return (
      <Text
        variant="caption"
        style={{
          fontSize: 14,
          fontWeight: "bold",
        }}
      >
        {value.name}
      </Text>
    );
  };

  const renderSearchRadius = (value) => {
    return (
      <Text
        variant="caption"
        style={{
          fontSize: 14,
          fontWeight: "bold",
        }}
      >
        Distance {value} km
      </Text>
    );
  };

  const renderSortFacility = (value) => {
    return (
      <Row>
        <MaterialIcons name="sort" size={16} />
        <Spacer position="left" size="medium" />
        <Text
          variant="caption"
          style={{
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {value}
        </Text>
      </Row>
    );
  };

  const renderFilterButton = (
    label,
    active,
    value,
    renderValue,
    handlePress
  ) => {
    return (
      <FilterButton active={active || value} onPress={handlePress}>
        <Text
          variant="caption"
          style={{
            color:
              active || value
                ? theme.colors.ui.primary
                : rgba(theme.colors.ui.primary, 0.7),
            fontSize: 12,
            fontWeight: active || value ? "bold" : "normal",
          }}
        >
          {value ? renderValue(value) : label}
        </Text>
        <Spacer position="left" size="medium" />
        <Entypo name="chevron-down" color={theme.colors.ui.border} />
      </FilterButton>
    );
  };

  const renderSearchBar = () => {
    const renderSearchBarLeft = () => {
      return (
        <>
          {props.currentService ? (
            <SearchCategory>
              <Text variant="caption" style={{ color: "white" }}>
                {props.currentService.name}
              </Text>
            </SearchCategory>
          ) : (
            props.category && (
              <SearchCategory>
                <Text variant="caption" style={{ color: "white" }}>
                  {props.category.name}
                </Text>
              </SearchCategory>
            )
          )}
        </>
      );
    };
    return (
      <Row style={{ justifyContent: "space-between" }}>
        <IconButton
          active={false}
          activeColor={theme.colors.ui.primary}
          inactiveColor={theme.colors.ui.quaternary}
          onPress={() => setShowLocationFilter(!showLocationFilter)}
        >
          <FontAwesome name="location-arrow" size={20} />
        </IconButton>
        <Spacer position="left" size="medium" />
        {renderSearch(
          props.navigation,
          true,
          "Search services...",
          renderSearchBarLeft
        )}
      </Row>
    );
  };

  const renderFilters = () => {
    return (
      <FiltersContainer horizontal showsHorizontalScrollIndicator={false}>
        {renderFilterButton(
          "Gender",
          showGenderFilter,
          props.targetGender,
          renderGender,
          handleShowGenderFilterChange
        )}
        <Spacer position="left" size="medium" />
        {renderFilterButton(
          "Type of service",
          showCategoryFilter,
          props.category,
          renderCategory,
          handleShowCategoryFilterChange
        )}
        <Spacer position="left" size="medium" />
        {renderFilterButton(
          "Price range",
          showPriceRangeFilter,
          props.priceRange,
          renderPriceRange,
          handleShowPriceRangeFilterChange
        )}
        <Spacer position="left" size="medium" />
        {renderFilterButton(
          "Sort by",
          showSortFacilityFilter,
          props.sortFacilitiesBy,
          renderSortFacility,
          handleShowSortFacilityFilterChange
        )}

        <Spacer position="left" size="medium" />
        {renderFilterButton(
          "Search radius",
          showSearchRadiusFilter,
          props.searchRadius,
          renderSearchRadius,
          handleShowSearchRadiusFilterChange
        )}
      </FiltersContainer>
    );
  };

  const renderMap = () => {
    return (
      <View style={{ flex: 1 }}>
        <Map
          data={props.facilities}
          bottomMargin={30}
          itemWidth={340}
          renderItem={({ item }) => (
            <FacilityCard
              handleMorePress={() =>
                props.navigation.navigate("FacilityDetails", { facility: item })
              }
              facility={item}
              handleViewResultPress={() => setBottomSheetIndex(1)}
            />
          )}
        />
      </View>
    );
  };

  return (
    <SafeArea>
      <PageContainer>
        <Content>
          {renderSearchBar()}
          <Spacer position="bottom" size="medium" />
          <Spacer position="bottom" size="small" />
          { renderFilters()}
          <Spacer position="bottom" size="medium" />
        </Content>
        {renderMap()}
      </PageContainer>
      <PriceRangeModal
        showModal={showPriceRangeFilter}
        toggleShowModal={handleShowPriceRangeFilterChange}
      />
      <GenderModal
        showModal={showGenderFilter}
        toggleShowModal={handleShowGenderFilterChange}
      />
      <LocationModal
        showModal={showLocationFilter}
        toggleShowModal={handleShowLocationFilterChange}
      />
      <SortFacilityModal
        showModal={showSortFacilityFilter}
        toggleShowModal={handleShowSortFacilityFilterChange}
      />
      <CategoryModal
        showModal={showCategoryFilter}
        toggleShowModal={handleShowCategoryFilterChange}
      />
      <SearchRadiusModal
        showModal={showSearchRadiusFilter}
        toggleShowModal={handleShowSearchRadiusFilterChange}
      />
      <SpecialistsModal
        navigation={props.navigation}
        setSpecialist={props.setSpecialist}
        results={props.specialists}
        index={bottomSheetIndex}
        setIndex={(i) => setBottomSheetIndex(i)}
      />
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({
  selectedFacility: state.booking.facility,
  facilities: state.facilities.facilities,
  specialists: state.specialists.specialists,
  targetGender: state.booking.targetGender,
  priceRange: state.booking.priceRange,
  category: state.booking.currentCategory,
  currentService: state.booking.currentService,
  sortFacilitiesBy: state.booking.sortFacilitiesBy,
  searchRadius: state.booking.searchRadius,
});

const mapDispatchToProps = (dispatch) => ({
  setMatchingFacilities: (facilities) =>
    dispatch(setMatchingFacilities(facilities)),
  setMatchingSpecialists: (specialists) =>
    dispatch(setMatchingSpecialists(specialists)),
  setFacility: (facility) => dispatch(selectFacility(facility)),
  setSpecialist: (specialist) => dispatch(setSpecialist(specialist)),
  resetCart: () => dispatch(clearCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchMapScreen);

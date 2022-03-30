import { connect } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import {
  FilterButton,
  IconButton,
} from "../components/button/button.component";

import { SafeArea } from "../components/utils/safearea.component";
import { Text } from "../components/typography/typography.component";
import {
  Content,
  PageContainer,
  Row,
  Separator,
} from "../components/helpers/helpers.component";
import { Spacer } from "../components/spacer/spacer.component";
import { FlatGrid } from "react-native-super-grid";
import { renderSearch } from "./utils";
import {
  clearCart,
  selectFacility,
  setCurrentCategory,
  setSpecialist,
} from "../redux/booking/booking.actions";
import React, { useEffect, useState } from "react";
import { setMatchingFacilities } from "../redux/facilities/facilities.actions";
import { setMatchingSpecialists } from "../redux/specialists/specialists.action";
import {
  CategoryModal,
  GenderModal,
  LocationModal,
  PriceRangeModal,
  SearchRadiusModal,
  SortFacilityModal,
  SpecialistsModal,
} from "../components/bottom-sheet/bottom-sheet.component";
import { rgba } from "polished";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Map from "./components/map.component";
import FacilityCard from "./components/facility-card.component";
import { facilitiesMock } from "../mocks/facilities-mock";
import { specialistsMock } from "../mocks/specialists-mock";
import { SectionTitle } from "./components/details-screen.component";

// const GradientBackground = styled(LinearGradient)`
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
// `;
//
// const CategoryCard = styled.TouchableOpacity`
//   height: 70px;
//   padding: ${({ theme }) => theme.space[2]};
//   text-align: center;
//   border-radius: 5px;
//   justify-content: center;
//   align-items: center;
//   position: relative;
//   overflow: hidden;
// `;
//
// const CategoryCardSelected = styled.View`
//   position: absolute;
//   top: 4px;
//   left: 4px;
//   background-color: ${({ theme }) => theme.colors.ui.primary};
//   height: 20px;
//   width: 20px;
//   border-radius: 100px;
//   z-index: 3;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
// `;

const HomeScreen = (props) => {
  const theme = useTheme();
  const [showFilters, setShowFilters] = useState(true);
  const [showSortFacilityFilter, setShowSortFacilityFilter] = useState(false);
  const [showSearchRadiusFilter, setShowSearchRadiusFilter] = useState(false);
  const [showGenderFilter, setShowGenderFilter] = useState(false);
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  const [showPriceRangeFilter, setShowPriceRangeFilter] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [bottomSheetIndex, setBottomSheetIndex] = useState(0);

  useEffect(() => {
    props.setMatchingFacilities(facilitiesMock);
    props.setMatchingSpecialists(specialistsMock);
    props.setFacility(facilitiesMock[0]);

    return () => {
      props.resetCart();
    };
  }, [props.navigation.route]);

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

  // const renderCategoryButton = (gradient, category) => {
  //   const active = props.category
  //     ? props.category.name === category.name
  //     : false;
  //   const buttonGradient = active ? ["#d53369", "#daae51"] : gradient;
  //   return (
  //     <CategoryCard
  //       style={{
  //         shadowColor: "#000",
  //         shadowOffset: {
  //           width: 0,
  //           height: 3,
  //         },
  //         shadowOpacity: 0.27,
  //         shadowRadius: 4.65,
  //         elevation: 6,
  //       }}
  //       onPress={() => {
  //         props.setCurrentCategory(category);
  //       }}
  //     >
  //       {active && (
  //         <CategoryCardSelected>
  //           <AntDesign name="check" size={16} color="white" />
  //         </CategoryCardSelected>
  //       )}
  //       <GradientBackground
  //         colors={buttonGradient}
  //         start={[0, 1]}
  //         end={[1, 0]}
  //       />
  //       {/*<Feather name="scissors" size={50} color="white" />*/}
  //       {/*<Spacer position="bottom" size="medium" />*/}
  //       <Text
  //         variant="caption"
  //         style={{
  //           fontSize: 14,
  //           color: "white",
  //           letterSpacing: 1,
  //           textTransform: "uppercase",
  //         }}
  //       >
  //         {category.name}
  //       </Text>
  //     </CategoryCard>
  //   );
  // };

  const renderHeader = () => {
    return (
      <View>
        <Row style={{ padding: 16, backgroundColor: "white" }}>
          <Row>
            <Entypo
              name="location-pin"
              size={22}
              color={theme.colors.brand.primary}
            />
            <Spacer position="left" size="medium" />
            <TouchableOpacity
              style={{ width: "70%" }}
              onPress={() => setShowLocationFilter(!showLocationFilter)}
            >
              <Text variant="caption">Current location</Text>
              <Spacer position="bottom" size="small" />
              <Text
                variant="caption"
                numberOfLines={1}
                ellipsis="tail"
                style={{ fontSize: 16, width: "100%" }}
              >
                Koblenz metterninch
              </Text>
            </TouchableOpacity>
          </Row>
        </Row>
        <Separator />
      </View>
    );
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
        Gender
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
            fontSize: 14,
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
    return (
      <Row style={{ justifyContent: "space-between" }}>
        {renderSearch(props.navigation, true, "Search services...")}
        <Spacer position="left" size="medium" />
        <IconButton
          active={false}
          activeColor={theme.colors.ui.primary}
          inactiveColor={theme.colors.ui.quaternary}
          onPress={() => setShowFilters(!showFilters)}
        >
          <FontAwesome name="filter" size={20} />
        </IconButton>
      </Row>
    );
  };

  const renderFilters = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {props.currentService && (
          <>
            <FilterButton
              onPress={() => props.navigation.navigate("Search")}
              style={{
                borderColor: "white",
                backgroundColor: theme.colors.brand.primary,
              }}
            >
              <Text
                variant="caption"
                style={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                {props.currentService.name}
              </Text>
              <Spacer position="left" size="medium" />
              <Entypo name="chevron-down" color="white" />
            </FilterButton>
            <Spacer position="left" size="medium" />
          </>
        )}
        {renderFilterButton(
          "Type of service",
          showCategoryFilter,
          props.category,
          renderCategory,
          handleShowCategoryFilterChange
        )}
        <Spacer position="left" size="medium" />
        {renderFilterButton(
          "Gender",
          showGenderFilter,
          props.targetGender,
          renderGender,
          handleShowGenderFilterChange
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
      </ScrollView>
    );
  };

  // const gradients = [
  //   ["#00C9FF", "#92FE9D"],
  //   ["#92FE9D", "#00C9FF"],
  //   ["#00C9FF", "#92FE9D"],
  //   ["#92FE9D", "#00C9FF"],
  // ];

  return (
    <SafeArea>
      {renderHeader()}
      <PageContainer>
        <Content>
          {renderSearchBar()}
          <Spacer position="bottom" size="medium" />
          <Spacer position="bottom" size="small" />
          {showFilters && renderFilters()}
          <Spacer position="bottom" size="medium" />
          <Spacer position="bottom" size="large" />
          <SectionTitle>Facilities near by</SectionTitle>
          <Spacer position="bottom" size="medium" />
          <Text variant="caption">
            Filter the facilities and professional by your preferences
          </Text>
          {/*<FlatGrid*/}
          {/*  data={props.categories}*/}
          {/*  spacing={4}*/}
          {/*  renderItem={({ item, index }) =>*/}
          {/*    renderCategoryButton(gradients[index], item)*/}
          {/*  }*/}
          {/*/>*/}
          <Spacer position="bottom" size="large" />
          <View>
            <Map
              fullMap={false}
              carouselBottom={false}
              data={props.facilities}
              bottomMargin={30}
              itemWidth={340}
              renderItem={({ item }) => (
                <FacilityCard
                  handleMorePress={() =>
                    props.navigation.navigate("FacilityDetails", {
                      facility: item,
                    })
                  }
                  facility={item}
                  handleViewResultPress={() => setBottomSheetIndex(1)}
                />
              )}
            />
          </View>
        </Content>
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
  categories: state.categories.categories,
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
  setCurrentCategory: (category) => dispatch(setCurrentCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

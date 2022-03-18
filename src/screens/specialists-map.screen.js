import styled, { useTheme } from "styled-components/native";
import React, { useEffect, useState } from "react";
import { Entypo, FontAwesome, Octicons } from "@expo/vector-icons";

import { connect } from "react-redux";
import { clearCart, setSpecialist } from "../redux/booking/booking.actions";

import { Text } from "../components/typography/typography.component";
import { Spacer } from "../components/spacer/spacer.component";
import { SafeArea } from "../components/utils/safearea.component";
import {
  GenderModal,
  PriceRangeModal,
  LocationModal,
  ServiceTypeModal,
  SortFilterModal,
  ServicesModal,
} from "../features/map/components/filter-modal.component";
import Map from "../features/map/components/map.component";
import { specialistsMock } from "./mock/specialists.mock";
import { setMatchingSpecialists } from "../redux/specialists/specialists.action";
import { SpecialistCard } from "../features/map/components/specialist-card.component";
import {rgba} from "polished";

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
  border: 2px solid ${({theme}) => rgba(theme.colors.ui.primary, 0.08)};

  flex-direction: row;
  align-items: center;
`;

const ResultFilterButton = styled.TouchableOpacity``;

const SearchFilter = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ variant, theme }) =>
    variant ? theme.colors.ui.primary : "white"};
  padding: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.space[4]};
  border: 2px solid ${({theme}) => rgba(theme.colors.ui.primary, 0.1)};
  margin: 1px;
`;

const MapContainer = styled.View`
  flex: 1;
`;

const FilterContainer = styled.ScrollView``;

const SpecialistsMapScreen = ({ navigation, ...props }) => {
  const theme = useTheme();
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showGenderFilter, setShowGenderFilter] = useState(false);
  const [showServiceTypeFilter, setShowServiceTypeFilter] = useState(false);
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  const [showServicesFilter, setShowServicesFilter] = useState(false);
  const [showSortFilter, setShowSortFilter] = useState(false);
  const [locationFilter, setLocationFilter] = useState([]);
  const [priceRange, setPriceRange] = useState([8, 15]);
  const [sortFilter, setSortFilter] = useState({
    rating: false,
    distance: false,
    price: false,
  });
  const [serviceTypes, setServiceTypes] = useState({
    haircut: false,
    hairColoring: false,
    scalpMassage: false,
    beardSculpting: false,
  });

  const [gender, setGender] = useState({
    men: false,
    women: false,
    both: false,
  });

  const handlePriceFilterPress = () => {
    setShowPriceFilter(!showPriceFilter);
  };

  const handleGenderFilterPress = () => {
    setShowGenderFilter(!showGenderFilter);
  };

  const handleServiceTypeFilterPress = () => {
    setShowServiceTypeFilter(!showServiceTypeFilter);
  };

  const handleLocationFilterPress = () => {
    setShowLocationFilter(!showLocationFilter);
  };

  const handleSortFilterPress = () => {
    setShowSortFilter(!showSortFilter);
  };

  const handleShowServicesFilterPress = () => {
    setShowServicesFilter(!showServicesFilter);
  };

  const handleGenderChange = (payload) => {
    setGender({ ...gender, [payload]: !gender[`${payload}`] });
  };

  const handleServiceTypeChange = (payload) => {
    setServiceTypes({
      ...serviceTypes,
      [payload]: !serviceTypes[`${payload}`],
    });
  };

  const handleSortFilterChange = (payload) => {
    setSortFilter({
      ...sortFilter,
      [payload]: !setSortFilter[`${payload}`],
    });
  };

  const handlePriceRangeChange = (payload) => {
    setPriceRange(payload);
  };

  useEffect(() => {
    props.setMatchingSpecialists(specialistsMock);
    props.setSpecialist(null);
    props.clearCart();
  }, []);

  const filters = [
    {
      name: "Type of service",
      variant: showServiceTypeFilter,
      method: handleServiceTypeFilterPress,
    },
    {
      name: "Location",
      method: handleLocationFilterPress,
      variant: showLocationFilter,
    },
    {
      name: "Gender",
      method: handleGenderFilterPress,
      variant: showGenderFilter,
    },
    {
      name: "Price range",
      method: handlePriceFilterPress,
      variant: showPriceFilter,
    },
  ];

  const createFilterButton = (filter, idx) => {
    return (
      <Spacer key={`${idx}-${filter.name}`} position="right" size="small">
        <SearchFilter variant={filter.variant} onPress={filter.method}>
          <Text
            style={{
              fontSize: 14,
              color: filter.variant
                ? theme.colors.ui.quaternary
                : theme.colors.ui.primary,
            }}
            variant="body"
          >
            {filter.name}
          </Text>
          <Spacer position="left" size="small" />
          <Entypo
            name="chevron-down"
            size={20}
            color={
              filter.variant
                ? theme.colors.ui.quaternary
                : theme.colors.ui.primary
            }
          />
        </SearchFilter>
      </Spacer>
    );
  };
  return (
    <SafeArea>
      <MapScreenContainer>
        <MapScreenHeader>
          <MapScreenSearchBar>
            <SearchButton onPress={handleShowServicesFilterPress}>
              <FontAwesome name="search" size={20} />
              <Spacer position="left" size="medium">
                <Text variant="body" style={{ color: "gray" }}>
                  Search services...
                </Text>
              </Spacer>
            </SearchButton>
            <Spacer position="left" size="large">
              <ResultFilterButton onPress={handleSortFilterPress}>
                <Octicons name="settings" size={25} />
              </ResultFilterButton>
            </Spacer>
          </MapScreenSearchBar>
          <Spacer position="top" size="large">
            <FilterContainer
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              {filters.map((filter) => createFilterButton(filter))}
            </FilterContainer>
          </Spacer>
        </MapScreenHeader>

        <MapContainer>
          <Map
            data={props.matchingSpecialists}
            itemWidth={340}
            renderItem={({ item }) => (
              <SpecialistCard
                onPress={() => {
                  props.setSpecialist(item);
                  navigation.navigate("SpecialistDetails", { edit: false });
                }}
                specialist={item}
              />
            )}
          />
        </MapContainer>
      </MapScreenContainer>
      <PriceRangeModal
        value={priceRange}
        showModal={showPriceFilter}
        toggleShowModal={handlePriceFilterPress}
        updateValue={handlePriceRangeChange}
      />
      <GenderModal
        value={gender}
        showModal={showGenderFilter}
        toggleShowModal={handleGenderFilterPress}
        updateValue={handleGenderChange}
      />
      <ServiceTypeModal
        value={serviceTypes}
        showModal={showServiceTypeFilter}
        toggleShowModal={handleServiceTypeFilterPress}
        updateValue={handleServiceTypeChange}
      />
      <LocationModal
        value={locationFilter}
        showModal={showLocationFilter}
        toggleShowModal={handleLocationFilterPress}
      />
      <SortFilterModal
        value={sortFilter}
        showModal={showSortFilter}
        toggleShowModal={handleSortFilterPress}
        updateValue={handleSortFilterChange}
      />
      <ServicesModal
        showModal={showServicesFilter}
        toggleShowModal={handleShowServicesFilterPress}
      />
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({
  matchingSpecialists: state.specialists.specialists,
});

const mapDispatchToProps = (dispatch) => ({
  setMatchingSpecialists: (specialists) =>
    dispatch(setMatchingSpecialists(specialists)),
  setSpecialist: (specialist) => dispatch(setSpecialist(specialist)),
  clearCart: () => dispatch(clearCart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpecialistsMapScreen);

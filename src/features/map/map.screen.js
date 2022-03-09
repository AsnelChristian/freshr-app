import styled, { useTheme } from "styled-components/native";
import MapView from "react-native-maps";
import React, { useState } from "react";
import { Entypo, FontAwesome, Octicons } from "@expo/vector-icons";
import { Text } from "../../components/typography/typography.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { SafeArea } from "../../components/utils/safearea.component";
import {
  GenderModal,
  PriceRangeModal,
  LocationModal,
  ServiceTypeModal,
  SortFilterModal,
} from "./components/filter-modal.component";

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
  background-color: ${({ variant, theme }) =>
    variant ? theme.colors.ui.primary : theme.colors.ui.quaternary};
  padding: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.space[4]};
  elevation: 2;
  margin: 1px;
`;

const MapContainer = styled.View`
  flex: 1;
`;

const Map = styled(MapView)`
  flex: 1;
`;

const FilterContainer = styled.ScrollView``;

export const MapScreen = () => {
  const theme = useTheme();
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showGenderFilter, setShowGenderFilter] = useState(false);
  const [showServiceTypeFilter, setShowServiceTypeFilter] = useState(false);
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  const [showSortFilter, setShowSortFilter] = useState(false);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [priceRange, setPriceRange] = useState([8, 15]);
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

  const handleGenderChange = (payload) => {
    setGender({ ...gender, [payload]: !gender[`${payload}`] });
  };

  const handlePriceRangeChange = (payload) => {
    setPriceRange(payload);
  };

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
            <SearchButton>
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
          <Map />
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
      />
      <LocationModal
        value={locationFilter}
        showModal={showLocationFilter}
        toggleShowModal={handleLocationFilterPress}
      />
      <SortFilterModal
        showModal={showSortFilter}
        toggleShowModal={handleSortFilterPress}
      />
    </SafeArea>
  );
};

import styled, {useTheme} from "styled-components/native";
import { connect } from "react-redux";
import React, {useEffect, useRef, useState} from "react";

import {clearCart, selectFacility, setBookingStep, setSpecialist} from "../../redux/booking/booking.actions";
import Map from "../../features/map/components/map.component";
import { setMatchinFacilities } from "../../redux/facilities/facilities.actions";
import { facilitiesMock } from "../mock/facilities.mock";
import FacilityCard from "../../components/facilities/facility-card.component";
import {
  ActionButton,
  ButtonContainer,
} from "../../components/button/process-action-button.component";
import { Text } from "../../components/typography/typography.component";
import BookingStepper from "../components/booking-step.component";
import {
  GenderModal,
  LocationModal,
  PriceRangeModal, ServicesModal,
  ServiceTypeModal, SortFilterModal
} from "../../features/map/components/filter-modal.component";
import {rgba} from "polished";
import {Entypo, FontAwesome, Ionicons, Octicons} from "@expo/vector-icons";
import {Spacer} from "../../components/spacer/spacer.component";
import {specialistsMock} from "../mock/specialists.mock";
import {setMatchingSpecialists} from "../../redux/specialists/specialists.action";
import {SafeArea} from "../../components/utils/safearea.component";
import {BottomModal, CloseButton} from "../../components/modal/bottom-sheet-modalcomponent";
import {FlatList, useWindowDimensions, View} from "react-native";
import SpecialistCard from "../../features/map/components/specialist-card.component";
import {useNavigation} from "@react-navigation/native";
import {BottomSheetFlatList} from "@gorhom/bottom-sheet";


const FilterContainer = styled.ScrollView`
`;

const PageContainer = styled.View`
  flex: 1;
  background-color: white;
  padding: ${({theme}) => theme.space[3]} 0px;
  padding-bottom: 0px;
  ${({ showActionButton }) => (showActionButton ? "margin-bottom: 60px" : "")};
`;

const MapContainer = styled.View`
  flex: 1;
`;

const SearchLocationButton = styled.TouchableOpacity`
  width: 45px;
  height: 45px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.ui.quaternary};
  border: 2px solid ${({theme}) => rgba(theme.colors.ui.primary, 0.1)};
  border-radius: 100px;
`

const ToggleFiltersButton = styled.TouchableOpacity`
  width: 45px;
  height: 45px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme, active}) => active ? theme.colors.ui.primary: rgba(theme.colors.ui.primary, 0.1)};;
  border: 2px solid white;
  border-radius: 100px;
`;

const FilterMenuButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ variant, theme }) =>
    variant ? theme.colors.ui.primary : "white"};
  padding: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.space[4]};
  border: 1px solid ${({theme}) => rgba(theme.colors.ui.primary, 0.1)};
  margin: 0px 3px;
`;

const MapScreenSearchBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px ${({theme}) => theme.space[3]}
`;

const SearchButton = styled.TouchableOpacity`
  flex: 1;
  padding: 0px ${({ theme }) => theme.space[3]};
  border-radius: ${({ theme }) => theme.space[4]};
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  border: 2px solid ${({theme}) => rgba(theme.colors.ui.primary, 0.08)};
  height: 45px;
  flex-direction: row;
  align-items: center;
`;

const MapScreenHeader = styled.View`
  padding: ${({ theme }) => theme.space[3]};
  margin-top: -${({ theme }) => theme.space[3]};
  elevation: 2;
`;

const ResultsModal = ({ showModal, toggleShowModal, results, ...restProps }) => {
  const theme = useTheme();
  const dimensions = useWindowDimensions()
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);
  useEffect(() => {
    if (showModal) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.close();
    }
  }, [showModal]);

  const handleClose = () => {
    toggleShowModal();
  };

  return (
      <BottomModal ref={bottomSheetModalRef}>
        <Spacer position="bottom" size="small">
          <CloseButton onPress={handleClose}>
            <Ionicons name="close" size={20} />
          </CloseButton>
        </Spacer>

        <View style={{maxHeight: dimensions.height / 1.4}}>
          <Spacer position="top" size="medium" />
          <FlatList
              style={{paddingHorizontal: 16}}
              showsVerticalScrollIndicator={false}
              data={results}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                  <SpecialistCard
                      navigation={navigation}
                      onPress={() => {
                        restProps.setSpecialist(item);
                        bottomSheetModalRef.current?.close();
                        navigation.navigate("SpecialistDetails", { edit: false });
                      }}
                      specialist={item}
                  />
              )
             }
          />
          <Spacer position="bottom" size="large" />
        </View>
      </BottomModal>
  );
};


const FacilitySelectionScreen = ({
  showCart,
  navigation,
  route,
  ...restProps
}) => {
  const theme = useTheme();
  const editBooking = route.params.edit;
  const [locationFilter, setLocationFilter] = useState([]);
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  const [showFilters, setShowFilters] = useState(false)
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showGenderFilter, setShowGenderFilter] = useState(false);
  const [showServiceTypeFilter, setShowServiceTypeFilter] = useState(false);
  const [showServicesFilter, setShowServicesFilter] = useState(false);
  const [showSortFilter, setShowSortFilter] = useState(false);
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

  const handleShowFiltersPress = () => {
    setShowFilters(!showFilters)
  }

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


  const handleLocationFilterPress = () => {
    setShowLocationFilter(!showLocationFilter);
  };

  const filters = [
    {
      name: "Location",
      method: handleLocationFilterPress,
      variant: showLocationFilter,
    },

    {
      name: "Type of service",
      variant: showServiceTypeFilter,
      method: handleServiceTypeFilterPress,
    },
    {
      name: "Sort by",
      variant: showSortFilter,
      method: handleSortFilterPress
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
  ]

  const createFilterButton = (filter, idx) => {
    return (
        <Spacer key={`${idx}-${filter.name}`} position="right" size="small">
          <FilterMenuButton variant={filter.variant} onPress={filter.method}>
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
          </FilterMenuButton>
        </Spacer>
    );
  };

  useEffect(() => {
    restProps.setMatchingFacilities(facilitiesMock);
    restProps.setMatchingSpecialists(specialistsMock);
    if (!editBooking) {
      restProps.setBookingStep(0)
    }
    return () => {
      restProps.resetCart();
    };
  }, [navigation.route]);
  return (
    <SafeArea>
      <PageContainer showActionButon={restProps.selectedFacility !== null}>

        <MapScreenSearchBar>
          <SearchLocationButton onPress={handleLocationFilterPress}>
            <FontAwesome name="location-arrow" size={20}/>
          </SearchLocationButton>
          <Spacer position="left" size="medium"/>
          <SearchButton onPress={handleShowServicesFilterPress}>
            <FontAwesome name="search" size={20} />
            <Spacer position="left" size="medium">
              <Text variant="body" style={{ color: "gray" }}>
                Search professional by services...
              </Text>
            </Spacer>
          </SearchButton>
          <Spacer position="left" size="large">
            <ToggleFiltersButton onPress={handleShowFiltersPress} active={showFilters}>
              <Octicons name="settings" size={25} color={showFilters ? "white" : theme.colors.ui.primary}/>
            </ToggleFiltersButton>
          </Spacer>
        </MapScreenSearchBar>


        {showFilters && <Spacer position="top" size="large">
          <FilterContainer
              showsHorizontalScrollIndicator={false}
              horizontal={true}
          >
            {filters.map((filter) => createFilterButton(filter))}
          </FilterContainer>
        </Spacer>}
        <Spacer position="bottom" size="medium"/>
        <MapContainer>
          <Map
            data={restProps.matchingFacilities}
            bottomMargin={30}
            itemWidth={340}
            renderItem={({ item }) => (
              <FacilityCard
                handleMorePress={() =>
                  navigation.navigate("FacilityDetails", { facility: item })
                }
                facility={item}
              />
            )}
          />
        </MapContainer>
        {/*{restProps.selectedFacility && (*/}
        {/*  <ButtonContainer*/}
        {/*    style={{*/}
        {/*      shadowColor: "#000",*/}
        {/*      shadowOffset: {*/}
        {/*        width: 0,*/}
        {/*        height: 5,*/}
        {/*      },*/}
        {/*      shadowOpacity: 0.34,*/}
        {/*      shadowRadius: 6.27,*/}
        {/*      elevation: 10,*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <ActionButton*/}
        {/*      height={50}*/}
        {/*      onPress={() =>*/}
        {/*        editBooking*/}
        {/*          ? navigation.navigate("BookingReview")*/}
        {/*          : navigation.navigate("ProfessionalSelection", { edit: false })*/}
        {/*      }*/}
        {/*    >*/}
        {/*      <Text*/}
        {/*        style={{*/}
        {/*          color: "white",*/}
        {/*          fontWeight: "bold",*/}
        {/*          fontSize: 16,*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        {editBooking ? "Back to review" : "Book a professional nearby"}*/}
        {/*      </Text>*/}
        {/*    </ActionButton>*/}
        {/*  </ButtonContainer>*/}
        {/*)}*/}
      </PageContainer>
      <ResultsModal
        showModal={restProps.selectedFacility}
        setSpecialist={restProps.setSpecialist}
        toggleShowModal={() => null}
        results={restProps.matchingSpecialists}
      />
      <LocationModal
          value={locationFilter}
          showModal={showLocationFilter}
          toggleShowModal={handleLocationFilterPress}
      />
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
      {/*<LocationModal*/}
      {/*  value={locationFilter}*/}
      {/*  showModal={showLocationFilter}*/}
      {/*  toggleShowModal={handleLocationFilterPress}*/}
      {/*/>*/}
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
  selectedFacility: state.booking.facility,
  matchingFacilities: state.facilities.facilities,
  matchingSpecialists: state.specialists.specialists,
  bookingStep: state.booking.step
});

const mapDispatchToProps = (dispatch) => ({
  setMatchingFacilities: (facilities) =>
    dispatch(setMatchinFacilities(facilities)),
  setMatchingSpecialists: (specialists) => dispatch(setMatchingSpecialists(specialists)),
  setSelectedFacility: (facility) => dispatch(selectFacility(facility)),
  setSpecialist: (specialist) => dispatch(setSpecialist(specialist)),
  setBookingStep: (step) => dispatch(setBookingStep(step)),
  resetCart: () => dispatch(clearCart())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacilitySelectionScreen);

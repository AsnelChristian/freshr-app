import React, { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { Rating } from "react-native-elements";

import { useMemo } from "react";
import styled, { useTheme } from "styled-components/native";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import { Spacer } from "../spacer/spacer.component";
import {
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Row, Separator } from "../helpers/helpers.component";
import Rheostat, { AreaRheostat } from "react-native-rheostat";
import { CheckBoxInput } from "../form/form-checkbox.component";
import SpecialistCard from "../../screens/components/specialist-card.component";
import { DescriptionContainer, Text } from "../typography/typography.component";
import { RatingContainer } from "../rating/rating.component";
import ServiceCard from "../../screens/components/service-card.component";
import {
  PaddedContainer,
  SectionTitle,
} from "../../screens/components/details-screen.component";
import { rgba } from "polished";
import {
  setCurrentCategory,
  setCurrentPriceRange,
  setProGender,
  setSearchRadius,
  setSortFacilityMethod,
  setSortMethod,
  setSpecialist,
  setTargetGender,
} from "../../redux/booking/booking.actions";
import { connect } from "react-redux";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  CustomSearchBar,
  SearchInput,
  SearchLocation,
} from "../form/input.component";
import { Searchbar } from "react-native-paper";
import { ModalButton } from "../button/button.component";
import { MediaType } from "expo-media-library";
import { AssetsSelector } from "expo-images-picker";
import { ImageBrowser } from "expo-image-picker-multiple";
import * as ImageManipulator from "expo-image-manipulator";
import { BookingCard } from "../../screens/pro-facility/components/pro-booking-card";
import * as ImagePicker from "expo-image-picker";

const ModalBackground = styled.View`
  border-radius: 15px;
  background-color: white;
`;

const BackdropContentContainer = styled.View`
  flex: 1;
`;

export const CloseButton = styled.TouchableOpacity`
  margin-left: ${({ theme }) => theme.space[3]};
  height: 40px;
  width: 40px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
`;

const SortFilterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 30px;
  height: 45px;
  border: 1px solid ${({ theme }) => rgba(theme.colors.brand.primary, 0.2)};
  overflow: hidden;
`;

const SortFilterContainerSeparator = styled.View`
  height: 45px;
  width: 1px;
  background-color: ${({ theme }) => rgba(theme.colors.brand.primary, 0.2)};
`;

const SortButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.brand.primary : "white"};
`;

const mapStateToProps = (state) => ({
  priceRange: state.booking.priceRange,
  targetGender: state.booking.targetGender,
  proGender: state.booking.proGender,
  sortMethod: state.booking.sortBy,
  sortFacilitiesBy: state.booking.sortFacilitiesBy,
  facility: state.booking.facility,
  category: state.booking.currentCategory,
  categories: state.categories.categories,
  searchRadius: state.booking.searchRadius,
});

const mapDispatchToProps = (dispatch) => ({
  setPriceRange: (range) => dispatch(setCurrentPriceRange(range)),
  setSortMethod: (method) => dispatch(setSortMethod(method)),
  setTargetGender: (gender) => dispatch(setTargetGender(gender)),
  setProGender: (gender) => dispatch(setProGender(gender)),
  setSpecialist: (specialist) => dispatch(setSpecialist(specialist)),
  setCurrentCategory: (category) => dispatch(setCurrentCategory(category)),
  setSortFacilityMethod: (method) => dispatch(setSortFacilityMethod(method)),
  setSearchRadius: (radius) => dispatch(setSearchRadius(radius)),
});

export const BottomModal = React.forwardRef(({ children, onClose }, ref) => {
  const initialSnapPoints = useMemo(() => ["5%", "CONTENT_HEIGHT"], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        animatedIndex={animatedContentHeight}
        pressBehavior="close"
      />
    ),
    [animatedContentHeight]
  );
  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      onClose={onClose}
      backdropComponent={renderBackdrop}
      backgroundComponent={ModalBackground}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      enablePanDownToClose={true}
    >
      <BackdropContentContainer onLayout={handleContentLayout}>
        {children}
      </BackdropContentContainer>
    </BottomSheetModal>
  );
});

export const FilterModal = ({
  showModal,
  toggleShowModal,
  children,
  scrollView = true,
}) => {
  const dimensions = useWindowDimensions();
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

      {scrollView ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ maxHeight: dimensions.height / 1.4, paddingHorizontal: 16 }}
        >
          <Spacer position="top" size="medium" />
          {children}
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>{children}</View>
      )}
    </BottomModal>
  );
};

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

export const SpecialistsModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpecialistsModalComponent);

const PriceRangeModalComponent = ({
  showModal,
  toggleShowModal,
  ...restProps
}) => {
  const [curValue, setCurValue] = useState(null);

  useEffect(() => {
    setCurValue(restProps.priceRange);
  }, []);

  const onRheostatValUpdated = (payload) => {
    setCurValue(payload.values);
  };

  const applyFilter = () => {
    restProps.setPriceRange(curValue);
    toggleShowModal();
  };

  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <Spacer position="top" size="large" />
      <View style={{ flex: 1 }}>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="medium" />
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Price range</Text>
          <Spacer position="bottom" size="large" />
          {curValue && (
            <Text
              variant="caption"
              style={{ fontSize: 16, fontWeight: "bold" }}
            >
              <Feather name="dollar-sign" size={16} />
              {curValue[0]} - <Feather name="dollar-sign" size={16} />
              {curValue[1]}
            </Text>
          )}
        </Spacer>
        <AreaRheostat
          values={curValue}
          min={0}
          max={15}
          theme={{
            rheostat: { themeColor: "gray", grey: "#fafafa" },
          }}
          onValuesUpdated={onRheostatValUpdated}
          svgData={[
            2, 10, 40, 85, 85, 91, 35, 53, 24, 50, 10, 40, 95, 85, 40, 12,
          ]}
        />
      </View>
      <Spacer position="bottom" size="large" />
      <Separator />
      <Row
        style={{
          justifyContent: "space-between",
          paddingHorizontal: 8,
          paddingVertical: 16,
        }}
      >
        <ModalButton onPress={() => setCurValue([...restProps.priceRange])}>
          <Text>Clear all</Text>
        </ModalButton>
        <ModalButton variant="primary" onPress={applyFilter}>
          <Text style={{ color: "white" }}>Apply filters</Text>
        </ModalButton>
      </Row>
    </FilterModal>
  );
};

export const PriceRangeModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceRangeModalComponent);

const GenderModalComponent = ({ showModal, toggleShowModal, ...restProps }) => {
  const [gender, setGender] = useState("");
  const [genderPro, setGenderPro] = useState("");

  useEffect(() => {
    setGender(restProps.targetGender);
    setGenderPro(restProps.proGender);
  }, []);
  const applyFilter = () => {
    restProps.setTargetGender(gender);
    restProps.setProGender(genderPro);
    toggleShowModal();
  };
  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <Spacer position="top" size="large" />
      <View style={{ flex: 1 }}>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="medium" />
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            Pick a gender style
          </Text>
          <Spacer position="bottom" size="large" />
        </Spacer>

        <CheckBoxInput
          value={gender === "men"}
          handleChange={() => setGender("men")}
        >
          <Text style={{ fontSize: 16 }}>Men's style</Text>
          <Spacer position="bottom" size="small" />
          <Text variant="caption">Haircut for men</Text>
        </CheckBoxInput>
        <Spacer position="bottom" size="small" />
        <CheckBoxInput
          value={gender === "women"}
          handleChange={() => setGender("women")}
        >
          <Text style={{ fontSize: 16 }}>Women's style</Text>
          <Spacer position="bottom" size="small" />
          <Text variant="caption">Haircut for women</Text>
        </CheckBoxInput>
        <Spacer position="bottom" size="small" />
        <CheckBoxInput
          value={gender === "all"}
          handleChange={() => setGender("all")}
        >
          <Text style={{ fontSize: 16 }}>All gender</Text>
          <Spacer position="bottom" size="small" />
          <Text variant="caption">Style for all</Text>
        </CheckBoxInput>
      </View>
      <Spacer position="top" size="large" />

      <View style={{ flex: 1 }}>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="medium" />
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            Professional's gender
          </Text>
          <Spacer position="top" size="medium" />
          <Text variant="caption">
            Which gender do you feel more comfortable with ?
          </Text>
          <Spacer position="bottom" size="large" />
        </Spacer>

        <CheckBoxInput
          value={genderPro === "men"}
          handleChange={() => setGenderPro("men")}
        >
          <Text style={{ fontSize: 16 }}>Male</Text>
          <Spacer position="bottom" size="small" />
          {/*<Text variant="caption">Haircut for men</Text>*/}
        </CheckBoxInput>
        <Spacer position="bottom" size="small" />
        <CheckBoxInput
          value={genderPro === "women"}
          handleChange={() => setGenderPro("women")}
        >
          <Text style={{ fontSize: 16 }}>Female</Text>
          <Spacer position="bottom" size="small" />
          {/*<Text variant="caption">Haircut for women</Text>*/}
        </CheckBoxInput>
        <Spacer position="bottom" size="small" />
        <CheckBoxInput
          value={genderPro === "all"}
          handleChange={() => setGenderPro("all")}
        >
          <Text style={{ fontSize: 16 }}>No particular preference</Text>
          <Spacer position="bottom" size="small" />
          {/*<Text variant="caption">Style for all</Text>*/}
        </CheckBoxInput>
      </View>
      <Spacer position="bottom" size="large" />
      <Separator />
      <Row
        style={{
          justifyContent: "space-between",
          paddingHorizontal: 8,
          paddingVertical: 16,
        }}
      >
        <ModalButton
          onPress={() => {
            setGender(restProps.targetGender);
            setGenderPro(restProps.proGender);
          }}
        >
          <Text>Clear all</Text>
        </ModalButton>
        <ModalButton variant="primary" onPress={applyFilter}>
          <Text style={{ color: "white" }}>Apply filters</Text>
        </ModalButton>
      </Row>
    </FilterModal>
  );
};

export const GenderModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(GenderModalComponent);

export const ServiceDetailsModal = ({
  showModal,
  toggleShowModal,
  service,
}) => {
  const theme = useTheme();
  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <ServiceCard service={service} info={true} />
      <Spacer position="top" size="large" />
      <Row>
        <RatingContainer>
          <Spacer position="right" size="medium">
            <Text
              variant="caption"
              style={{ color: theme.colors.brand.primary, fontSize: 16 }}
            >
              {service.rating}
            </Text>
          </Spacer>

          <Rating
            type="star"
            ratingColor={theme.colors.brand.primary}
            ratingBackgroundColor={theme.colors.brand.primary}
            tintColor={theme.colors.ui.quaternary}
            fractions={1}
            startingValue={service.rating}
            readonly
            imageSize={16}
          />
        </RatingContainer>
        <Row>
          <Entypo name="clock" size={20} />
          <Spacer position="right" size="medium" />
          <Text variant="caption">{service.time} (approx.)</Text>
        </Row>
      </Row>

      <Spacer position="bottom" size="medium" />
      <DescriptionContainer>
        <Text style={{ lineHeight: 22 }}>{service.description}</Text>
      </DescriptionContainer>
      <Spacer position="bottom" size="large" />
      <Spacer position="bottom" size="medium" />
    </FilterModal>
  );
};

const LocationModalComponent = ({
  showModal,
  toggleShowModal,
  ...restProps
}) => {
  const theme = useTheme();
  const [searchInput, setSearchInput] = useState("");
  const [active, setActive] = useState(false);

  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <Spacer position="top" size="large" />
      <View style={{ flex: 1 }}>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="medium" />
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            Change location
          </Text>
          <Spacer position="bottom" size="large" />
        </Spacer>
        <View>
          <GooglePlacesAutocomplete
            query={{
              key: "GOOGLE_PLACES_API_KEY",
              language: "en", // language of the results
            }}
            onPress={(data, details) => console.log(data, details)}
            suppressDefaultStyles
            textInputProps={{
              InputComp: SearchLocation,
            }}
            placeholder="search location"
          />
        </View>
      </View>
      <Spacer position="bottom" size="large" />
      <Separator />

      <Row
        style={{
          justifyContent: "space-between",
          paddingHorizontal: 8,
          paddingVertical: 16,
        }}
      >
        <ModalButton>
          <Text>Clear</Text>
        </ModalButton>
        <ModalButton variant="primary">
          <Text style={{ color: "white" }}>Use location</Text>
        </ModalButton>
      </Row>
    </FilterModal>
  );
};

export const LocationModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationModalComponent);

const CategoryModalComponent = ({
  showModal,
  toggleShowModal,
  ...restProps
}) => {
  const [category, setCategory] = useState(restProps.category);

  useEffect(() => {
    setCategory(restProps.category);
  }, []);
  const applyFilter = () => {
    restProps.setCurrentCategory(category);
    toggleShowModal();
  };
  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <Spacer position="top" size="large" />
      <View style={{ flex: 1 }}>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="medium" />
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            Pick a category
          </Text>
          <Spacer position="bottom" size="large" />
        </Spacer>

        <View>
          {restProps.categories.map((item) => (
            <View key={item.id}>
              <CheckBoxInput
                value={category ? category.name === item.name : false}
                handleChange={() => setCategory(item)}
              >
                <Text style={{ fontSize: 16, textTransform: "capitalize" }}>
                  {item.name}
                </Text>
                <Spacer position="bottom" size="small" />
                <Text variant="caption">{item.catchPhrase}</Text>
              </CheckBoxInput>
              <Spacer position="bottom" size="small" />
            </View>
          ))}
        </View>
      </View>
      <Spacer position="bottom" size="large" />
      <Separator />
      <Row
        style={{
          justifyContent: "space-between",
          paddingHorizontal: 8,
          paddingVertical: 16,
        }}
      >
        <ModalButton onPress={() => setCategory(restProps.category)}>
          <Text>Clear all</Text>
        </ModalButton>
        <ModalButton variant="primary" onPress={applyFilter}>
          <Text style={{ color: "white" }}>Apply filters</Text>
        </ModalButton>
      </Row>
    </FilterModal>
  );
};

export const CategoryModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryModalComponent);

const SortFacilityModalComponent = ({
  showModal,
  toggleShowModal,
  ...restProps
}) => {
  const [sort, setSort] = useState("");

  useEffect(() => {
    setSort(restProps.sortFacilitiesBy);
  }, []);
  const applyFilter = () => {
    restProps.setSortFacilityMethod(sort);
    toggleShowModal();
  };
  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <Spacer position="top" size="large" />
      <View style={{ flex: 1 }}>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="medium" />
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            Sort facilities by
          </Text>
          <Spacer position="bottom" size="large" />
        </Spacer>

        <Spacer position="bottom" size="small" />
        <CheckBoxInput
          value={sort === "rating"}
          handleChange={() => setSort("rating")}
        >
          <Text style={{ fontSize: 16 }}>Rating</Text>
          <Spacer position="bottom" size="small" />
          <Text variant="caption">How they like it.</Text>
        </CheckBoxInput>
        <Spacer position="bottom" size="small" />
        <CheckBoxInput
          value={sort === "popularity"}
          handleChange={() => setSort("popularity")}
        >
          <Text style={{ fontSize: 16 }}>Popularity</Text>
          <Spacer position="bottom" size="small" />
          <Text variant="caption">They all go there</Text>
        </CheckBoxInput>
      </View>
      <Spacer position="bottom" size="large" />
      <Separator />
      <Row
        style={{
          justifyContent: "space-between",
          paddingHorizontal: 8,
          paddingVertical: 16,
        }}
      >
        <ModalButton onPress={() => setSort(restProps.sortFacilitiesBy)}>
          <Text>Clear all</Text>
        </ModalButton>
        <ModalButton variant="primary" onPress={applyFilter}>
          <Text style={{ color: "white" }}>Apply filters</Text>
        </ModalButton>
      </Row>
    </FilterModal>
  );
};

export const SortFacilityModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(SortFacilityModalComponent);

const SearchRadiusModalComponent = ({
  showModal,
  toggleShowModal,
  ...restProps
}) => {
  const [curValue, setCurValue] = useState(null);

  useEffect(() => {
    setCurValue([restProps.searchRadius]);
  }, []);

  const onRheostatValUpdated = (payload) => {
    setCurValue(payload.values);
  };

  const applyFilter = () => {
    restProps.setSearchRadius(curValue[0]);
    toggleShowModal();
  };

  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <Spacer position="top" size="large" />
      <View style={{ flex: 1 }}>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="medium" />
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Distance</Text>
          <Spacer position="bottom" size="large" />
          {curValue && (
            <Row>
              <MaterialCommunityIcons
                name="map-marker-distance"
                size={16}
                color="black"
              />
              <Spacer position="left" size="medium" />
              <Text
                variant="caption"
                style={{ fontSize: 16, fontWeight: "bold" }}
              >
                As far as {curValue[0]} km
              </Text>
            </Row>
          )}
        </Spacer>
        <Rheostat
          values={curValue}
          min={1}
          max={15}
          onValuesUpdated={onRheostatValUpdated}
          theme={{
            rheostat: { themeColor: "gray", grey: "#fafafa" },
          }}
        />
      </View>
      <Spacer position="bottom" size="large" />
      <Separator />
      <Row
        style={{
          justifyContent: "space-between",
          paddingHorizontal: 8,
          paddingVertical: 16,
        }}
      >
        <ModalButton onPress={() => setCurValue([restProps.searchRadius])}>
          <Text>Clear all</Text>
        </ModalButton>
        <ModalButton variant="primary" onPress={applyFilter}>
          <Text style={{ color: "white" }}>Apply filters</Text>
        </ModalButton>
      </Row>
    </FilterModal>
  );
};

export const SearchRadiusModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchRadiusModalComponent);

export const ImageSelectionModal = ({
  showModal,
  toggleShowModal,
  updateValue,
}) => {
  const theme = useTheme();
  const [images, setImages] = useState([]);

  const uploadImages = () => {
    console.log(images);
    updateValue(images);
    toggleShowModal();
  };

  const imagesCallback = (callback) => {
    callback
      .then(async (photos) => {
        const cPhotos = [];
        for (let photo of photos) {
          const pPhoto = await _processImageAsync(photo.uri);
          cPhotos.push({
            uri: pPhoto.uri,
            name: photo.filename,
            type: "image/jpg",
          });
        }
        setImages(cPhotos);
      })
      .catch((e) => console.log(e));
  };

  const updateHandler = (count, onSubmit) => {
    onSubmit();
  };

  const _processImageAsync = async (uri) => {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1000 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    return file;
  };

  return (
    <FilterModal
      showModal={showModal}
      toggleShowModal={toggleShowModal}
      scrollView={false}
    >
      <Spacer position="top" size="large" />
      <View style={{ height: Dimensions.get("window").height - 200 }}>
        <ImageBrowser
          max={6}
          onChange={updateHandler}
          callback={imagesCallback}
        />
        {/*<AssetsSelector*/}
        {/*  Settings={widgetSettings}*/}
        {/*  Errors={widgetErrors}*/}
        {/*  Styles={widgetStyles}*/}
        {/*  // Resize={widgetResize} know how to use first , perform slower results.*/}
        {/*/>*/}
      </View>
      <Separator />
      <Row
        style={{
          justifyContent: "space-between",
          paddingHorizontal: 8,
          paddingVertical: 16,
        }}
      >
        {/*<ModalButton onPress={() => null}>*/}
        {/*  <Text>Clear all</Text>*/}
        {/*</ModalButton>*/}
        <ModalButton
          variant="primary"
          onPress={uploadImages}
          style={{ flex: 1 }}
        >
          <Text style={{ color: "white" }}>Upload images</Text>
        </ModalButton>
      </Row>
    </FilterModal>
  );
};

export const FacilityBookingList = ({
  showModal,
  toggleShowModal,
  navigation,
  date,
}) => {
  const theme = useTheme();

  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <Spacer position="top" size="large" />
      <SectionTitle>{date}</SectionTitle>
      <Spacer position="bottom" size="large" />
      <BookingCard facility={null} navigation={navigation} />
      <Spacer position="top" size="medium" />
      <BookingCard facility={null} navigation={navigation} />
      <Spacer position="top" size="medium" />
      <Spacer position="bottom" size="medium" />
      <Spacer position="bottom" size="large" />
    </FilterModal>
  );
};

const FileButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => theme.colors.brand.quaternary};
  border-radius: 10px;
`;

export const ImageUploadModal = ({
  showModal,
  toggleShowModal,
  addImage,
  noGallery = false,
  allowVideo = false,
}) => {
  const theme = useTheme();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      addImage(result);
      toggleShowModal();
    }
  };

  const takeImage = async (mediaType) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: mediaType,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      addImage(result);
      toggleShowModal();
    }
  };
  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <Spacer position="bottom" size="large" />
      <View>
        <FileButton
          onPress={() => takeImage(ImagePicker.MediaTypeOptions.Images)}
        >
          <Feather name="image" size={20} color="white" />
          <Spacer position="left" size="large" />
          <Text variant="caption" style={{ color: "white", fontSize: 16 }}>
            Take photo
          </Text>
        </FileButton>

        <Spacer position="bottom" size="large" />

        {allowVideo && (
          <>
            <FileButton
              onPress={() => takeImage(ImagePicker.MediaTypeOptions.Videos)}
            >
              <Feather name="video" size={20} color="white" />
              <Spacer position="left" size="large" />

              <Text variant="caption" style={{ color: "white", fontSize: 16 }}>
                Take video
              </Text>
            </FileButton>

            <Spacer position="bottom" size="large" />
          </>
        )}
        {!noGallery && (
          <>
            <FileButton onPress={pickImage}>
              <Text variant="caption" style={{ color: "white", fontSize: 16 }}>
                Choose from gallery
              </Text>
            </FileButton>
            <Spacer position="bottom" size="large" />
          </>
        )}
        <FileButton onPress={toggleShowModal}>
          <Text variant="caption" style={{ color: "white", fontSize: 16 }}>
            Cancel
          </Text>
        </FileButton>
      </View>
      <Spacer position="bottom" size="large" />
      <Spacer position="bottom" size="large" />
      <Spacer position="bottom" size="medium" />
    </FilterModal>
  );
};

export const EditImageModal = ({ showModal, toggleShowModal }) => {
  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <Spacer position="bottom" size="large" />
      <View>
        <FileButton onPress={() => null}>
          <Text variant="caption" style={{ color: "white", fontSize: 16 }}>
            Delete image
          </Text>
        </FileButton>

        <Spacer position="bottom" size="large" />
        <FileButton onPress={toggleShowModal}>
          <Text variant="caption" style={{ color: "white", fontSize: 16 }}>
            Cancel
          </Text>
        </FileButton>
      </View>
      <Spacer position="bottom" size="large" />
      <Spacer position="bottom" size="large" />
      <Spacer position="bottom" size="medium" />
    </FilterModal>
  );
};

export const EditServiceModal = ({ showModal, toggleShowModal }) => {
  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <Spacer position="bottom" size="large" />
      <View>
        <FileButton onPress={() => null}>
          <MaterialCommunityIcons
            name="square-edit-outline"
            size={20}
            color="white"
          />
          <Spacer position="left" size="medium" />
          <Text variant="caption" style={{ color: "white", fontSize: 16 }}>
            Edit Service
          </Text>
        </FileButton>
        <Spacer position="bottom" size="large" />
        <FileButton onPress={toggleShowModal}>
          <MaterialCommunityIcons
            name="delete-empty-outline"
            size={20}
            color="white"
          />
          <Spacer position="left" size="medium" />
          <Text variant="caption" style={{ color: "white", fontSize: 16 }}>
            Delete service
          </Text>
        </FileButton>
        <Spacer position="bottom" size="large" />
        <FileButton onPress={toggleShowModal}>
          <Text variant="caption" style={{ color: "white", fontSize: 16 }}>
            Cancel
          </Text>
        </FileButton>
      </View>
      <Spacer position="bottom" size="large" />
      <Spacer position="bottom" size="large" />
      <Spacer position="bottom" size="medium" />
    </FilterModal>
  );
};

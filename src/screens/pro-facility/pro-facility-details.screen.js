import { connect } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { SafeArea } from "../../components/utils/safearea.component";
import {
  DescriptionContainer,
  QuoteIconContainer,
  Text,
} from "../../components/typography/typography.component";
import {
  PaddedContainer,
  SectionTitle,
} from "../components/details-screen.component";
import { Spacer } from "../../components/spacer/spacer.component";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import {
  FacilityBookingList,
  FilterModal,
  ImageSelectionModal,
} from "../../components/bottom-sheet/bottom-sheet.component";
import {
  FormContainer,
  FormDescriptionInput,
  FormInput,
  LengthIndicator,
  renderCoverImage,
  renderImage,
  renderModal,
  renderSeatsForm,
  SeatIndicator,
  UploadButton,
} from "./components/pro-facility-form-helper";
import {
  EditButton,
  ModalButton,
} from "../../components/button/button.component";
import { Row, Separator } from "../../components/helpers/helpers.component";
import { FlatGrid } from "react-native-super-grid";
import { arrayMoveImmutable } from "array-move";
import { SeatsOccupancy } from "./components/pro-facility-card";
import { rgba } from "polished";
import { renderCalendar } from "./utils";
import { renderTime } from "./components/time-view.helper";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  EditFacilityDescriptionModal,
  renderDescription,
} from "../components/pro/pro-details-screen.component";

const Container = styled.View`
  margin-top: 32px;

  flex: 1;
  background-color: white;
`;

const Title = styled(Text)`
  margin-top: -8px;
  font-size: 34px;
  font-weight: bold;
  line-height: 45px;
  color: ${({ theme }) => theme.colors.ui.primary};
`;

const ConfigRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SeatsOccupancyContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => rgba(theme.colors.brand.primary, 0.1)};
  border-radius: 10px;
`;

const DeleteFacilityButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space[3]};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.ui.primary};
`;

const EditFacilityNameModal = ({ showModal, toggleModal }) => {
  const theme = useTheme();
  const [facilityName, setFacilityName] = useState("");
  const [inputLength, setInputLength] = useState(0);

  return (
    <FilterModal
      showModal={showModal}
      toggleShowModal={toggleModal}
      scrollView={false}
    >
      <PaddedContainer>
        <Spacer position="bottom" size="large" />

        <SectionTitle>Edit facility's name</SectionTitle>
        <Spacer position="bottom" size="large" />

        <FormContainer>
          <FormInput
            label="Facility's name"
            value={facilityName}
            onChangeText={(text) => {
              setFacilityName(text);
              setInputLength(text.length);
            }}
          />
          <LengthIndicator>
            <Text style={{ fontSize: 18, color: "gray" }}>
              {inputLength} / 50
            </Text>
          </LengthIndicator>
        </FormContainer>
      </PaddedContainer>
      <Spacer position="bottom" size="large" />
      <Spacer position="bottom" size="large" />
      <Separator />
      <Row
        style={{
          justifyContent: "space-between",
          paddingHorizontal: 8,
          paddingVertical: 16,
        }}
      >
        <ModalButton onPress={() => null}>
          <Text>Cancel</Text>
        </ModalButton>
        <ModalButton variant="primary" onPress={() => null}>
          <Text style={{ color: "white" }}>Apply change</Text>
        </ModalButton>
      </Row>
    </FilterModal>
  );
};
const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HourButton = styled.TouchableOpacity`
  flex: 1;
  height: 80px;
  background-color: ${({ color }) => color};
  border-radius: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const EditWorkingHoursModal = ({ showModal, toggleModal }) => {
  const theme = useTheme();
  const [openingHour, setOpeningHour] = useState(new Date());
  const [closingHour, setClosingHour] = useState(new Date());
  const [showOpeningPicker, setShowOpeningPicker] = useState(false);
  const [showClosingPicker, setShowClosingPicker] = useState(false);
  const updateOpeningHour = (e, selectedValue) => {
    if (selectedValue) {
      setOpeningHour(selectedValue);
    }
    setShowOpeningPicker(!showOpeningPicker);
  };

  const updateClosingHour = (e, selectedValue) => {
    if (selectedValue) {
      setClosingHour(selectedValue);
    }
    setShowClosingPicker(!showClosingPicker);
  };

  const renderHourButton = (label, value, toggle) => {
    return (
      <HourButton
        color={value ? theme.colors.ui.primary : theme.colors.brand.primary}
        onPress={toggle}
      >
        {label === "opening" ? (
          <FontAwesome5 name="door-open" size={20} color="white" />
        ) : (
          <FontAwesome5 name="door-closed" size={20} color="white" />
        )}
        <Spacer position="left" size="medium" />
        <Text variant="caption" style={{ color: "white", fontSize: 18 }}>
          {`${label} hour`}
        </Text>
      </HourButton>
    );
  };

  const renderHourButtons = () => {
    return (
      <ButtonContainer>
        {renderHourButton("opening", openingHour, () =>
          setShowOpeningPicker(!showOpeningPicker)
        )}
        <Spacer position="left" size="large" />
        {renderHourButton("closing", closingHour, () =>
          setShowClosingPicker(!showClosingPicker)
        )}
      </ButtonContainer>
    );
  };

  const renderOpeningHourHeader = () => {
    return (
      <>
        <SectionTitle>Opening hours</SectionTitle>
        <Spacer position="bottom" size="medium" />
        <Text variant="caption" style={{ lineHeight: 22 }}>
          At what time is your facility operational
        </Text>
      </>
    );
  };

  const renderTimePicker = (value, updateValue, min = false) => {
    return (
      <DateTimePicker
        testID="dateTimePicker"
        value={value}
        mode="time"
        is24Hour={true}
        onChange={updateValue}
        minimumDate={min ? openingHour : null}
      />
    );
  };

  return (
    <FilterModal
      showModal={showModal}
      toggleShowModal={toggleModal}
      scrollView={false}
    >
      <PaddedContainer>
        <Spacer position="bottom" size="large" />

        <SectionTitle>Edit facility's description</SectionTitle>
        <Spacer position="bottom" size="large" />

        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="large" />
        {renderHourButtons()}
        {showOpeningPicker && renderTimePicker(openingHour, updateOpeningHour)}
        {showClosingPicker &&
          renderTimePicker(closingHour, updateClosingHour, true)}
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="large" />
        <ConfigRow>
          {renderTime(openingHour, "From")}
          <Spacer position="left" size="large" />
          {renderTime(closingHour, "Until")}
        </ConfigRow>
      </PaddedContainer>
      <Spacer position="bottom" size="large" />
      <Spacer position="bottom" size="large" />
      <Separator />
      <Row
        style={{
          justifyContent: "space-between",
          paddingHorizontal: 8,
          paddingVertical: 16,
        }}
      >
        <ModalButton onPress={() => null}>
          <Text>Cancel</Text>
        </ModalButton>
        <ModalButton variant="primary" onPress={() => null}>
          <Text style={{ color: "white" }}>Apply change</Text>
        </ModalButton>
      </Row>
    </FilterModal>
  );
};

const EditSeatCapacityModal = ({ showModal, toggleModal, value }) => {
  const theme = useTheme();
  const [seatsCnt, setSeatsCnt] = useState(value);
  const handleAddSeatPress = () => {
    setSeatsCnt((old) => [...old, `seat-${old.length}`]);
  };

  const handleRemoveSeatPress = () => {
    setSeatsCnt((old) => [...old.splice(0, old.length - 1)]);
  };

  const renderSeat = (key) => {
    return (
      <SeatIndicator key={key}>
        <FontAwesome5 name="chair" size={50} color={theme.colors.ui.primary} />
      </SeatIndicator>
    );
  };
  const renderSeats = () => {
    return (
      <FlatGrid
        itemDimension={110}
        data={seatsCnt}
        spacing={8}
        renderItem={({ item, index }) => renderSeat(index)}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      />
    );
  };
  return (
    <FilterModal
      showModal={showModal}
      toggleShowModal={toggleModal}
      scrollView={false}
    >
      <PaddedContainer>
        <Spacer position="bottom" size="large" />

        <SectionTitle>Edit seat capacity</SectionTitle>
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="large" />
        {renderSeatsForm(
          handleAddSeatPress,
          handleRemoveSeatPress,
          seatsCnt.length
        )}
        <Spacer position="bottom" size="large" />
        {renderSeats()}
      </PaddedContainer>
      <Spacer position="bottom" size="large" />
      <Spacer position="bottom" size="large" />
      <Separator />
      <Row
        style={{
          justifyContent: "space-between",
          paddingHorizontal: 8,
          paddingVertical: 16,
        }}
      >
        <ModalButton onPress={() => null}>
          <Text>Cancel</Text>
        </ModalButton>
        <ModalButton variant="primary" onPress={() => null}>
          <Text style={{ color: "white" }}>Apply change</Text>
        </ModalButton>
      </Row>
    </FilterModal>
  );
};

const ProFacilityDetailsScreen = (props) => {
  const theme = useTheme();
  const [gallery, setGallery] = useState([
    {
      id: "image-1",
      uri: "https://barbersconcept.de/wp-content/uploads/2019/02/cropped-2_7edb7de0-1606-11e7-9302-f53e2e1f7cf7.jpg",
    },
    {
      id: "image-2",
      uri: "https://media.gq-magazin.de/photos/5cf4d59293d170d22972ac8c/master/pass/Body&Care_BestBarber.jpg",
    },
    {
      id: "image-3",
      uri: "https://cdn1.treatwell.net/images/view/v2.i1445489.w1080.h720.x303ACF8D/",
    },
    {
      id: "image-4",
      uri: "https://cdn1.treatwell.net/images/view/v2.i1822163.w1080.h720.x8E70B900/",
    },
    {
      id: "image-5",
      uri: "https://www.haller-barbershop.de/wp-content/uploads/2019/11/barbershop10-e1574483037534.jpg",
    },
  ]);
  const name = "The best barbershop around town";
  const about =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat justo ac tortor hendrerit.";
  const openingHour = new Date();
  const closingHour = new Date();

  const [coverImage, setCoverImage] = useState({
    id: "image-1",
    uri: "https://barbershop.ap-donovan.com/wp-content/uploads/2019/08/Bildschirmfoto-2019-08-08-um-12.23.20.png",
  });
  const [seats, setSeats] = useState([1, 2, 3, 4, 5]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
  const [showFileSelectionModal, setShowFileSelectionModal] = useState(false);
  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [showEditDescriptionModal, setShowEditDescriptionModal] =
    useState(false);
  const [showEditSeatCapacityModal, setShowEditSeatCapacityModal] =
    useState(false);
  const [showEditWorkingHoursModal, setShowEditWorkingHoursModal] =
    useState(false);

  const [showBookingList, setShowBookingList] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");

  const toggleShowBookingList = () => {
    setShowBookingList(!showBookingList);
  };

  const onDayPress = useCallback((day) => {
    console.log(day);
    setSelectedDay(day.dateString);
    toggleShowBookingList();
  }, []);

  const updateGallery = (images) => {
    const cover = images.pop();
    setGallery(images);
    setCoverImage(cover);
  };

  const handleShowEditNameModal = () =>
    setShowEditNameModal(!showEditNameModal);
  const handleShowEditDescriptionModal = () =>
    setShowEditDescriptionModal(!showEditDescriptionModal);
  const handleShowEditSeatCapacityModal = () =>
    setShowEditSeatCapacityModal(!showEditSeatCapacityModal);
  const handleShowWorkingHoursModal = () =>
    setShowEditWorkingHoursModal(!showEditWorkingHoursModal);

  const setActiveImage = () => setSelectedImage(null);

  const moveImageForward = () => {
    setGallery((old) => {
      const moveToIndex =
        selectedImageIndex === 0 ? gallery.length - 1 : selectedImageIndex - 1;
      return arrayMoveImmutable(old, selectedImageIndex, moveToIndex);
    });
    setSelectedImage(null);
  };
  const moveImageBackward = () => {
    setGallery((old) => {
      const moveToIndex =
        selectedImageIndex === gallery.length - 1 ? 0 : selectedImageIndex + 1;
      return arrayMoveImmutable(old, selectedImageIndex, moveToIndex);
    });
    setSelectedImage(null);
  };
  const setImageAsCoverImage = () => {
    setGallery((old) => {
      const newCover = { ...selectedImage };

      const newGallery = [...old];
      const pos = newGallery.map((e) => e.id).indexOf(selectedImage.id);
      newGallery[pos] = coverImage;
      setCoverImage(newCover);

      setSelectedImage(null);
      return newGallery;
    });
  };

  const handleSelectImage = (item, index) => {
    setSelectedImage(item);
    setSelectedImageIndex(index);
  };
  const toggleShowFileSelectionModal = () => {
    setShowFileSelectionModal(!showFileSelectionModal);
  };

  const deleteImage = () => null;

  const renderEditNameModal = () => {
    return (
      <EditFacilityNameModal
        showModal={showEditNameModal}
        toggleModal={handleShowEditNameModal}
      />
    );
  };

  const renderEditDescriptionModal = () => {
    return (
      <EditFacilityDescriptionModal
        showModal={showEditDescriptionModal}
        toggleModal={handleShowEditDescriptionModal}
        title={"Edit's facility description"}
        subTitle={""}
        label={"Facility's description"}
        length={200}
      />
    );
  };

  const renderEditSeatCapacityModal = () => {
    return (
      <EditSeatCapacityModal
        showModal={showEditSeatCapacityModal}
        toggleModal={handleShowEditSeatCapacityModal}
        value={seats}
      />
    );
  };

  const renderEditWorkingHoursModal = () => {
    return (
      <EditWorkingHoursModal
        showModal={showEditWorkingHoursModal}
        toggleModal={handleShowWorkingHoursModal}
      />
    );
  };

  const renderHours = () => {
    return (
      <>
        <ConfigRow>
          <View style={{ flex: 1 }}>
            <SectionTitle>Hours</SectionTitle>
            <Spacer position="bottom" size="medium" />
            <Text variant="caption" style={{ lineHeight: 22 }}>
              Working hours of the facility
            </Text>
            <Spacer position="bottom" size="large" />
          </View>
          <Spacer position="left" size="medium" />
          <EditButton onPress={handleShowWorkingHoursModal}>
            <AntDesign name="edit" size={20} color={theme.colors.ui.primary} />
          </EditButton>
        </ConfigRow>
        <ConfigRow>
          {renderTime(openingHour, "From")}
          <Spacer position="left" size="large" />
          {renderTime(closingHour, "until")}
        </ConfigRow>
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="large" />
      </>
    );
  };

  const renderSeat = (key) => {
    return (
      <SeatIndicator key={key}>
        <FontAwesome5 name="chair" size={50} color={theme.colors.ui.primary} />
      </SeatIndicator>
    );
  };
  const renderSeats = () => {
    return (
      <FlatGrid
        itemDimension={110}
        data={seats}
        spacing={8}
        renderItem={({ item, index }) => renderSeat(index)}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderSeatCapacity = () => {
    return (
      <>
        <ConfigRow>
          <View style={{ flex: 1 }}>
            <SectionTitle>Seat capacity</SectionTitle>
            <Spacer position="bottom" size="medium" />
            <Text variant="caption" style={{ lineHeight: 22 }}>
              Seats available for rent
            </Text>
            <Spacer position="bottom" size="large" />
          </View>
          <Spacer position="left" size="medium" />
          <EditButton onPress={handleShowEditSeatCapacityModal}>
            <AntDesign name="edit" size={20} color={theme.colors.ui.primary} />
          </EditButton>
        </ConfigRow>
        <SeatsOccupancyContainer>
          <SeatsOccupancy seatCapacity={3} bookedSeats={2} />
        </SeatsOccupancyContainer>
        {renderSeats()}
      </>
    );
  };

  const renderRating = () => {
    return (
      <RatingContainer>
        <Text
          variant="caption"
          style={{
            fontSize: 24,
            color: theme.colors.brand.primary,
          }}
        >
          4.3
        </Text>
        <Spacer position="left" size="small" />
        <AntDesign name="star" size={20} color={theme.colors.brand.primary} />
      </RatingContainer>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <ConfigRow>
          <View style={{ flex: 1 }}>
            <Title>{name}</Title>
          </View>
          <Spacer position="left" size="medium" />
          <EditButton onPress={handleShowEditNameModal}>
            <AntDesign name="edit" size={20} color={theme.colors.ui.primary} />
          </EditButton>
        </ConfigRow>
        <Spacer position="top" size="large" />
        <Spacer position="top" size="large" />
        <ConfigRow style={{ alignItems: "center" }}>
          {renderRating()}
          <TouchableOpacity>
            <Text
              style={{ textDecorationLine: "underline", fontWeight: "bold" }}
            >
              1.5k reviews
            </Text>
          </TouchableOpacity>
        </ConfigRow>
        <Spacer position="top" size="large" />
        <Spacer position="top" size="large" />
        <SectionTitle>Booking history</SectionTitle>
        <Spacer position="top" size="medium" />
        <View
          style={{
            borderRadius: 30,
            overflow: "hidden",
            paddingBottom: 16,
          }}
        >
          {renderCalendar(onDayPress)}
        </View>
        <Spacer position="top" size="large" />
        <Spacer position="top" size="large" />
        <Row style={{ justifyContent: "space-between" }}>
          <View>
            <SectionTitle>Gallery</SectionTitle>
            <Spacer position="bottom" size="medium" />
            <Text variant="caption" style={{ lineHeight: 22 }}>
              Images advertising your facility
            </Text>
            <Spacer position="bottom" size="large" />
          </View>
          <UploadButton onPress={toggleShowFileSelectionModal}>
            <Feather name="upload" size={18} color={theme.colors.ui.primary} />
            <Spacer position="left" size="small" />
            <Text>replace images</Text>
          </UploadButton>
        </Row>
        <Spacer position="top" size="large" />
        {renderCoverImage(coverImage, handleSelectImage)}
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Spacer position="top" size="large" />
        <Spacer position="top" size="large" />
        {renderDescription(
          "About",
          "Pitch about your facility",
          about,
          handleShowEditDescriptionModal
        )}
        <Spacer position="top" size="large" />
        {renderHours()}
        <Spacer position="top" size="large" />
        {renderSeatCapacity()}
        <Spacer position="top" size="large" />
        <DeleteFacilityButton>
          <Text style={{ fontSize: 16, color: "white" }}>Delete facility</Text>
          <Spacer position="left" size="large" />
          <AntDesign name="delete" size={24} color="white" />
        </DeleteFacilityButton>
        <Spacer position="top" size="large" />
        <Spacer position="top" size="large" />
      </>
    );
  };

  const renderGallery = () => {
    return (
      <FlatGrid
        ListHeaderComponent={renderHeader()}
        ListFooterComponent={renderFooter()}
        data={gallery}
        spacing={2}
        renderItem={({ item, index }) =>
          renderImage(item, index, handleSelectImage)
        }
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeArea style={{ backgroundColor: "white" }}>
      <Container>
        {renderModal(
          selectedImage !== null,
          selectedImage !== coverImage,
          setActiveImage,
          moveImageForward,
          moveImageBackward,
          setImageAsCoverImage,
          deleteImage
        )}
        <Spacer position="top" size="large" />
        <PaddedContainer style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>{renderGallery()}</View>
        </PaddedContainer>
      </Container>
      {renderEditNameModal()}
      {renderEditDescriptionModal()}
      {renderEditSeatCapacityModal()}
      {renderEditWorkingHoursModal()}
      <ImageSelectionModal
        showModal={showFileSelectionModal}
        toggleShowModal={toggleShowFileSelectionModal}
        updateValue={updateGallery}
      />
      <FacilityBookingList
        showModal={showBookingList}
        toggleShowModal={toggleShowBookingList}
        navigation={props.navigation}
        date={selectedDay}
      />
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProFacilityDetailsScreen);

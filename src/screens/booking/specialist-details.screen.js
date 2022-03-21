import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components/native";
import { Button, View } from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { rgba } from "polished";
import Modal from "react-native-modal";

import { Spacer } from "../../components/spacer/spacer.component";
import {
  DescriptionContainer,
  QuoteIconContainer,
  Text,
} from "../../components/typography/typography.component";
import { Suggestion } from "../../features/map/components/suggestion.component";
import ServiceCard from "../../components/service/service-card.component";
import { ServiceDetailsModal } from "../../components/service/service-info-modal.component";
import { connect } from "react-redux";
import {clearCart, setBookingStep} from "../../redux/booking/booking.actions";
import {
  ActionButton,
  ButtonContainer,
  CartItemCountContainer,
  PositioningContainer,
} from "../../components/button/process-action-button.component";
import {
  PageContainer,
  SectionTitle,
  Title,
  TitleContainer,
  FavButton,
  PageContentContainer,
  ReviewButton,
  ReviewButtonText,
} from "../components/details-screen.component";
import { camelize } from "../../utils/string-formatting";
import { Gallery } from "../components/gallery.component";
import { RatingComponent } from "../components/rating.component";
import { RatingRow } from "../../components/rating/rating.component";
import BookingStepper from "../components/booking-step.component";

const CategoryButtonsContainer = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[2]};
`;

const CategoryButton = styled.TouchableOpacity`
  height: 60px;
  padding: 0px ${({ theme }) => theme.space[3]};
  border-radius: ${({ theme }) => theme.sizes[1]};
  background-color: ${({ active, theme }) =>
    active ? theme.colors.ui.primary : "white"};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.colors.ui.primary};
  margin-right: ${({ theme }) => theme.space[2]};
`;

const CategorySelectedCount = styled.View`
  height: 30px;
  width: 30px;
  border-radius: 100px;
  background-color: ${({ active, theme }) =>
    active ? "white" : theme.colors.ui.primary};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ModalViewPositioning = styled.View`
  flex-direction: row;
  justify-content: center;
`
const ModalView = styled.View`
  width: 250px;
  background-color: white;
  border-radius: ${({theme}) => theme.sizes[1]};
`

const ModalCloseButton = styled.TouchableOpacity`
  position: absolute;
  top: ${({theme}) => theme.space[2]};;
  right: ${({theme}) => theme.space[2]};;
  padding: ${({theme}) => theme.space[2]};
  border-radius: 100px;
  background-color: ${({theme}) => theme.colors.ui.quaternary};;
`

const Separator = styled.View`
  height: 2px;
  width: 100%;
  background-color: ${({theme}) => rgba(theme.colors.ui.primary, 0.06)};
`

const ModalContent = styled.View`
  padding: ${({theme}) => theme.space[3]};
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`



const SpecialistDetailsScreen = ({
  specialist,
  servicesPerCategoryCnt,
  resetCart,
  cart,
  route,
  navigation,
    setBookingStep
}) => {
  const editBooking = route.params.edit;
  const theme = useTheme();

  const {
    name,
    gallery,
    rating,
    ratingCnt,
    address,
    about,
    services,
    isFavorite = false,
  } = specialist;

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [shownServices, setShownServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isFav, setIsFav] = useState(isFavorite);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const categories = [
    "Haircut",
    "Hair coloring",
    "Scalp massage",
    "Beard sculpting",
  ];

  useEffect(() => {
    setShownServices(services[`${camelize(categories[selectedCategory])}`]);
  }, [selectedCategory]);

  const handleFavButtonPress = () => {
    setIsFav(!isFav);
  };
  const handleShowViewMore = (service) => {
    setSelectedService(service);
  };
  const handleCloseViewMore = () => {
    setSelectedService(null);
  };

  useEffect(() => {
    if (!editBooking) {
      return;
    }
    setModalVisible(cart.length <= 0);
  }, [cart]);

  useEffect(() => {
    if (editBooking) {
      setBookingStep(3)
    }
  }, [navigation.route]);

  return (
    <>
      {/*<BookingStepper pageStep={1} navigation={navigation}/>*/}
      <PageContainer showsVerticalScrollIndicator={false}>
        <Modal isVisible={isModalVisible}>

          <ModalViewPositioning>
            <ModalView>
              <ModalContent>
                <Row>
                  <Ionicons name="md-warning" size={40}/>
                  <Spacer position="left" size="medium"/>
                  <Text variant="caption" style={{fontSize: 18}}> Warning</Text>
                </Row>
                <Spacer position="bottom" size="large"/>
                <Separator/>
                <Spacer position="bottom" size="large"/>
                <Text>Emptying the cart will cancel the ongoing booking process</Text>
                <Spacer position="bottom" size="large"/>
                <Spacer position="bottom" size="medium"/>
                <ModalCloseButton onPress={toggleModal}>
                  <Ionicons name="close" size={20}/>
                </ModalCloseButton>
              </ModalContent>
            </ModalView>
          </ModalViewPositioning>
        </Modal>

        <Gallery images={gallery} />

        <PageContentContainer showActionButton={cart.length > 0}>
          <Spacer position="top" size="medium" />
          <TitleContainer>
            <Title>{name}</Title>
            <FavButton onPress={handleFavButtonPress}>
              <MaterialIcons
                name={isFav ? "favorite" : "favorite-outline"}
                size={30}
              />
            </FavButton>
          </TitleContainer>
          <Spacer position="top" size="large" />
          <RatingRow>
            <RatingComponent rating={rating} />
            <ReviewButton>
              <ReviewButtonText>{ratingCnt}</ReviewButtonText>
              <Spacer position="right" size="small" />
              <ReviewButtonText>reviews</ReviewButtonText>
              <Spacer position="right" size="medium" />
              <AntDesign
                name="arrowright"
                size={24}
                color={theme.colors.ui.primary}
              />
            </ReviewButton>
          </RatingRow>
          <Suggestion value={address} pressable={false} size={16}>
            <Ionicons name="location" size={22} />
          </Suggestion>
          <Spacer position="bottom" size="medium" />
          <DescriptionContainer>
            <QuoteIconContainer style={{ bottom: 0, right: 0 }}>
              <MaterialIcons name="format-quote" size={45} color={"white"} />
            </QuoteIconContainer>
            <Text style={{ lineHeight: 22 }}>{about}</Text>
          </DescriptionContainer>
          <Spacer position="bottom" size="large" />
          <Spacer position="bottom" size="large" />
          <SectionTitle>Services</SectionTitle>

          <Spacer position="bottom" size="large" />

          <CategoryButtonsContainer
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((category, index) => (
              <CategoryButton
                key={`${specialist.id}-category-${index}`}
                active={category === categories[selectedCategory]}
                onPress={() => setSelectedCategory(index)}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    color:
                      category === categories[selectedCategory]
                        ? "white"
                        : theme.colors.ui.primary,
                  }}
                >
                  {category}
                </Text>
                <Spacer position="left" size="medium" />

                {servicesPerCategoryCnt[`${camelize(category)}`] > 0 && (
                  <CategorySelectedCount
                    active={category === categories[selectedCategory]}
                  >
                    <Text
                      style={{
                        color:
                          category === categories[selectedCategory]
                            ? theme.colors.ui.primary
                            : "white",
                        fontWeight: "bold",
                      }}
                    >
                      {servicesPerCategoryCnt[`${camelize(category)}`]}
                    </Text>
                  </CategorySelectedCount>
                )}
              </CategoryButton>
            ))}
          </CategoryButtonsContainer>

          <Spacer position="bottom" size="large" />

          <View style={{flex: 1}}>
            {shownServices.map((serviceItem) => (
                <View key={serviceItem.id}>
                  <ServiceCard
                      service={serviceItem}
                      onMorePress={() => handleShowViewMore(serviceItem)}
                  />
                  <Spacer position="bottom" size="medium" />
                </View>
            ))}
          </View>


          <Spacer position="bottom" size="large" />
        </PageContentContainer>
      </PageContainer>
      {cart.length > 0 && (
        <ButtonContainer
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
          }}
        >
          <ActionButton
            height={55}
            onPress={() =>
              editBooking
                ? navigation.navigate("BookingReview")
                : navigation.navigate("MeetingTimeSelection", { edit: false })
            }
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              {editBooking ? "Back to review" : "Proceed with booking"}
            </Text>
            <PositioningContainer>
              <CartItemCountContainer>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {cart.length}
                </Text>
              </CartItemCountContainer>
            </PositioningContainer>
          </ActionButton>
        </ButtonContainer>
      )}
      {selectedService && (
        <ServiceDetailsModal
          showModal={true}
          toggleShowModal={handleCloseViewMore}
          service={selectedService}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  specialist: state.booking.specialist,
  cart: state.booking.services,
  servicesPerCategoryCnt: state.booking.servicesPerCategoryCnt,
  bookingStep: state.booking.step
});

const mapDispatchToProps = (dispatch) => ({
  resetCart: () => dispatch(clearCart()),
  setBookingStep: (step) => dispatch(setBookingStep(step))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpecialistDetailsScreen);

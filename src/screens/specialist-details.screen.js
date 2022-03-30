import React, { useEffect, useRef, useState } from "react";
import styled, { useTheme } from "styled-components/native";
import { ScrollView, useWindowDimensions, View } from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { rgba } from "polished";
import Modal from "react-native-modal";
import { camelize } from "../utils/string-formatting";
import {
  FavButton,
  PageContainer,
  PageContentContainer,
  ReviewButton,
  ReviewButtonText,
  SectionTitle,
  TitleContainer,
} from "./components/details-screen.component";
import { Spacer } from "../components/spacer/spacer.component";
import { Text } from "../components/typography/typography.component";
import { Gallery } from "./components/gallery.component";
import { Title } from "react-native-paper";
import { RatingRow } from "../components/rating/rating.component";
import { RatingComponent } from "./components/rating.component";
import {
  DescriptionContainer,
  QuoteIconContainer,
} from "../components/typography/typography.component";
import { ServiceDetailsModal } from "../components/bottom-sheet/bottom-sheet.component";
import ServiceCard from "./components/service-card.component";
import { connect } from "react-redux";
import { clearCart, setBookingStep } from "../redux/booking/booking.actions";
import {
  ActionButton,
  ButtonContainer,
  CartItemCountContainer,
  PositioningContainer,
} from "../components/button/process-action-button.component";
import BookingStepper from "./components/booking-stepper.component";
import { SafeArea } from "../components/utils/safearea.component";
import { CancelButton } from "../components/button/button.component";

const CategoryButtonsContainer = styled.ScrollView`
  flex: 1;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  padding: 0px ${({ theme }) => theme.space[2]};
  padding-left: 0;
  border-radius: 10px;
  overflow: hidden;
`;

const CategoryButtonSeparator = styled.View`
  height: 70%;
  width: 1px;
  background-color: ${({ theme }) => rgba(theme.colors.ui.primary, 0.1)}; ;
`;

const CategoryButton = styled.TouchableOpacity`
  height: 100%;
  padding: 0px ${({ theme }) => theme.space[3]};
  background-color: ${({ active, theme }) =>
    active ? theme.colors.ui.primary : "white"};
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
`;
const ModalView = styled.View`
  width: 250px;
  background-color: white;
  border-radius: ${({ theme }) => theme.sizes[1]};
`;

const ModalCloseButton = styled.TouchableOpacity`
  position: absolute;
  top: ${({ theme }) => theme.space[2]};
  right: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => theme.space[2]};
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.ui.quaternary}; ;
`;

const Separator = styled.View`
  height: 2px;
  width: 100%;
  background-color: ${({ theme }) => rgba(theme.colors.ui.primary, 0.06)};
`;

const ModalContent = styled.View`
  padding: ${({ theme }) => theme.space[3]};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SpecialistDetailsScreen = ({
  resetCart,
  cart,
  route,
  navigation,
  setBookingStep,
  ...restProps
}) => {
  const editBooking = route.params.edit;
  const theme = useTheme();
  const specialist = restProps.specialist
    ? restProps.specialist
    : route.params.specialist;

  const {
    name,
    gallery,
    rating,
    ratingCnt,
    about,
    services,
    isFavorite = false,
  } = specialist;

  const [selectedCategory, setSelectedCategory] = useState(
    restProps.categories[0]
  );
  const ref = useRef(null);
  const [dataSourceCords, setDataSourceCords] = useState({});
  const [shownServices, setShownServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isFav, setIsFav] = useState(isFavorite);
  const [isModalVisible, setModalVisible] = useState(false);
  const [cntPerCategory, setCntPerCategory] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    setShownServices(
      services.filter((item) => item.category === selectedCategory.id)
    );
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
    const cnt = {};
    restProps.categories.forEach((item) => {
      cnt[`${item.name}`] = cart.filter(
        (service) => service.category === item.id
      ).length;
    });
    setCntPerCategory(cnt);
    if (!editBooking) {
      return;
    }
    setModalVisible(cart.length <= 0);
  }, [cart]);

  useEffect(() => {
    if (editBooking) {
      setBookingStep(0);
    }
  }, [navigation.route]);

  useEffect(() => {
    if (restProps.currentCategory) {
      setSelectedCategory(restProps.currentCategory);
    }
    return () => {
      resetCart();
    };
  }, []);

  useEffect(() => {
    if (restProps.currentCategory) {
      ref.current?.scrollTo({
        x: dataSourceCords[
          `${specialist.id}-category-${restProps.currentCategory.id}`
        ],
        y: 0,
        animated: true,
      });
    }
  }, [dataSourceCords]);

  return (
    <SafeArea>
      {restProps.bookingStep > 0 && <BookingStepper pageStep={0} />}
      <PageContainer showsVerticalScrollIndicator={false}>
        <Modal isVisible={isModalVisible}>
          <ModalViewPositioning>
            <ModalView>
              <ModalContent>
                <Row>
                  <Ionicons name="md-warning" size={40} />
                  <Spacer position="left" size="medium" />
                  <Text variant="caption" style={{ fontSize: 18 }}>
                    {" "}
                    Warning
                  </Text>
                </Row>
                <Spacer position="bottom" size="large" />
                <Separator />
                <Spacer position="bottom" size="large" />
                <Text>
                  Emptying the cart will cancel the ongoing booking process
                </Text>
                <Spacer position="bottom" size="large" />
                <Spacer position="bottom" size="medium" />
                <ModalCloseButton onPress={toggleModal}>
                  <Ionicons name="close" size={20} />
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
            <ReviewButton onPress={() => navigation.navigate("Reviews")}>
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

          <Spacer position="bottom" size="medium" />
          <DescriptionContainer>
            <QuoteIconContainer style={{ bottom: 0, right: 0 }}>
              <MaterialIcons name="format-quote" size={16} color={"white"} />
            </QuoteIconContainer>
            <Text style={{ lineHeight: 22, fontSize: 14 }}>{about}</Text>
          </DescriptionContainer>
          {restProps.currentService && (
            <View style={{ flex: 1 }}>
              <Spacer position="bottom" size="large" />
              <Spacer position="bottom" size="large" />
              <SectionTitle>Matching services</SectionTitle>
              <Spacer position="bottom" size="large" />
              <ScrollView showsVerticalScrollIndicator={false}>
                {specialist.services
                  .filter(
                    (service) => service.name === restProps.currentService.name
                  )
                  .map((serviceItem) => (
                    <View key={serviceItem.id}>
                      <ServiceCard
                        service={serviceItem}
                        onMorePress={() => handleShowViewMore(serviceItem)}
                      />
                      <Spacer position="bottom" size="medium" />
                    </View>
                  ))}
              </ScrollView>
            </View>
          )}
          <Spacer position="bottom" size="large" />
          <Spacer position="bottom" size="large" />
          <SectionTitle>Services</SectionTitle>

          <Spacer position="bottom" size="large" />

          <View style={{ height: 1, backgroundColor: "black" }} />
          <CategoryButtonsContainer
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={ref}
          >
            {restProps.categories.map(
              (category, index) =>
                services.filter((service) => service.category === category.id)
                  .length > 0 && (
                  <Row key={`${specialist.id}-category-${category.id}`}>
                    <CategoryButtonSeparator />
                    <CategoryButton
                      active={category.name === selectedCategory.name}
                      onPress={() => setSelectedCategory(category)}
                      onLayout={(event) => {
                        const layout = event.nativeEvent.layout;

                        setDataSourceCords((old) => {
                          return {
                            ...old,
                            [`${specialist.id}-category-${category.id}`]:
                              layout.x,
                          };
                        });
                        console.log(dataSourceCords);
                        console.log("height:", layout.height);
                        console.log("width:", layout.width);
                        console.log("x:", layout.x);
                        console.log("y:", layout.y);
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          letterSpacing: 1,
                          color:
                            category.name === selectedCategory.name
                              ? "white"
                              : theme.colors.ui.primary,
                        }}
                      >
                        {category.name}
                      </Text>
                      <Spacer position="left" size="medium" />

                      {cntPerCategory && cntPerCategory[category.name] > 0 && (
                        <CategorySelectedCount
                          active={category.name === selectedCategory.name}
                        >
                          <Text
                            style={{
                              color:
                                category.name === selectedCategory.name
                                  ? theme.colors.ui.primary
                                  : "white",
                              fontWeight: "bold",
                            }}
                          >
                            {cntPerCategory[category.name]}
                          </Text>
                        </CategorySelectedCount>
                      )}
                    </CategoryButton>
                    <CategoryButtonSeparator />
                  </Row>
                )
            )}
          </CategoryButtonsContainer>
          <View style={{ height: 1, backgroundColor: "black" }} />

          <Spacer position="bottom" size="large" />

          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            {shownServices.map((serviceItem) => (
              <View key={serviceItem.id}>
                <ServiceCard
                  service={serviceItem}
                  onMorePress={() => handleShowViewMore(serviceItem)}
                />
                <Spacer position="bottom" size="medium" />
              </View>
            ))}
          </ScrollView>

          <Spacer position="bottom" size="large" />
          {restProps.bookingStep > 0 && (
            <View>
              <Spacer position="bottom" size="large" />

              <CancelButton onPress={() => navigation.navigate("Map")}>
                <AntDesign name="close" size={14} color="white" />
                <Spacer position="left" size="small" />
                <Text variant="caption" style={{ color: "white" }}>
                  Cancel booking and go back to map
                </Text>
              </CancelButton>
              <Spacer position="bottom" size="large" />
            </View>
          )}
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
                ? navigation.push("BookingReview")
                : navigation.push("MeetingTimeSelection", { edit: false })
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
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({
  currentService: state.booking.currentService,
  currentCategory: state.booking.currentCategory,
  categories: state.categories.categories,
  specialist: state.booking.specialist,
  cart: state.booking.services,
  bookingStep: state.booking.step,
});

const mapDispatchToProps = (dispatch) => ({
  resetCart: () => dispatch(clearCart()),
  setBookingStep: (step) => dispatch(setBookingStep(step)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpecialistDetailsScreen);

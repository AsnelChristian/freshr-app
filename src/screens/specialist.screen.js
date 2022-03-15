import React, { useEffect, useState } from "react";
import { SliderBox } from "react-native-image-slider-box";
import styled, { useTheme } from "styled-components/native";
import { Dimensions, View } from "react-native";
import { Rating } from "react-native-elements";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { rgba } from "polished";

import { Spacer } from "../components/spacer/spacer.component";
import {
  DescriptionContainer,
  Text,
} from "../components/typography/typography.component";
import { Suggestion } from "../features/map/components/suggestion.component";
import ServiceCard from "../components/service/service-card.component";
import { ServiceDetailsModal } from "../components/service/service-info-modal.component";
import { connect } from "react-redux";
import { clearCart } from "../redux/booking/booking.actions";
import {
  ActionButton,
  ButtonContainer,
  CartItemCountContainer,
  PositioningContainer,
} from "../components/button/process-action-button.component";

const PageContainer = styled.ScrollView`
  flex: 1;
  background-color: white;
`;
const SliderContainer = styled.View`
  background-color: white;
`;

const PageContentContainer = styled.View`
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  ${({ showActionButton }) => (showActionButton ? "margin-bottom: 60px" : "")};
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled(Text).attrs((props) => ({
  numberOfLines: 2,
  ellipsis: "tail",
}))`
  font-size: ${({ theme }) => theme.fontSizes.h4};
  font-weight: bold;
  letter-spacing: 1px;
`;

const SectionTitle = styled(Text).attrs((props) => ({
  numberOfLines: 1,
  ellipsis: "tail",
}))`
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-weight: bold;
  letter-spacing: 1px;
`;

const RatingRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MoreInfoButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.space[2]};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
`;

const QuoteIconContainer = styled.View`
  padding: ${({ theme }) => theme.space[1]};
  background-color: ${({ theme }) =>
    `${rgba(theme.colors.brand.primary, 0.1)}`};
  border-radius: 5px;
  position: absolute;
  flex: 1;
  justify-content: center;
`;

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

const FavButton = styled.TouchableOpacity``;

const camelize = (text) => {
  return text.replace(
    /^([A-Z])|[\s-_]+(\w)/g,
    function (match, p1, p2, offset) {
      if (p2) {
        return p2.toUpperCase();
      }
      return p1.toLowerCase();
    }
  );
};

const { height } = Dimensions.get("window");

const SpecialistScreen = ({
  specialist,
  servicesPerCategoryCnt,
  resetCart,
  cart,
  navigation,
}) => {
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
    return () => {
      resetCart();
    };
  }, []);

  return (
    <>
      <PageContainer showsVerticalScrollIndicator={false}>
        <SliderContainer>
          <SliderBox
            images={gallery}
            sliderBoxHeight={height * 0.3}
            dotColor={theme.colors.brand.primary}
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
            resizeMethod={"resize"}
            resizeMode={"cover"}
            paginationBoxStyle={{
              position: "absolute",
              bottom: 0,
              padding: 0,
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              paddingVertical: 10,
            }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              padding: 0,
              margin: 0,
              backgroundColor: "rgba(128, 128, 128, 0.92)",
            }}
            ImageComponentStyle={{
              borderRadius: 15,
              width: "97%",
              marginTop: 5,
            }}
            imageLoadingColor="#2196F3"
          />
        </SliderContainer>

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
            <RatingContainer>
              <Spacer position="right" size="medium">
                <Text
                  variant="caption"
                  style={{ color: theme.colors.brand.primary, fontSize: 22 }}
                >
                  {rating}
                </Text>
              </Spacer>
              <Rating
                type="star"
                ratingColor={theme.colors.brand.primary}
                ratingBackgroundColor={theme.colors.brand.primary}
                fractions={1}
                startingValue={rating}
                readonly
                imageSize={20}
              />
            </RatingContainer>
            <MoreInfoButton>
              <Text
                variant="caption"
                numberOfLines={1}
                ellipsis="tail"
                style={{ fontSize: 16 }}
              >
                {ratingCnt} reviews
              </Text>
              <Spacer position="right" size="medium" />
              <AntDesign
                name="arrowright"
                size={24}
                color={theme.colors.ui.primary}
              />
            </MoreInfoButton>
          </RatingRow>
          <Suggestion value={address}>
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

          {shownServices.map((serviceItem) => (
            <View key={serviceItem.id}>
              <ServiceCard
                service={serviceItem}
                onMorePress={() => handleShowViewMore(serviceItem)}
              />
              <Spacer position="bottom" size="medium" />
            </View>
          ))}

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
            onPress={() => navigation.navigate("SelectFacility")}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Proceed to booking
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
});

const mapDispatchToProps = (dispatch) => ({
  resetCart: () => dispatch(clearCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpecialistScreen);

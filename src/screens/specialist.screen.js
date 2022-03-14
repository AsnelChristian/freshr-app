import React, { useEffect, useState } from "react";
import { SliderBox } from "react-native-image-slider-box";
import styled, { useTheme } from "styled-components/native";
import { Dimensions, View } from "react-native";
import { Rating } from "react-native-elements";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { rgba } from "polished";

import { Spacer } from "../components/spacer/spacer.component";
import { Text } from "../components/typography/typography.component";
import { Suggestion } from "../features/map/components/suggestion.component";
import { ServiceCard } from "../components/service/service-card.component";
import { ServiceDetailsModal } from "../components/service/service-info-modal.component";
import { connect } from "react-redux";
import {
  addServiceToCart,
  clearCart,
  removeServiceFromCart,
  toggleCart,
} from "../redux/booking/booking.actions";

const PageContainer = styled.ScrollView`
  flex: 1;
  background-color: white;
`;
const SliderContainer = styled.View`
  background-color: white;
`;

const PageContentContainer = styled.View`
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
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

const DescriptionContainer = styled.View`
  padding: ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) =>
    `${rgba(theme.colors.ui.quaternary, 0.9)}`};
  border-radius: ${({ theme }) => theme.space[2]};
  overflow: hidden;
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

const FavButton = styled.TouchableOpacity``;

const CartButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.brand.primary};
  padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[2]};
  position: absolute;
  height: 80px;
  bottom: 0px;
  left: 0;
  z-index: 99999;
`;

const { height } = Dimensions.get("window");

const SpecialistScreen = ({
  specialist,
  cart,
  addCartItem,
  removeCartItem,
  showCart,
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

  const [selectedService, setSelectedService] = useState(null);
  const [isFav, setIsFav] = useState(isFavorite);

  const addOrRemoveFromCart = (service, add) => {
    if (add) {
      addCartItem(service);
    } else {
      removeCartItem(service);
    }
  };
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
    showCart(true);
    return () => {
      showCart(false);
    };
  }, []);

  return (
    <>
      <PageContainer>
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

        <PageContentContainer>
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

          {services.map((serviceItem) => (
            <View key={serviceItem.id}>
              <ServiceCard
                service={serviceItem}
                onMorePress={() => handleShowViewMore(serviceItem)}
                addToCart={(add) => addOrRemoveFromCart(serviceItem, add)}
              />
              <Spacer position="bottom" size="medium" />
            </View>
          ))}
        </PageContentContainer>
      </PageContainer>
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
});

const mapDispatchToProps = (dispatch) => ({
  addCartItem: (service) => dispatch(addServiceToCart(service)),
  removeCartItem: (service) => dispatch(removeServiceFromCart(service)),
  showCart: (value) => dispatch(toggleCart(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpecialistScreen);

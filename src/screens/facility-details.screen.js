import { connect } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { rgba } from "polished";
import DashedLine from "react-native-dashed-line";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { Gallery } from "./components/gallery.component";
import {
  FavButton,
  PageContainer,
  PageContentContainer,
  ReviewButton,
  ReviewButtonText,
  SectionTitle,
  Title,
  TitleContainer,
} from "./components/details-screen.component";
import { Spacer } from "../components/spacer/spacer.component";

import { RatingComponent } from "./components/rating.component";
import {
  DescriptionContainer,
  QuoteIconContainer,
  Text,
} from "../components/typography/typography.component";
import React, { useRef, useState } from "react";
import { Suggestion } from "../features/map/components/suggestion.component";
import {
  TimeItemContainer,
  TimeItemMainContainer,
} from "../components/chip/chip.component";
import { Dimensions, View } from "react-native";
import { RatingRow } from "../components/rating/rating.component";
import { ReviewCard } from "../components/reviews/review-card.component";
import Carousel from "react-native-snap-carousel";

const ChipsRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const ChipsRowDotted = styled(DashedLine)`
  position: absolute;
  top: 55%;
  left: 0;
  width: 100%;
  height: 3px;
  z-index: -1;
`;

const Row = styled.View`
  flex: 1;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const GradientInfoCard = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const SeatIconContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const GradientInfoCardContainer = styled.View`
  padding: ${({ theme }) => theme.space[3]};
  z-index: -1;
  position: relative;
  border-radius: ${({ theme }) => theme.sizes[1]};
  overflow: hidden;
`;

const GradientInfoCardBackground = styled(LinearGradient)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const InfoChip = styled.View`
  background-color: ${({ active, theme }) =>
    active ? theme.colors.ui.primary : "white"};
  border-radius: ${({ theme }) => theme.sizes[3]};
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  flex-direction: row;
  align-items: center;
`;

const GradientInfoCardProgressContainer = styled.View`
  flex: 1;
  height: 4px;
  background-color: ${rgba("black", 0.1)};
`;

const GradientInfoCardProgress = styled.View`
  flex: 1;
  width: ${({ width }) => `${width}%`};
  background-color: white;
`;

const FacilityDetailsScreen = ({ route, isFavorite = false }) => {
  const { facility } = route.params;
  const {
    gallery,
    rating,
    ratingCnt,
    name,
    about,
    address,
    time,
    distance,
    openingHours,
    isOpen,
    seatCapacity,
    seatAvailable,
    reviews,
  } = facility;

  const theme = useTheme();
  const flatList = useRef();
  const [isFav, setIsFav] = useState(isFavorite);
  const handleFavButtonPress = () => {
    setIsFav(!isFav);
  };
  return (
    <PageContainer showsVerticalScrollIndicator={false}>
      <Gallery images={gallery} />
      <PageContentContainer showActionButton={false}>
        <Spacer position="top" size="large" />
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
        <Spacer position="bottom" size="medium" />
        <Suggestion value={address} pressable={false} size={16}>
          <Ionicons name="location" size={22} />
        </Suggestion>
        <Spacer position="bottom" size="medium" />
        <ChipsRow>
          <ChipsRowDotted
            dashLength={4}
            dashThickness={4}
            dashGap={8}
            dashColor={rgba(theme.colors.brand.primary, 0.4)}
            dashStyle={{ borderRadius: 100 }}
          />
          <TimeItemMainContainer>
            <TimeItemContainer>
              <MaterialCommunityIcons name="map-marker-distance" size={20} />
              <Spacer position="left" size="small" />
              <Text variant="caption">{distance} km</Text>
            </TimeItemContainer>
          </TimeItemMainContainer>
          <Spacer position="right" size="medium" />
          <TimeItemMainContainer>
            <TimeItemContainer>
              <Ionicons name="md-bicycle-sharp" size={20} />
              <Spacer position="left" size="small" />
              <Text variant="caption">{time.bicycle} min</Text>
            </TimeItemContainer>
          </TimeItemMainContainer>
          <Spacer position="right" size="medium" />
          <TimeItemMainContainer>
            <TimeItemContainer>
              <Ionicons name="md-walk-sharp" size={20} />
              <Spacer position="left" size="small" />
              <Text variant="caption">{time.foot} min</Text>
            </TimeItemContainer>
          </TimeItemMainContainer>
          <Spacer position="right" size="medium" />
          <TimeItemMainContainer>
            <TimeItemContainer>
              <Ionicons name="md-car-sharp" size={20} />
              <Spacer position="left" size="small" />
              <Text variant="caption">{time.car} min</Text>
            </TimeItemContainer>
          </TimeItemMainContainer>
        </ChipsRow>
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="large" />
        <GradientInfoCardContainer>
          <GradientInfoCardBackground
            colors={["#ffafbd", "#ffc3a0"]}
            start={[0, 1]}
            end={[1, 0]}
          />

          <Text variant="caption" style={{ color: "white", fontSize: 16 }}>
            Opening hours
          </Text>
          <Spacer position="bottom" size="large" />

          <GradientInfoCard>
            <InfoChip active={!isOpen}>
              <Ionicons
                name="lock-open"
                size={18}
                color={!isOpen ? "white" : "black"}
              />
              <Spacer position="left" size="small" />
              <Text
                variant="caption"
                style={{ color: !isOpen ? "white" : "black" }}
              >
                {openingHours.opens}
              </Text>
            </InfoChip>

            <GradientInfoCardProgressContainer>
              <GradientInfoCardProgress width={30} />
            </GradientInfoCardProgressContainer>
            <InfoChip active={isOpen}>
              <Ionicons
                name="lock-closed"
                size={18}
                color={isOpen ? "white" : "black"}
              />
              <Spacer position="left" size="small" />
              <Text
                variant="caption"
                style={{ color: isOpen ? "white" : "black" }}
              >
                {openingHours.closes}
              </Text>
            </InfoChip>
          </GradientInfoCard>
          <Spacer position="bottom" size="small" />
        </GradientInfoCardContainer>
        <Spacer position="bottom" size="large" />
        <GradientInfoCardContainer>
          <GradientInfoCardBackground
            colors={["#06beb6", "#48b1bf"]}
            start={[0, 1]}
            end={[1, 0]}
          />
          <Row>
            <View>
              <Text variant="caption" style={{ color: "white", fontSize: 16 }}>
                Seat capacity
              </Text>
              <Spacer position="bottom" size="large" />

              <GradientInfoCard>
                <InfoChip>
                  <MaterialIcons name="event-seat" size={18} />
                  <Spacer position="left" size="small" />
                  <Text variant="caption">{seatAvailable} available</Text>
                </InfoChip>
                <Spacer position="left" size="medium" />
                <InfoChip active={true}>
                  <MaterialIcons name="event-seat" size={18} color="white" />
                  <Spacer position="left" size="small" />
                  <Text variant="caption" style={{ color: "white" }}>
                    {seatCapacity} total
                  </Text>
                </InfoChip>
              </GradientInfoCard>
            </View>

            <SeatIconContainer>
              <MaterialIcons name="event-seat" size={80} color="white" />
            </SeatIconContainer>
          </Row>
          <Spacer position="bottom" size="small" />
        </GradientInfoCardContainer>
        <Spacer position="bottom" size="medium" />
        <Spacer position="bottom" size="large" />
        <DescriptionContainer>
          <QuoteIconContainer style={{ bottom: 0, right: 0 }}>
            <MaterialIcons name="format-quote" size={35} color={"white"} />
          </QuoteIconContainer>
          <Text style={{ lineHeight: 22 }}>{about}</Text>
        </DescriptionContainer>
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="large" />
        <SectionTitle>Latest reviews</SectionTitle>
        <Spacer position="bottom" size="large" />
        <View style={{ marginRight: -16, marginLeft: -16 }}>
          <Carousel
            ref={flatList}
            data={reviews}
            renderItem={({ item }) => <ReviewCard review={item} />}
            keyExtractor={(item) => `facility-detail-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={Dimensions.get("window").width - 60}
          />
        </View>
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="large" />
      </PageContentContainer>
    </PageContainer>
  );
};

export default connect(null, null)(FacilityDetailsScreen);

import styled, { useTheme } from "styled-components/native";
import { Dimensions, View } from "react-native";

import { Rating } from "react-native-elements";
import React from "react";
import { rgba } from "polished";
import ReadMore from "react-native-read-more-text";

import { Spacer } from "../../components/spacer/spacer.component";
import { RatingContainer } from "../../components/rating/rating.component";
import { Text } from "../../components/typography/typography.component";

const { width } = Dimensions.get("window");
const ReviewContainer = styled.ScrollView`
  padding: ${({ theme }) => theme.space[3]};
  max-height: 280px;
  width: ${width - 60}px;
  border-radius: ${({ theme }) => theme.sizes[1]};
  border: 2px solid ${({ theme }) => `${rgba(theme.colors.ui.primary, 0.15)}`};
  overflow: hidden;
`;

const ReviewHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AuthorImage = styled.Image`
  width: 45px;
  height: 45px;
  border-radius: 200px;
  aspect-ratio: 1;
`;

const AuthorName = styled(Text)``;

export const ReviewCard = ({ review }) => {
  const theme = useTheme();
  const { author, rating, authorImage, description } = review;
  return (
    <ReviewContainer>
      <ReviewHeaderContainer>
        <AuthorImage source={{ uri: authorImage }} />
        <Spacer position="left" size="large" />
        <View>
          <AuthorName variant="caption">{author}</AuthorName>
          <Spacer position="bottom" size="medium" />
          <RatingContainer>
            <Spacer position="right" size="small">
              <Text variant="caption" style={{ fontSize: 16 }}>
                {rating}
              </Text>
            </Spacer>
            <Rating
              type="star"
              ratingColor={theme.colors.brand.primary}
              fractions={1}
              startingValue={rating}
              readonly
              imageSize={16}
            />
          </RatingContainer>
        </View>
      </ReviewHeaderContainer>
      <Spacer position="bottom" size="large" />
      <View style={{ padding: 4 }}>
        <Text
          numberOfLines={6}
          ellipsis="tail"
          style={{ lineHeight: 22, fontSize: 14 }}
        >
          {description}
        </Text>
      </View>
    </ReviewContainer>
  );
};

export const ReviewCompleteCard = ({ review }) => {
  const theme = useTheme();
  const { author, rating, authorImage, description } = review;

  const _renderTruncatedFooter = (handlePress) => {
    return (
      <Text
        variant="caption"
        style={{ color: theme.colors.ui.primary, marginTop: 5 }}
        onPress={handlePress}
      >
        Read more
      </Text>
    );
  };

  const _renderRevealedFooter = (handlePress) => {
    return (
      <Text
        variant="caption"
        style={{ color: theme.colors.ui.primary, marginTop: 5 }}
        onPress={handlePress}
      >
        Show less
      </Text>
    );
  };

  const _handleTextReady = () => {
    // ...
  };
  return (
    <View>
      <ReviewHeaderContainer>
        <AuthorImage source={{ uri: authorImage }} />
        <Spacer position="left" size="large" />
        <View>
          <AuthorName variant="caption">{author}</AuthorName>
          <Spacer position="bottom" size="medium" />
          <RatingContainer>
            <Spacer position="right" size="small">
              <Text variant="caption" style={{ fontSize: 16 }}>
                {rating}
              </Text>
            </Spacer>
            <Rating
              type="star"
              ratingColor={theme.colors.brand.primary}
              fractions={1}
              startingValue={rating}
              readonly
              imageSize={14}
            />
          </RatingContainer>
        </View>
      </ReviewHeaderContainer>
      <Spacer position="bottom" size="medium" />
      <View style={{ padding: 4 }}>
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={_renderTruncatedFooter}
          renderRevealedFooter={_renderRevealedFooter}
          onReady={_handleTextReady}
        >
          <Text style={{ lineHeight: 22, fontSize: 14 }}>{description}</Text>
        </ReadMore>
      </View>
      <Spacer position="bottom" size="large" />
      <Spacer position="bottom" size="large" />
    </View>
  );
};

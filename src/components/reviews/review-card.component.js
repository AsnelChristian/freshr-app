import styled, { useTheme } from "styled-components/native";
import { Dimensions, View } from "react-native";

import { Text } from "../typography/typography.component";
import { Spacer } from "../spacer/spacer.component";
import { Rating } from "react-native-elements";
import React from "react";
import { RatingContainer } from "../rating/rating.component";
import { rgba } from "polished";

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
  width: 60px;
  height: 60px;
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
        <Text numberOfLines={6} ellipsis="tail" style={{ lineHeight: 22 }}>
          {description}
        </Text>
      </View>
    </ReviewContainer>
  );
};

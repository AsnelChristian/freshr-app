import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import { Rating } from "react-native-elements";
import React from "react";
import { useTheme } from "styled-components/native";
import { RatingContainer } from "../../components/rating/rating.component";

export const RatingComponent = ({ rating }) => {
  const theme = useTheme();
  return (
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
  );
};

import styled, { useTheme } from "styled-components/native";
import { Row } from "../../components/helpers/helpers.component";
import { Text } from "../../components/typography/typography.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { Rating } from "react-native-elements";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

const CoverImage = styled.Image`
  width: 80px;
  aspect-ratio: 1;
  border-radius: 15px;
  overflow: hidden;
`;

const InfoContainer = styled.View`
  flex: 1;
`;

const DetailsButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.space[2]};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.ui.primary};
`;

export const SmallComponentCard = ({ data, url, urlParam, ...restProps }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Row style={{ height: 80, justifyContent: "space-between", padding: 16 }}>
      {data && (
        <>
          <CoverImage source={{ uri: data.coverImage }} />
          <Spacer position="left" size="medium" />
          <InfoContainer>
            <Text
              variant="caption"
              style={{ fontSize: 14 }}
              numberOfLines={1}
              ellipsis="tail"
            >
              {data.name}
            </Text>
            <Spacer position="bottom" size="medium" />

            <Row style={{ flexWrap: "wrap" }}>
              <Spacer position="right" size="small">
                <Text variant="caption" style={{ fontSize: 16 }}>
                  {data.rating}
                </Text>
              </Spacer>
              <Rating
                type="star"
                ratingColor={theme.colors.brand.primary}
                fractions={1}
                startingValue={data.rating}
                readonly
                imageSize={16}
              />
            </Row>
          </InfoContainer>
          <Spacer position="left" size="medium" />

          <View style={{ justifyContent: "center", justifySelf: "flex-end" }}>
            <DetailsButton onPress={() => navigation.push(url, urlParam)}>
              <Text variant="caption" style={{ color: "white" }}>
                details &rarr;
              </Text>
            </DetailsButton>
          </View>
        </>
      )}
    </Row>
  );
};

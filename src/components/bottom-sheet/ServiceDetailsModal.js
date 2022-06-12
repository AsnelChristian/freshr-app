import React from "react";
import { useTheme } from "styled-components/native";
import { Rating } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";

import ServiceCard from "../../screens/components/service-card.component";
import { Spacer } from "../spacer/spacer.component";
import { Row } from "../helpers/helpers.component";
import { RatingContainer } from "../rating/rating.component";
import { DescriptionContainer, Text } from "../typography/typography.component";
import { FilterModal } from "./bottom-sheet.component";

export const ServiceDetailsModal = ({
                                      showModal,
                                      toggleShowModal,
                                      service,
                                    }) => {
  const theme = useTheme();
  return (
    <FilterModal showModal={showModal} toggleShowModal={toggleShowModal}>
      <ServiceCard service={service} info={true} />
      <Spacer position="top" size="large" />
      <Row>
        <RatingContainer>
          <Spacer position="right" size="medium">
            <Text
              variant="caption"
              style={{ color: theme.colors.brand.primary, fontSize: 16 }}
            >
              {service.rating}
            </Text>
          </Spacer>

          <Rating
            type="star"
            ratingColor={theme.colors.brand.primary}
            ratingBackgroundColor={theme.colors.brand.primary}
            tintColor={theme.colors.ui.quaternary}
            fractions={1}
            startingValue={service.rating}
            readonly
            imageSize={16}
          />
        </RatingContainer>
        <Row>
          <Entypo name="clock" size={20} />
          <Spacer position="right" size="medium" />
          <Text variant="caption">{service.time} (approx.)</Text>
        </Row>
      </Row>

      <Spacer position="bottom" size="medium" />
      <DescriptionContainer>
        <Text style={{ lineHeight: 22 }}>{service.description}</Text>
      </DescriptionContainer>
      <Spacer position="bottom" size="large" />
      <Spacer position="bottom" size="medium" />
    </FilterModal>
  );
};

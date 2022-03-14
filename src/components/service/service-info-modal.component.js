import React, { useEffect, useRef } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import styled, { useTheme } from "styled-components/native";

import ServiceCard from "./service-card.component";
import { BottomModal } from "../modal/bottom-sheet-modalcomponent";
import { Spacer } from "../spacer/spacer.component";
import { Rating } from "react-native-elements";
import { DescriptionContainer, Text } from "../typography/typography.component";

const CloseButton = styled.TouchableOpacity`
  margin-left: ${({ theme }) => theme.space[3]};
  padding: 0px ${({ theme }) => theme.space[1]};
`;

const ModalContent = styled.View`
  padding: ${({ theme }) => theme.space[3]};
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Row = styled.View`
  padding: ${({ theme }) => theme.space[2]};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TimeContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ServiceDetailsModal = ({
  showModal,
  toggleShowModal,
  service,
}) => {
  const theme = useTheme();
  const bottomSheetModalRef = useRef(null);
  useEffect(() => {
    if (showModal) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.close();
    }
  }, [showModal]);

  const handleClose = () => {
    toggleShowModal();
  };

  return (
    <BottomModal ref={bottomSheetModalRef} onClose={handleClose}>
      <Spacer position="bottom" size="small">
        <CloseButton onPress={handleClose}>
          <Ionicons name="close" size={20} />
        </CloseButton>
        <Spacer position="top" size="medium" />
        <ModalContent>
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
                fractions={1}
                startingValue={service.rating}
                readonly
                imageSize={16}
              />
            </RatingContainer>
            <TimeContainer>
              <Entypo name="clock" size={20} />
              <Spacer position="right" size="medium" />
              <Text variant="caption">{service.time} (approx.)</Text>
            </TimeContainer>
          </Row>

          <Spacer position="bottom" size="medium" />
          <DescriptionContainer>
            <Text style={{ lineHeight: 22 }}>{service.description}</Text>
          </DescriptionContainer>
          <Spacer position="bottom" size="large" />
        </ModalContent>
      </Spacer>
    </BottomModal>
  );
};

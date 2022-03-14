import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import { ServiceCard } from "./service-card.component";
import { BottomModal } from "../modal/bottom-sheet-modalcomponent";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/typography.component";

const CloseButton = styled.TouchableOpacity`
  margin-left: ${({ theme }) => theme.space[3]};
  padding: 0px ${({ theme }) => theme.space[1]};
`;

const ModalContent = styled.View`
  padding: ${({ theme }) => theme.space[3]};
`;

export const ServiceDetailsModal = ({
  showModal,
  toggleShowModal,
  service,
}) => {
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
        </ModalContent>
        <Spacer position="top" size="medium" />
      </Spacer>
    </BottomModal>
  );
};

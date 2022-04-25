import { PaddedContainer, SectionTitle } from "../details-screen.component";
import { View } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  DescriptionContainer,
  QuoteIconContainer,
  Text,
} from "../../../components/typography/typography.component";
import {
  EditButton,
  ModalButton,
} from "../../../components/button/button.component";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import styled, { useTheme } from "styled-components/native";
import { theme } from "../../../infrastructure/theme";
import React, { useState } from "react";
import { FilterModal } from "../../../components/bottom-sheet/bottom-sheet.component";
import {
  FormContainer,
  FormDescriptionInput,
  LengthIndicator,
} from "../../pro-facility/components/pro-facility-form-helper";
import { Row, Separator } from "../../../components/helpers/helpers.component";

const ConfigRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const EditFacilityDescriptionModal = ({
  showModal,
  toggleModal,
  title,
  subTitle,
  label,
  length,
}) => {
  const theme = useTheme();
  const [facilityDescription, setFacilityDescription] = useState("");
  const [inputLength, setInputLength] = useState(0);

  return (
    <FilterModal
      showModal={showModal}
      toggleShowModal={toggleModal}
      scrollView={false}
    >
      <PaddedContainer>
        <Spacer position="bottom" size="large" />

        <SectionTitle>{title}</SectionTitle>
        <Spacer position="bottom" size="large" />

        <FormContainer>
          <FormContainer>
            <FormDescriptionInput
              label={label}
              value={facilityDescription}
              onChangeText={(text) => {
                setFacilityDescription(text);
                setInputLength(text.length);
              }}
            />
            <LengthIndicator>
              <Text style={{ fontSize: 18, color: "gray" }}>
                {inputLength} / {length}
              </Text>
            </LengthIndicator>
          </FormContainer>
        </FormContainer>
      </PaddedContainer>
      <Spacer position="bottom" size="large" />
      <Spacer position="bottom" size="large" />
      <Separator />
      <Row
        style={{
          justifyContent: "space-between",
          paddingHorizontal: 8,
          paddingVertical: 16,
        }}
      >
        <ModalButton onPress={() => null}>
          <Text>Cancel</Text>
        </ModalButton>
        <ModalButton variant="primary" onPress={() => null}>
          <Text style={{ color: "white" }}>Apply change</Text>
        </ModalButton>
      </Row>
    </FilterModal>
  );
};

export const renderDescription = (title, subtitle, value, editAction) => {
  return (
    <>
      <ConfigRow>
        <View style={{ flex: 1 }}>
          <SectionTitle>{title}</SectionTitle>
          <Spacer position="bottom" size="medium" />
          <Text variant="caption" style={{ lineHeight: 22 }}>
            {subtitle}
          </Text>
          <Spacer position="bottom" size="large" />
        </View>
        <Spacer position="left" size="medium" />
        <EditButton onPress={editAction}>
          <AntDesign name="edit" size={20} color={theme.colors.ui.primary} />
        </EditButton>
      </ConfigRow>
      <DescriptionContainer>
        <QuoteIconContainer style={{ bottom: 0, right: 0 }}>
          <MaterialIcons name="format-quote" size={16} color={"white"} />
        </QuoteIconContainer>
        <Text style={{ lineHeight: 22, fontSize: 14 }}>{value}</Text>
      </DescriptionContainer>
      <Spacer position="bottom" size="large" />
      <Spacer position="bottom" size="large" />
    </>
  );
};

export const WelcomeContainer = styled.View`
  padding: 30px ${({ theme }) => theme.space[3]};
  background-color: ${({ theme, active }) =>
    active ? theme.colors.brand.quaternary : theme.colors.ui.primary};
`;

export const WelcomeMessageContainer = styled.View`
  padding: ${({ theme }) => theme.space[3]} 0px;
  padding-top: 0px;
`;

export const WelcomeText = styled(Text)`
  font-size: 30px;
  line-height: 40px;
  color: white;
  font-weight: bold;
`;

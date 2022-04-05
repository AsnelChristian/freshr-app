import { Footer, FooterRow } from "../components/details-screen.component";
import { Separator } from "../../components/helpers/helpers.component";
import { ModalButton } from "../../components/button/button.component";
import { AntDesign } from "@expo/vector-icons";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import React from "react";

export const renderFooter = (navigation, next) => {
  return (
    <Footer>
      <Separator />
      <FooterRow>
        <ModalButton onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={16} color="black" />
          <Spacer position="left" size="small" />
          <Text>Go back</Text>
        </ModalButton>
        <ModalButton
          variant="primary"
          onPress={() => navigation.navigate(next)}
        >
          <Text style={{ color: "white" }}>Next</Text>
          <Spacer position="left" size="small" />
          <AntDesign name="arrowright" size={16} color="white" />
        </ModalButton>
      </FooterRow>
    </Footer>
  );
};

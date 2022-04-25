import Modal from "react-native-modal";
import {
  ModalCloseButton,
  ModalView,
  ModalViewPositioning,
} from "../../pro-facility/components/pro-facility-form-helper";
import { View } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  Footer,
  FooterRow,
  PaddedContainer,
  SectionTitle,
} from "../../components/details-screen.component";
import { Text } from "../../../components/typography/typography.component";
import { Separator } from "../../../components/helpers/helpers.component";
import { ModalButton } from "../../../components/button/button.component";

export const renderConfirmModal = (
  isVisible,
  setIsVisible,
  title,
  description,
  action
) => {
  return (
    <Modal isVisible={isVisible}>
      <ModalViewPositioning>
        <ModalView>
          <View>
            <Spacer position="top" size="small" />
            <Spacer position="left" size="small">
              <ModalCloseButton onPress={() => setIsVisible(false)}>
                <Ionicons name="close" size={20} color="white" />
              </ModalCloseButton>
            </Spacer>
            <Spacer position="top" size="small" />
          </View>
          <Spacer position="top" size="large" />

          <PaddedContainer>
            <SectionTitle>{title} </SectionTitle>
            <Spacer position="bottom" size="large" />
            <Text variant="caption" style={{ fontSize: 14 }}>
              {description}
            </Text>
            <Spacer position="bottom" size="large" />
          </PaddedContainer>
          <Footer>
            <Separator />
            <FooterRow>
              <ModalButton
                onPress={() => setIsVisible(false)}
                style={{ paddingVertical: 8 }}
              >
                <MaterialIcons name="cancel" size={24} color="black" />
                <Spacer position="left" size="small" />
                <Text>Cancel</Text>
              </ModalButton>
              <ModalButton
                variant="primary"
                style={{ paddingVertical: 8 }}
                onPress={() => {
                  action();
                  setIsVisible(false);
                }}
              >
                <Text style={{ color: "white" }}>Proceed</Text>
                <Spacer position="left" size="small" />
                <AntDesign name="arrowright" size={16} color="white" />
              </ModalButton>
            </FooterRow>
          </Footer>
        </ModalView>
      </ModalViewPositioning>
    </Modal>
  );
};

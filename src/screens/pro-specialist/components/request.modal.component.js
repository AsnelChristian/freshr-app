import styled, { useTheme } from "styled-components/native";
import Modal from "react-native-modal";
import { Dimensions, ScrollView, View } from "react-native";
import {
  PaddedContainer,
  SectionTitle,
} from "../../components/details-screen.component";
import ServiceCard from "../../components/service-card.component";
import React, { useEffect, useState } from "react";
import { facilitiesMock } from "../../../mocks/facilities-mock";
import { TimerView } from "./timer.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import MapView from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "../../../components/typography/typography.component";
import { BlurView } from "expo-blur";
import { rgba } from "polished";
import FacilityCard from "../../components/facility-card.component";

const { width, height } = Dimensions.get("window");

const RequestContainer = styled.View`
  flex: 1;
  margin-right: 0;
  background-color: white;
`;

const Footer = styled.View`
  flex-direction: row;
  height: 70px;
`;

const ActionButton = styled.TouchableOpacity`
  margin-top: 3px;
  flex: 1;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.brand.quaternary : theme.colors.ui.quaternary};
  position: relative;
  align-items: center;
  justify-content: center;
`;

const AddressContainer = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  flex-direction: row;
  padding: 32px 16px;
`;

const PriceContainer = styled.View`
  padding: 16px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
`;

const AddressSeparator = styled.View`
  height: 60%;
  width: 1px;
  background-color: ${({ theme }) => theme.colors.ui.border};
`;

const GlassBackground = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 15px;
`;
const Gradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const RequestModal = ({ isVisible, ...restProps }) => {
  const theme = useTheme();
  const [services, setServices] = useState([]);
  const [facility, setFacility] = useState(null);

  useEffect(() => {
    const servicesMock = facilitiesMock[0].professionals[0].services;
    setServices(servicesMock);
    setFacility(facilitiesMock[0]);
  }, []);

  const renderServices = () => {
    return (
      <PaddedContainer style={{ flex: 1 }} elevation={1}>
        <View style={{ flex: 1 }}>
          {services.map((service, index) => (
            <View style={{ marginBottom: 8 }} key={`${index}-service`}>
              <ServiceCard
                key={service.id}
                service={service}
                press={() => null}
                info={true}
              />
            </View>
          ))}
        </View>
        <AddressContainer>
          <View
            style={{
              justifyContent: "center",
              padding: 8,
              borderRadius: 30,
              backgroundColor: theme.colors.brand.quaternary,
            }}
          >
            <Text style={{ color: "white" }}>30 min</Text>
          </View>
          <Spacer position="left" size="large" />
          <AddressSeparator />
          <Spacer position="left" size="large" />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18 }}>56072 Koblenz metternich</Text>
            <Spacer position="bottom" size="medium" />
            <Text variant="caption">Germany</Text>
          </View>
        </AddressContainer>

        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="large" />
        {facility && <FacilityCard facility={facility} info={true} />}
        <Spacer position="bottom" size="large" />
        <Spacer position="bottom" size="large" />
      </PaddedContainer>
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      deviceHeight={height}
      deviceWidth={width}
      coverScreen={true}
      style={{
        top: 0,
        left: 0,
        right: 0,
        padding: 0,
        margin: 0,
        marginHorizontal: 0,
        justifyContent: "flex-end",
      }}
    >
      <RequestContainer>
        <View style={{ flex: 1 }}>
          <Spacer position="bottom" size="large" />
          <Spacer position="bottom" size="large" />
          <PaddedContainer>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <SectionTitle>Service request</SectionTitle>
              <TimerView />
            </View>
          </PaddedContainer>
          <Spacer position="bottom" size="large" />

          <View
            style={{
              flexDirection: "row",
              position: "relative",
              padding: 16,
            }}
          >
            <Gradient
              colors={[
                theme.colors.brand.primary,
                theme.colors.brand.quaternary,
              ]}
              start={[0, 1]}
              end={[1, 0]}
            />
            <PriceContainer>
              <GlassBackground intensity={30} style={{ borderRadius: 0 }} />
              <Text
                style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
              >
                $ 140.00
              </Text>
            </PriceContainer>
          </View>
          <ScrollView>
            <View style={{ flex: 1 }}>{renderServices()}</View>
          </ScrollView>
        </View>
        <Footer>
          <ActionButton
            active={false}
            elevation={1}
            onPress={restProps.closeRequest}
            style={{ backgroundColor: theme.colors.ui.primary }}
          >
            <Text variant="caption" style={{ color: "white" }}>
              Reject
            </Text>
          </ActionButton>
          <ActionButton active={true} elevation={1}>
            <Text variant="caption" style={{ color: "white" }}>
              Approve
            </Text>
          </ActionButton>
        </Footer>
      </RequestContainer>
    </Modal>
  );
};

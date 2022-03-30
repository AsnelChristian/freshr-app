import styled, { useTheme } from "styled-components/native";
import { rgba } from "polished";
import { Text } from "../../components/typography/typography.component";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Spacer } from "../../components/spacer/spacer.component";
import { SmallComponentCard } from "./small-card.component";
import { Row, Separator } from "../../components/helpers/helpers.component";
import QRCode from "react-native-qrcode-svg";
import { ScrollView, View } from "react-native";
import ServiceCard from "./service-card.component";
import React from "react";
import { theme } from "../../infrastructure/theme";
import { useNavigation } from "@react-navigation/native";

const OrderCardContainer = styled.ScrollView`
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  position: relative;
  padding: ${({ theme }) => theme.space[2]} 0px;
`;

const AddressContainer = styled.View`
  background-color: ${({ theme }) => rgba(theme.colors.ui.primary, 1)};
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.space[3]};
`;

const TimeContainer = styled.View`
  background-color: ${({ theme }) => rgba(theme.colors.ui.primary, 0.05)};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space[3]};
`;

const TimeChip = styled.View`
  flex-direction: row;
  padding: ${({ theme }) => theme.space[2]};
  align-items: center;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.ui.primary};
  background-color: ${({ theme }) => rgba(theme.colors.ui.primary, 0.2)};
`;

const QRCodeContainer = styled.View`
  padding: ${({ theme }) => theme.space[3]} 0px;
  justify-content: center;
  align-items: center;
`;

const OrderCode = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.brand.primary};
`;

const OrderStatusContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ color }) => color};
  padding: ${({ theme }) => theme.space[2]};
  position: absolute;
  top: 0px;
  z-index: 1;
  ${({ toLeft = true }) => (toLeft ? "left: 0px;" : "right: 0px")};
`;

const renderOrderStatus = (bookingStatus, toLeft = true) => {
  let bgColor = "";
  let icon = null;
  let color = "";
  switch (bookingStatus) {
    case "completed": {
      bgColor = theme.colors.brand.primary;
      icon = <Ionicons name="checkmark-done-circle" size={20} color="white" />;
      color = "white";
      break;
    }
    case "cancelled": {
      bgColor = theme.colors.text.inputError;
      icon = <MaterialIcons name="cancel" size={20} color="white" />;
      color = "white";
      break;
    }

    case "ongoing":
      bgColor = rgba(theme.colors.brand.primary, 0.5);
      icon = <Ionicons name="checkmark-circle-sharp" size={24} color="black" />;
      color = "black";
      break;
    default:
      bgColor = theme.colors.ui.primary;
      icon = <MaterialIcons name="pending" size={20} color="white" />;
      color = "white";
  }

  return (
    <OrderStatusContainer color={bgColor} toLeft={toLeft}>
      {icon}
      <Spacer position="left" size="medium" />
      <Text variant="caption" style={{ color: color }}>
        {bookingStatus}
      </Text>
    </OrderStatusContainer>
  );
};

export const OrderCard = ({ order, handleShowViewMore }) => {
  const theme = useTheme();

  const renderFacility = () => {
    return (
      <>
        <SmallComponentCard
          data={order.facility}
          url="FacilityDetails"
          urlParam={{
            facility: order.facility,
          }}
        />
        <Spacer position="bottom" size="medium" />
        <Separator />
      </>
    );
  };

  const renderQRCode = () => {
    return (
      <QRCodeContainer>
        <OrderCode>65894034</OrderCode>
        <Spacer position="bottom" size="medium" />
        <QRCode value="65894034" size={150} color={theme.colors.ui.primary} />
        <Spacer position="bottom" size="medium" />
        <Text variant="caption" style={{ fontSize: 14 }}>
          Have your specialist scan your code once completed.
        </Text>
        <Spacer position="bottom" size="medium" />
      </QRCodeContainer>
    );
  };

  const renderSpecialist = () => {
    return (
      <View>
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant="caption" style={{ fontSize: 16 }}>
            Your specialist
          </Text>
        </View>
        <Spacer position="bottom" size="medium" />

        <SmallComponentCard
          data={order.specialist}
          url="SpecialistDetails"
          urlParam={{
            specialist: order.specialist,
          }}
        />
        <Spacer position="bottom" size="medium" />
        <Separator />
      </View>
    );
  };

  const renderAddress = () => {
    return (
      <>
        <AddressContainer>
          <Ionicons name="location" size={20} color={"white"} />
          <Spacer position="left" size="small" />
          <Text variant="caption" style={{ fontSize: 14, color: "white" }}>
            {order.facility.address}
          </Text>
        </AddressContainer>
        <Separator />
      </>
    );
  };

  const renderTime = () => {
    return (
      <>
        <TimeContainer>
          <View>
            <Text variant="caption" style={{ fontSize: 14 }}>
              From
            </Text>
            <Spacer position="bottom" size="medium" />
            <TimeChip>
              <Ionicons name="time" size={20} color={theme.colors.ui.primary} />
              <Spacer position="left" size="medium" />
              <Text variant="caption" style={{ fontSize: 14 }}>
                07:00 AM
              </Text>
            </TimeChip>
          </View>
          <View>
            <Text
              variant="caption"
              style={{ textAlign: "right", fontSize: 14 }}
            >
              Until
            </Text>
            <Spacer position="bottom" size="medium" />
            <TimeChip>
              <Ionicons name="time" size={20} color={theme.colors.ui.primary} />
              <Spacer position="left" size="medium" />
              <Text variant="caption" style={{ fontSize: 14 }}>
                09:00 AM
              </Text>
            </TimeChip>
          </View>
        </TimeContainer>
        <Separator />
      </>
    );
  };

  const renderServices = () => {
    return (
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant="caption" style={{ fontSize: 16 }}>
            Requested services
          </Text>
        </View>
        <Spacer position="bottom" size="medium" />
        {order.services.map((service) => (
          <Spacer key={service.id} position="bottom" size="small">
            <ServiceCard
              service={service}
              info={true}
              press={() => handleShowViewMore(service)}
            />
          </Spacer>
        ))}
      </ScrollView>
    );
  };

  return (
    <OrderCardContainer showsVerticalScrollIndicator={false}>
      {renderOrderStatus("completed")}
      {renderQRCode()}
      {renderFacility()}
      {renderAddress()}
      {renderTime()}
      <Spacer position="top" size="medium" />
      {renderSpecialist()}
      <Spacer position="top" size="large" />
      {renderServices()}
    </OrderCardContainer>
  );
};

const CoverImage = styled.Image`
  height: 80px;
  aspect-ratio: 1;
  border-radius: 15px;
  overflow: hidden;
`;

const SmallOrderCardContainer = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.space[2]};
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  overflow: hidden;
`;

const ServiceChip = styled.View`
  padding: ${({ theme }) => theme.space[2]};
  border-radius: 30px;
  background-color: ${({ theme }) => rgba(theme.colors.brand.primary, 0.08)};
  border: 1px solid ${({ theme }) => theme.colors.brand.primary};
  margin-right: 8px;
`;

const SpecialistAvatar = styled.Image`
  height: 40px;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 50px;
`;

const SmallOrderTimeContainer = styled.View`
  border-radius: 10px;
  background-color: ${({ theme }) => rgba(theme.colors.ui.primary, 0.08)};
  padding: ${({ theme }) => theme.space[2]};
  align-items: center;
`;

export const SmallOrderCard = ({ order }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const renderFacility = () => {
    return (
      <>
        <Row style={{ height: 80, justifyContent: "space-between" }}>
          <CoverImage source={{ uri: order.facility.coverImage }} />
          <Spacer position="left" size="medium" />
          <View style={{ flex: 1 }}>
            <Text variant="caption" style={{ fontSize: 14 }}>
              {order.facility.name}
            </Text>
            <Spacer position="bottom" size="medium" />
            <Row>
              <Ionicons
                name="location"
                size={16}
                color={theme.colors.ui.primary}
              />
              <Spacer position="left" size="small" />
              <Text variant="caption">{order.facility.address}</Text>
            </Row>
          </View>
        </Row>
        <Spacer position="bottom" size="medium" />
        <Separator />
      </>
    );
  };

  const renderServices = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {order.services.map((item) => (
          <View key={item.id}>
            <ServiceChip>
              <Text variant="caption">{item.name}</Text>
            </ServiceChip>
            <Spacer position="left" size="small" />
          </View>
        ))}
      </ScrollView>
    );
  };

  const renderSpecialist = () => {
    return (
      <Row>
        <SpecialistAvatar source={{ uri: order.specialist.coverImage }} />
        <Spacer position="left" size="medium" />
        <View style={{ flex: 1 }}>
          <Text variant="caption" style={{ fontSize: 14 }}>
            {order.specialist.name}
          </Text>
        </View>
        <SmallOrderTimeContainer>
          <Text variant="caption" style={{ fontSize: 14 }}>
            07:00 AM
          </Text>
          <AntDesign name="arrowdown" size={14} color="black" />
          <Text variant="caption" style={{ fontSize: 14 }}>
            09:00 AM
          </Text>
        </SmallOrderTimeContainer>
      </Row>
    );
  };

  return (
    <SmallOrderCardContainer
      onPress={() => navigation.navigate("OrderSummary", { order: order })}
    >
      {renderOrderStatus("pending", false)}
      {renderFacility()}
      <Spacer position="bottom" size="medium" />
      {renderServices()}
      <Spacer position="bottom" size="small" />
      <Spacer position="bottom" size="medium" />
      {renderSpecialist()}
      <Spacer position="bottom" size="large" />
    </SmallOrderCardContainer>
  );
};

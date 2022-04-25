import { connect } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { SafeArea } from "../../components/utils/safearea.component";
import { rgba } from "polished";
import {
  HeaderContainer,
  PaddedContainer,
  PageTitle,
  SectionTitle,
} from "../components/details-screen.component";
import { Spacer } from "../../components/spacer/spacer.component";
import {
  LineView,
  SpecialTitleContainer,
  Text,
} from "../../components/typography/typography.component";
import React, { useState } from "react";
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Dimensions, View } from "react-native";
import {
  ActionButton,
  ButtonContainer,
} from "../../components/button/process-action-button.component";

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding-top: 32px;
`;

const PlanCard = styled.TouchableOpacity.attrs((props) => ({
  shadowColor: props.theme.colors.ui.border,
  shadowOffset: {
    width: 10,
    height: 10,
  },
  shadowOpacity: 1,
  shadowRadius: 5,
  elevation: 6,
}))`
  border-radius: 30px;
  padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[3]};
  border: 2px solid
    ${({ color, active, theme }) => (active ? color : theme.colors.brand.muted)};
  position: relative;
  flex-direction: row;
  align-items: center;
  background-color: white;
`;

const PlanIconContainer = styled.View`
  padding: ${({ theme }) => theme.space[3]};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 70px;
  border-top-right-radius: 40px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 90px;
  background-color: ${({ color, active, theme }) =>
    active ? rgba(color, 0.15) : theme.colors.brand.muted};
`;

const PlanImageContainer = styled.View`
  align-items: flex-start;
  justify-content: center;
  width: 110px;
`;

const PlanImageContainerBackground = styled.View`
  position: absolute;
  height: 60px;
  width: 60px;
  top: -5px;
  left: 2px;
`;

const PlanCardInfo = styled.View`
  flex: 1;
  justify-content: center;
  padding: ${({ theme }) => theme.space[2]} 2px;
`;

const PricingContainer = styled.View`
  border-radius: 15px;
  padding: ${({ theme }) => theme.space[2]};
  background-color: ${({ color }) => color};
  align-items: center;
`;

const PricingContainerRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PlanFeature = styled.View`
  flex-direction: row;
  align-items: center;
`;

const { width } = Dimensions.get("window");
const CurrentPlanIndicator = styled.View`
  background-color: ${({ color }) => color};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 100px;
  position: absolute;
  top: -16px;
  left: ${(width - 32) / 2 - 50}px;
  border-radius: 30px;
`;

const PLAN_ICONS = {
  premium: (color) => <AntDesign name="star" size={24} color={color} />,
  normal: (color) => <Ionicons name="person" size={24} color={color} />,
  free: (color) => <FontAwesome5 name="wpexplorer" size={24} color={color} />,
};

const SubscriptionPlanFacilityScreen = () => {
  const theme = useTheme();
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [currentPlan, setCurrentPlan] = useState(1);

  const renderListTitle = () => {
    return (
      <SpecialTitleContainer>
        <LineView />
        <Spacer position="left" size="small" />
        <SectionTitle style={{ letterSpacing: 1 }}>Plans</SectionTitle>
        <Spacer position="left" size="small" />
        <LineView />
      </SpecialTitleContainer>
    );
  };
  const renderPlanIcon = (icon, color) => {
    return (
      <PlanIconContainer color={color}>
        {PLAN_ICONS[icon](color)}
      </PlanIconContainer>
    );
  };

  const renderFeature = (description, color) => {
    return (
      <PlanFeature>
        <AntDesign name="checkcircleo" size={20} color={color} />
        <Spacer position="left" size="small" />
        <View style={{ flex: 1 }}>
          <Text style={{ width: "100%", fontSize: 13, lineHeight: 20 }}>
            {description}
          </Text>
        </View>
      </PlanFeature>
    );
  };
  const renderPlanCard = (color, id, icon, price, frequency, features) => {
    return (
      <PlanCard
        color={color}
        active={id === selectedPlan}
        onPress={() => setSelectedPlan(id)}
      >
        {id === currentPlan && (
          <CurrentPlanIndicator color={color}>
            <Text variant="caption" style={{ color: "white" }}>
              Current plan
            </Text>
          </CurrentPlanIndicator>
        )}
        <PlanImageContainer color={color} active={id === selectedPlan}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {renderPlanIcon(icon, color)}
            <Text
              variant="caption"
              style={{
                textTransform: "uppercase",
                letterSpacing: 1,
                fontSize: 14,
                color: color,
                marginLeft: -8,
              }}
            >
              {icon}
            </Text>
          </View>

          <PricingContainer color={color}>
            <PricingContainerRow>
              {/*<MaterialIcons name="attach-money" size={20} color={color} />*/}
              <Text variant="caption" style={{ fontSize: 18, color: "white" }}>
                {price}
              </Text>
              <MaterialCommunityIcons
                name="slash-forward"
                size={20}
                color="white"
              />

              <Text variant="caption" style={{ color: "white" }}>
                {frequency}
              </Text>
            </PricingContainerRow>
            {price > 0 && (
              <PricingContainerRow>
                {/*<MaterialIcons name="attach-money" size={20} color={color} />*/}
                <Text
                  variant="caption"
                  style={{ fontSize: 13, color: "white" }}
                >
                  {price}
                </Text>
                <MaterialCommunityIcons
                  name="slash-forward"
                  size={20}
                  color="white"
                />

                <Text variant="caption" style={{ color: "white" }}>
                  {frequency}
                </Text>
              </PricingContainerRow>
            )}
          </PricingContainer>
        </PlanImageContainer>
        <Spacer position="left" size="large" />
        <PlanCardInfo>
          {features.map((feature, index) => (
            <View key={`${index}-feature`} style={{ width: "100%" }}>
              {renderFeature(feature, color)}
              <Spacer position="bottom" size="medium" />
            </View>
          ))}
        </PlanCardInfo>
      </PlanCard>
    );
  };
  const renderHeader = () => {
    return (
      <HeaderContainer>
        <Spacer position="top" size="large" />
        <Spacer position="top" size="large" />
        <PageTitle>Subscription</PageTitle>
        <Spacer position="bottom" size="medium" />
        <Text variant="caption" style={{ fontSize: 16 }}>
          Your plan expires in{" "}
          <Text
            variant="caption"
            style={{ fontSize: 16, color: theme.colors.brand.primary }}
          >
            14 days
          </Text>
        </Text>
      </HeaderContainer>
    );
  };

  return (
    <SafeArea>
      {renderHeader()}

      <Container>
        <PaddedContainer>
          {renderListTitle()}
          <Spacer position="bottom" size="large" />
          <Spacer position="bottom" size="large" />
          {renderPlanCard(
            theme.colors.brand.primary,
            1,
            "premium",
            14.99,
            "month",
            [
              "lorem ipsum dolor sit amet",
              "lorem ipsum dolor sit amet",
              "lorem ipsum dolor sit amet consectur",
              "lorem ipsum dolor sit amet consectur",
            ]
          )}
          <Spacer position="bottom" size="large" />
          {renderPlanCard(
            theme.colors.brand.secondary,
            2,
            "normal",
            9.99,
            "month",
            [
              "lorem ipsum dolor sit amet consectur",
              "lorem ipsum dolor sit amet consectur",
              "lorem ipsum dolor sit amet consectur",
            ]
          )}
          <Spacer position="bottom" size="large" />

          {renderPlanCard(
            theme.colors.brand.quaternary,
            3,
            "free",
            0.0,
            "month",
            [
              "lorem ipsum dolor sit amet consectur",
              "lorem ipsum dolor sit amet consectur",
            ]
          )}
        </PaddedContainer>
      </Container>
      <ButtonContainer
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
        }}
      >
        <ActionButton height={50} onPress={() => null}>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Activate plan
          </Text>
        </ActionButton>
      </ButtonContainer>
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionPlanFacilityScreen);

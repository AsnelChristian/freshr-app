import { AppNavigator } from "./app-navigator";
import React, { useEffect, useRef } from "react";
import { Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "../../components/typography/typography.component";
import styled from "styled-components/native";
import { connect } from "react-redux";

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  bottom: 0px;
  left: 0;
  position: absolute;
  z-index: 1;
  padding: ${({ theme }) => theme.space[3]};
`;

const ActionButton = styled.TouchableOpacity`
  position: relative;
  flex-direction: row;
  width: 100%;
  height: ${({ height }) => `${height}px`};
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.brand.primary};
  border-radius: ${({ theme }) => theme.sizes[1]};
`;

const PositioningContainer = styled.View`
  height: 55px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: ${({ theme }) => theme.space[3]};
`;

const CartItemCountContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: ${({ theme }) => theme.sizes[4]};
  background-color: ${({ theme }) => theme.colors.ui.primary};
`;

const Navigation = ({ cart, showCart, showNext }) => {
  const navigationRef = useRef();

  useEffect(() => {
    Platform.OS === "android" && StatusBar.setTranslucent(true);
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("white");
    return () => {
      StatusBar.setBarStyle("default");
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <AppNavigator />
      {showCart && cart.length > 0 && (
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
          <ActionButton
            height={55}
            onPress={() => navigationRef.current?.navigate("SelectFacility")}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Proceed to booking
            </Text>
            <PositioningContainer>
              <CartItemCountContainer>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {cart.length}
                </Text>
              </CartItemCountContainer>
            </PositioningContainer>
          </ActionButton>
        </ButtonContainer>
      )}
      {showNext && (
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
          <ActionButton
            height={50}
            onPress={() => navigationRef.current?.navigate("SelectFacility")}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
                textTransform: "uppercase",
              }}
            >
              Proceed
            </Text>
          </ActionButton>
        </ButtonContainer>
      )}
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  cart: state.booking.services,
  showCart: state.booking.showCart,
  showNext: state.booking.showNext,
});

export default connect(mapStateToProps, null)(Navigation);

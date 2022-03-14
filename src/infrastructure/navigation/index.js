import { AppNavigator } from "./app-navigator";
import React, { useEffect, useRef } from "react";
import { Platform, StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "../../components/typography/typography.component";
import styled from "styled-components/native";
import { connect } from "react-redux";

const CartButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  bottom: 0px;
  left: 0;
  position: absolute;
  z-index: 99999;
  padding: ${({ theme }) => theme.space[3]};
`;

const CartButton = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.brand.primary};
  border-radius: ${({ theme }) => theme.sizes[1]};
  padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[2]};
`;

const Navigation = ({ cart, showCart }) => {
  const navigationRef = useRef(null);

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
        <CartButtonContainer
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
          <CartButton>
            <Text style={{ color: "white" }}>Proceed to booking</Text>
          </CartButton>
        </CartButtonContainer>
      )}
      {/*<View*/}
      {/*  style={{*/}
      {/*    position: "absolute",*/}
      {/*    bottom: 0,*/}
      {/*    left: 0,*/}
      {/*    zIndex: 9999,*/}
      {/*    height: 100,*/}
      {/*    width: 1000,*/}
      {/*    backgroundColor: "black",*/}
      {/*  }}*/}
      {/*/>*/}
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  cart: state.booking.services,
  showCart: state.booking.showCart,
});

export default connect(mapStateToProps, null)(Navigation);

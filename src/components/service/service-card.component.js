import { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components/native";
import { rgba } from "polished";
import { Checkbox } from "react-native-paper";

import { Text } from "../typography/typography.component";
import { Spacer } from "../spacer/spacer.component";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import {
  addServiceToCart,
  removeServiceFromCart,
} from "../../redux/booking/booking.actions";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
`;
const ServiceCardContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ active, theme }) =>
    active
      ? `${rgba(theme.colors.brand.primary, 0.15)}`
      : theme.colors.ui.quaternary};
  padding: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.sizes[1]};
  height: 100px;
`;

const ServiceCardContentContainer = styled.View`
  flex: 1;
  position: relative;
`;

const ServiceRight = styled.View`
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ServiceImage = styled.Image.attrs((props) => ({
  resizeMode: "cover",
}))`
  border-radius: ${({ theme }) => theme.sizes[1]};
  height: 85%;
  aspect-ratio: 1;
`;

const Title = styled(Text)`
  font-weight: bold;
`;

const TileContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Tile = styled.View`
  padding: ${({ theme }) => theme.space[1]};
  justify-content: center;
  align-items: center;
  position: relative;

  background-color: ${({ active, theme }) =>
    active ? theme.colors.ui.primary : "white"};
  border-radius: ${({ theme }) => theme.sizes[1]};
`;

const PriceTag = styled.View`
  background-color: white;
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.sizes[1]};
`;

const TileIndicator = styled.View`
  background-color: ${({ active, theme }) =>
    active ? theme.colors.ui.primary : "white"};
  height: 6px;
  width: 6px;
  border-radius: 100px;
  position: absolute;
  top: -3px;
  right: -3px;
`;

const MoneyText = styled(Text)`
  font-size: 18px;
  font-weight: bold;
`;

const FloatingMoreButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: white;
  height: 40px;
  width: 40px;
  position: absolute;
  top: -15px;
  right: 0;
  border-radius: 100px;
  elevation: 1;
  z-index: 1;
`;

const ServiceCard = ({
  service = {},
  onMorePress,
  info = false,
  cart,
  addCartItem,
  removeCartItem,
  press = null,
}) => {
  const theme = useTheme();
  const [checked, setChecked] = useState(false);

  const handlePress = () => {
    setChecked((oldValue) => {
      if (!info) {
        if (oldValue) {
          removeCartItem(service);
        } else {
          addCartItem(service);
        }
      }
      return !checked;
    });
  };

  useEffect(() => {
    setChecked(cart.filter((item) => item.id === service.id).length > 0);
  }, [cart]);

  const {
    name = "Dreadlocks",
    price = 30,
    gender = "male",
    coverImage = "https://i.pinimg.com/originals/83/1b/5d/831b5dfdc5a785b1603054452698d5a8.jpg",
  } = service;

  return (
    <Container>
      {!info && (
        <FloatingMoreButton onPress={onMorePress}>
          <MaterialIcons name="more-horiz" size={20} />
        </FloatingMoreButton>
      )}
      <ServiceCardContainer
        onPress={press ? press : handlePress}
        active={!info && checked}
      >
        <ServiceImage source={{ uri: coverImage }} />
        <Spacer position="left" size="medium" />
        <ServiceCardContentContainer>
          <Title numberOfLines={1}>{name}</Title>
          <Spacer position="bottom" size="medium" />
          <TileContainer>
            <Tile active={gender === "male" || gender === "both"}>
              <Ionicons
                name="man"
                size={16}
                color={
                  gender === "male" || gender === "both" ? "white" : "gray"
                }
              />
              <TileIndicator active={gender === "male" || gender === "both"} />
            </Tile>
            <Spacer position="left" size="medium" />

            <Tile active={gender === "female" || gender === "both"}>
              <Ionicons
                name="woman"
                size={16}
                color={
                  gender === "female" || gender === "both" ? "white" : "gray"
                }
              />
              <TileIndicator
                active={gender === "female" || gender === "both"}
              />
            </Tile>
          </TileContainer>
        </ServiceCardContentContainer>
        <ServiceRight>
          <PriceTag>
            <MaterialIcons
              name="attach-money"
              size={20}
              color={theme.colors.ui.primary}
            />
            <Spacer position="left" size="small" />
            <MoneyText>{price}</MoneyText>
            <Spacer position="left" size="small" />
          </PriceTag>
          {!info && (
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              color={theme.colors.brand.primary}
            />
          )}
        </ServiceRight>
      </ServiceCardContainer>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  cart: state.booking.services,
});

const mapDispatchToProps = (dispatch) => ({
  addCartItem: (service) => dispatch(addServiceToCart(service)),
  removeCartItem: (service) => dispatch(removeServiceFromCart(service)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ServiceCard);

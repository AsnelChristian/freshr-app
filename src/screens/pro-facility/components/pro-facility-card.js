import { connect } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { useWindowDimensions, View } from "react-native";

import { Text } from "../../../components/typography/typography.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { rgba } from "polished";
import { Row } from "../../../components/helpers/helpers.component";
import { useNavigation } from "@react-navigation/native";

const CardContainer = styled.TouchableOpacity.attrs((props) => ({
  shadowColor: props.theme.colors.ui.border,
  shadowOffset: {
    width: 10,
    height: 10,
  },
  shadowOpacity: 1,
  shadowRadius: 5,
  elevation: 6,
}))`
  margin-top: 2px;
  border-radius: 15px;
  background-color: ${({ theme }) => rgba(theme.colors.brand.primary, 0.05)};
  flex-direction: row;
  padding: 0px ${({ theme }) => theme.space[3]};
  height: ${({ isBookingCard }) => (isBookingCard ? 90 : 130)}px;
  width: ${({ width }) => width}px;
  align-items: center;
  overflow: hidden;
`;

const CoverImage = styled.Image`
  height: ${({ height }) => (height !== null ? `${height}px` : "100px")};
  aspect-ratio: 1;
  border-radius: 20px;
  overflow: hidden;
`;

const InfoContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(Text)`
  font-size: 16px;
  font-weight: bold;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  padding: ${({ theme }) => theme.space[2]} 10px;
  background-color: ${({ theme }) => rgba(theme.colors.brand.primary, 0.1)};
  border-radius: 30px;
`;

const StatusContainer = styled.View`
  background-color: ${({ theme, active }) =>
    active ? theme.colors.brand.primary : theme.colors.ui.primary};
  padding: ${({ theme }) => theme.space[2]};
  border-radius: 15px;
  position: absolute;
  top: 0;
  right: 0;
`;

export const SeatsOccupancy = ({ bookedSeats, seatCapacity }) => {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text
        variant="caption"
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: theme.colors.brand.primary,
        }}
      >
        {bookedSeats}
      </Text>
      <Spacer position="left" size="small" />
      <MaterialCommunityIcons
        name="slash-forward"
        size={16}
        color={theme.colors.ui.primary}
      />
      <Spacer position="left" size="small" />
      <Text variant="caption">{seatCapacity}</Text>
      <Spacer position="left" size="medium" />
      <Spacer position="left" size="small" />
      <FontAwesome5 name="chair" size={20} color={theme.colors.ui.primary} />
    </View>
  );
};

const ProFacilityCard = ({ isBookingCard = false, navigation }) => {
  const { width } = useWindowDimensions();
  // const navigation = useNavigation();
  const theme = useTheme();

  const coverImage =
    "https://md-friseure.de/wp-content/uploads/2021/03/MD-Friseure-1920x1080-20.jpg";
  const rating = 4.3;
  const name = "The best barbershop";
  const seatCapacity = 3;
  const bookedSeats = 2;
  const isOpened = true;
  return (
    <CardContainer
      width={width - 32}
      onPress={() => navigation.navigate("ProFacilityDetails")}
      isBookingCard={isBookingCard}
    >
      <StatusContainer active={isOpened}>
        <Text
          variant="caption"
          style={{
            textTransform: "uppercase",
            color: "white",
            letterSpacing: 1,
          }}
        >
          {isOpened ? "opened" : "closed"}
        </Text>
      </StatusContainer>
      <CoverImage
        source={{ uri: coverImage }}
        height={isBookingCard ? 70 : 100}
      />
      <Spacer position="left" size="medium" />
      <InfoContainer>
        <View style={{ flex: 1 }}>
          <Title
            variant="caption"
            numberOfLines={1}
            ellipsis="tail"
            style={{ width: "100%" }}
          >
            {name}
          </Title>
          <Spacer position="bottom" size="large" />
          <Row style={{ justifyContent: "space-between" }}>
            <RatingContainer>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: theme.colors.brand.primary,
                }}
              >
                {rating}
              </Text>
              <Spacer position="left" size="small" />
              <AntDesign
                name="star"
                size={16}
                color={theme.colors.brand.primary}
              />
            </RatingContainer>
            <SeatsOccupancy
              bookedSeats={bookedSeats}
              seatCapacity={seatCapacity}
            />
          </Row>
        </View>
      </InfoContainer>
    </CardContainer>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProFacilityCard);

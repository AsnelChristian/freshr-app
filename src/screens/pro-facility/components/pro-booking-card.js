import styled, { useTheme } from "styled-components/native";
import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "../../../components/typography/typography.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { List } from "react-native-paper";
import { Row } from "../../../components/helpers/helpers.component";
import { renderTime } from "./time-view.helper";
import ProFacilityCard from "./pro-facility-card";

const BookingCardContainer = styled.View.attrs((props) => ({
  shadowColor: props.theme.colors.ui.border,
  shadowOffset: {
    width: 10,
    height: 10,
  },
  shadowOpacity: 1,
  shadowRadius: 5,
  elevation: 6,
}))`
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  border-radius: 30px;
  overflow: hidden;
`;

const BookingStatusRow = styled.View`
  padding: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BookingStatusContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.ui.primary};
  border-radius: 15px;
  height: 40px;
  flex-direction: row;
  align-items: center;
  padding: 0px 16px;
  justify-content: center;
`;

const ProfessionalRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfessionalImage = styled.Image`
  height: 60px;
  aspect-ratio: 1;
  border-radius: 15px;
  overflow: hidden;
`;

export const BookingCard = (props) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const proImageMock =
    "https://media.gq-magazine.co.uk/photos/5efcae3187e549a3c5063a64/master/w_1920,h_1280,c_limit/20200701-barbers-02.jpg";
  const proName = "John Doe";
  const startTime = new Date();
  const endTime = new Date();

  const handlePress = () => setExpanded(!expanded);

  return (
    <BookingCardContainer>
      <BookingStatusRow>
        <View>
          <Text variant="caption">Booked by</Text>
          <Spacer position="bottom" size="medium" />
          <ProfessionalRow>
            <ProfessionalImage source={{ uri: proImageMock }} />
            <Spacer position="left" size="medium" />
            <View>
              <Text variant="caption" style={{ fontSize: 14 }}>
                {proName}
              </Text>
            </View>
          </ProfessionalRow>
        </View>
        <Spacer position="left" size="large" />
        <BookingStatusContainer>
          <Text variant="caption" style={{ color: "white", fontSize: 16 }}>
            Completed
          </Text>
        </BookingStatusContainer>
      </BookingStatusRow>
      <Spacer position="bottom" size="medium" />
      <View style={{ backgroundColor: "white" }}>
        <List.Section style={{ color: "white" }} color="black">
          <List.Accordion
            title="More info"
            expanded={expanded}
            onPress={handlePress}
            style={{
              backgroundColor: "white",
            }}
            theme={{
              colors: {
                primary: theme.colors.brand.primary,
                text: theme.colors.ui.primary,
              },
            }}
          >
            <Row>
              <Spacer position="left" size="medium" />
              {renderTime(startTime, "From", 16, true)}
              <Spacer position="left" size="large" />
              {renderTime(endTime, "Until", 16, true)}
            </Row>
            <Spacer position="bottom" size="medium" />
            <ProFacilityCard
              facility={props.facility}
              isBookingCard={true}
              navigation={props.navigation}
            />
          </List.Accordion>
        </List.Section>
      </View>
    </BookingCardContainer>
  );
};

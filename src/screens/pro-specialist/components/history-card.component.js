import styled, { useTheme } from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/typography.component";
import { BlurView } from "expo-blur";

const CustomerProfile = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 55px;
  overflow: hidden;
`;

const HistoryCardInfoContainer = styled.View`
  flex: 1;
`;

const GlassBackground = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const HistoryCardContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
`;

export const HistoryCard = () => {
  const theme = useTheme();
  const customerProfilePicture =
    "https://media.istockphoto.com/photos/barber-shop-owner-wearing-protective-face-mask-and-cutting-customers-picture-id1297946321?b=1&k=20&m=1297946321&s=170667a&w=0&h=fyWRxzdghvvsuRnpE0C1gbwby5A1JQukbRFZxLz9XiM=";
  const name = "John doe";

  return (
    <HistoryCardContainer>
      <GlassBackground intensity={10} />
      <CustomerProfile source={{ uri: customerProfilePicture }} />
      <Spacer position="left" size="medium" />
      <HistoryCardInfoContainer>
        <Text variant="caption" style={{ fontSize: 14 }}>
          {name}
        </Text>
        <Spacer position="bottom" size="medium" />
        <Text>4 services</Text>
      </HistoryCardInfoContainer>
      <Text
        variant="caption"
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: theme.colors.brand.quaternary,
        }}
      >
        $ 75
      </Text>
    </HistoryCardContainer>
  );
};

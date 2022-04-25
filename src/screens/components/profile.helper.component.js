import styled, { useTheme } from "styled-components/native";
import { View } from "react-native";
import { Separator } from "../../components/helpers/helpers.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/typography.component";
import { Entypo } from "@expo/vector-icons";

export const Avatar = styled.Image`
  height: 70px;
  width: 70px;
  aspect-ratio: 1;
  border-radius: 100px;
  overflow: hidden;
`;

const ProfileButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.space[3]} 0px;
`;

export const LogoutButton = styled.TouchableOpacity`
  flex-direction: row;
  padding: ${({ theme }) => theme.space[3]};
  align-items: center;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
`;

export const ProfileButton = ({ icon, label, description = "", onPress }) => {
  const theme = useTheme();
  return (
    <View>
      <Separator />
      <ProfileButtonContainer onPress={onPress}>
        {icon}
        <Spacer position="left" size="medium" />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, color: theme.colors.ui.primary }}>
            {label}
          </Text>
          {description !== "" && (
            <View>
              <Spacer position="bottom" size="small" />
              <Text style={{ fontSize: 14, color: theme.colors.ui.primary }}>
                {description}
              </Text>
            </View>
          )}
        </View>
        <Entypo
          name="chevron-right"
          size={24}
          color={theme.colors.ui.primary}
        />
      </ProfileButtonContainer>
    </View>
  );
};

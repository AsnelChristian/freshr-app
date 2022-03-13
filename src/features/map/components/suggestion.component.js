import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/typography.component";

const SuggestionContainer = styled.TouchableOpacity`
  background-color: ${({ theme, active }) =>
    active ? theme.colors.ui.quaternary : "white"};
  flex-direction: row;
  align-items: center;
`;

const SuggestionIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space[2]};
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  margin-right: ${({ theme }) => theme.space[1]};
`;

const Separator = styled.View`
  height: 1px;
  width: 1px;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
`;

export const Suggestion = ({ value, children, size }) => {
  return (
    <>
      <Separator />
      <SuggestionContainer>
        <SuggestionIconContainer>{children}</SuggestionIconContainer>
        <Spacer position="left" size="small" />
        <Text
          numberOfLines={1}
          ellipsis="tail"
          style={{ fontSize: size ? size : 12 }}
        >
          {value}
        </Text>
      </SuggestionContainer>
    </>
  );
};

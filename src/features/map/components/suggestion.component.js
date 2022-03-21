import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/typography.component";

const NotPressableSuggestionContainer = styled.View`
  background-color: ${({ theme, active }) =>
    active ? theme.colors.ui.quaternary : "white"};
  flex-direction: row;
  align-items: center;
`;

const SuggestionContainer = styled.TouchableOpacity`
  background-color: ${({ theme, active }) =>
    active ? theme.colors.ui.quaternary : "white"};
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const SuggestionIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${({ padded, theme }) =>  padded ? theme.space[2] : "0px"};
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  margin-right: ${({ theme }) => theme.space[1]};
`;

const Separator = styled.View`
  height: 1px;
  width: 1px;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
`;

export const Suggestion = ({
  value,
  children,
  size,
  pressable = true,
  width = null,
    padded=true
}) => {
    const style = {fontSize: size ? size : 14}
    if ( width ) {
        style["width"] = width
    } else {
        style["flex"] = 1
    }
  const content = (
    <>
      <SuggestionIconContainer padded={padded}>{children}</SuggestionIconContainer>
      <Spacer position="left" size="small" />
      <Text
        variant="caption"
        numberOfLines={1}
        ellipsis="tail"
        style={style}
      >
        {value}
      </Text>
    </>
  );
  return (
    <>
      <Separator />
      {pressable ? (
        <SuggestionContainer>{content}</SuggestionContainer>
      ) : (
        <NotPressableSuggestionContainer>
          {content}
        </NotPressableSuggestionContainer>
      )}
    </>
  );
};

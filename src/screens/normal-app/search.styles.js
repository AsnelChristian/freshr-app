import styled from "styled-components/native";

export const ServiceButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 5px;
`;
export const ServiceImage = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 10px;
  overflow: hidden;
`;

import styled from "styled-components/native";
import { Text } from "../../components/typography/typography.component";

export const PageContainer = styled.ScrollView`
  flex: 1;
  background-color: white;
`;
export const PageContentContainer = styled.View`
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  ${({ showActionButton }) => (showActionButton ? "margin-bottom: 60px" : "")};
`;

export const SliderContainer = styled.View`
  background-color: white;
`;

export const ReviewButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  border-radius: ${({ theme }) => theme.sizes[2]};
  border: 3px solid ${({ theme }) => theme.colors.ui.primary};
  background-color: white;
`;

export const ReviewButtonText = styled(Text).attrs((props) => ({
  variant: "caption",
  numberOfLines: 1,
  ellipsis: "tail",
}))`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.ui.primary};
`;
export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled(Text).attrs((props) => ({
  numberOfLines: 2,
  ellipsis: "tail",
}))`
  font-size: ${({ theme }) => theme.fontSizes.h4};
  font-weight: bold;
  letter-spacing: 1px;
  max-width: 80%;
`;

export const SectionTitle = styled(Text).attrs((props) => ({
  numberOfLines: 1,
  ellipsis: "tail",
}))`
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-weight: bold;
  letter-spacing: 1px;
`;

export const FavButton = styled.TouchableOpacity``;

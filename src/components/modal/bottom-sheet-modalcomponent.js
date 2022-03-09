import React from "react";
import {
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

import { Text } from "../typography/typography.component";
import { Spacer } from "../spacer/spacer.component";

const ModalBackground = styled.View`
  border-radius: ${({ theme }) => theme.sizes[2]};
  background-color: white;
`;
const BackdropContentContainer = styled.View`
  flex: 1;
`;

export const BottomModal = React.forwardRef(({ children }, ref) => {
  const initialSnapPoints = useMemo(() => ["5%", "CONTENT_HEIGHT"], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      backgroundComponent={ModalBackground}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      enablePanDownToClose={true}
    >
      <BackdropContentContainer onLayout={handleContentLayout}>
        {children}
      </BackdropContentContainer>
    </BottomSheetModal>
  );
});

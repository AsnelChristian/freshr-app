import React, { useCallback } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";

const ModalBackground = styled.View`
  border-radius: ${({ theme }) => theme.sizes[2]};
  background-color: white;
`;

const BackdropContentContainer = styled.View`
  flex: 1;
`;

export const CloseButton = styled.TouchableOpacity`
  margin-left: ${({ theme }) => theme.space[3]};
  padding: 0px ${({ theme }) => theme.space[1]};
`;

export const BottomModal = React.forwardRef(({ children, onClose }, ref) => {
  const initialSnapPoints = useMemo(() => ["5%", "CONTENT_HEIGHT"], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        animatedIndex={animatedContentHeight}
        pressBehavior="close"
      />
    ),
    [animatedContentHeight]
  );
  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      onClose={onClose}
      backdropComponent={renderBackdrop}
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

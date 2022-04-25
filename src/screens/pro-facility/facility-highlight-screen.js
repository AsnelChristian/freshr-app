import { connect } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { SafeArea } from "../../components/utils/safearea.component";
import { renderFooter } from "./utils";
import { Spacer } from "../../components/spacer/spacer.component";
import {
  PaddedContainer,
  SectionTitle,
} from "../components/details-screen.component";
import { Text } from "../../components/typography/typography.component";
import React, { useState } from "react";
import { FlatGrid } from "react-native-super-grid";
import { MaterialIcons } from "@expo/vector-icons";
import { Row } from "../../components/helpers/helpers.component";
import { View } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;
const Content = styled.View`
  flex: 1;
  background-color: white;
`;

const FacilityHighlightCard = styled.TouchableOpacity`
  background-color: white;
  border-radius: 10px;
  height: 100px;
  padding: ${({ theme }) => theme.space[3]};
  border: 2px solid
    ${({ theme, active }) =>
      active ? theme.colors.ui.primary : theme.colors.ui.border};
  align-items: center;
`;

const CountContainer = styled.View`
  height: 44px;
  width: 44px;
  background-color: ${({ theme }) => theme.colors.ui.primary};
  align-items: center;
  justify-content: center;
  border-radius: 100px;
`;

const HIGHLIGHT_ICONS = {
  stylish: <MaterialIcons name="style" size={25} color="black" />,
};

const FacilityHighlightScreen = (props) => {
  const theme = useTheme();
  const [highlights, setHighlights] = useState([
    {
      id: "highlight-1",
      name: "Cleanliness",
      icon: "cleanliness",
      selected: false,
    },
    {
      id: "highlight-2",
      name: "Great location",
      icon: "location",
      selected: false,
    },
    {
      id: "highlight-3",
      name: "Great ambiance",
      icon: "ambiance",
      selected: false,
    },
    {
      id: "highlight-4",
      name: "Some highlight",
      icon: "some",
      selected: false,
    },
  ]);
  const [selectedCnt, setSelectedCnt] = useState(0);

  const renderHighlightCnt = () => {
    return (
      <Row style={{ justifyContent: "space-between" }}>
        <Text style={{ fontWeight: "bold", color: theme.colors.ui.border }}>
          Select a maximum of 3
        </Text>
        {selectedCnt > 0 && (
          <CountContainer>
            <Text variant="caption" style={{ fontSize: 16, color: "white" }}>
              {selectedCnt}
            </Text>
          </CountContainer>
        )}
      </Row>
    );
  };

  const renderIcon = (iconName) => {
    return HIGHLIGHT_ICONS[iconName];
  };

  const renderHighlight = (highlight, index) => {
    return (
      <FacilityHighlightCard
        active={highlight.selected}
        key={`${index}-highlight-${highlight.id}`}
        onPress={() => {
          setHighlights((old) => {
            const newHighlights = [...old];
            const pos = newHighlights.map((e) => e.id).indexOf(highlight.id);
            newHighlights[pos] = {
              ...highlight,
              selected: !highlight.selected,
            };
            return newHighlights;
          });
          setSelectedCnt((old) => (old += !highlight.selected ? 1 : -1));
        }}
      >
        {/*{renderIcon(highlight.icon)}*/}
        {renderIcon("stylish")}
        <Spacer position="bottom" size="medium" />
        <Text
          variant="caption"
          style={{ fontSize: 18 }}
          numberOfLines={1}
          ellipsis="tail"
        >
          {highlight.name}
        </Text>
      </FacilityHighlightCard>
    );
  };

  const renderHighlights = () => {
    return (
      <FlatGrid
        itemDimension={130}
        data={highlights}
        spacing={4}
        renderItem={({ item, index }) => renderHighlight(item, index)}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeArea>
      <Container style={{ backgroundColor: theme.colors.brand.primary }}>
        <View
          style={{ flex: 1, backgroundColor: theme.colors.brand.primary }}
        />
        <Content style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
          <Spacer position="bottom" size="medium" />
          <Spacer position="bottom" size="large" />
          <PaddedContainer style={{ flex: 1 }}>
            <SectionTitle>Features</SectionTitle>
            <Spacer position="bottom" size="medium" />
            <Text variant="caption" style={{ lineHeight: 22 }}>
              What are the features of your facility
            </Text>
            <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="large" />
            {renderHighlightCnt()}
            <Spacer position="bottom" size="large" />

            {renderHighlights()}
          </PaddedContainer>
        </Content>
        {renderFooter(props.navigation, "SetFacilityDescription")}
      </Container>
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacilityHighlightScreen);

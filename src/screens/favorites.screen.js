import { FlatList, useWindowDimensions, View } from "react-native";
import { useState } from "react";
import { SceneMap, TabView } from "react-native-tab-view";
import { SafeArea } from "../components/utils/safearea.component";
import { Spacer } from "../components/spacer/spacer.component";
import { renderTabBar } from "./utils";
import { connect } from "react-redux";
import { Container } from "./inbox.screen";
import { TabViewContainer } from "../components/tabs/tabs.component";
import {
  HeaderContainer,
  PageTitle,
} from "./components/details-screen.component";
import { Text } from "../components/typography/typography.component";

const FavoritesScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "facilities", title: "Facilities" },
    { key: "professionals", title: "Professionals" },
  ]);

  const renderFacilities = () => {
    return (
      <View>
        <Spacer position="top" size="large" />
        <Text variant="caption">Favorites facilities</Text>
      </View>
    );
  };

  const renderProfessionals = () => {
    return (
      <View>
        <Spacer position="top" size="large" />
        <Text variant="caption">Favorites professionals</Text>
      </View>
    );
  };

  const renderScene = SceneMap({
    facilities: renderFacilities,
    professionals: renderProfessionals,
  });

  return (
    <SafeArea>
      <Container>
        <HeaderContainer>
          <Spacer position="top" size="large" />
          <PageTitle>Favorites</PageTitle>
          <Spacer position="top" size="large" />
        </HeaderContainer>
        <TabViewContainer>
          <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
        </TabViewContainer>
      </Container>
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);

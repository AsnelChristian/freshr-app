import { FlatList, useWindowDimensions, View } from "react-native";
import { useEffect, useState } from "react";
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
import { ordersMock } from "../mocks/orders.mock";
import { SmallOrderCard } from "./components/order-card.component";

const OrdersScreen = () => {
  const layout = useWindowDimensions();
  const [orders, setOrders] = useState([]);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "pending", title: "Pending" },
    { key: "ongoing", title: "Ongoing" },
    { key: "completed", title: "Completed" },
    { key: "cancelled", title: "Cancelled" },
  ]);

  useEffect(() => {
    setOrders(ordersMock);
  }, []);

  const renderPending = () => {
    return (
      <View>
        <Spacer position="top" size="large" />
        <Text variant="caption" style={{ fontSize: 14 }}>
          Pending orders
        </Text>
        <Spacer position="top" size="medium" />
        <FlatList
          data={orders}
          renderItem={({ item }) => <SmallOrderCard order={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  const renderOngoing = () => {
    return (
      <View>
        <Spacer position="top" size="large" />
        <Text variant="caption">Ongoing orders</Text>
      </View>
    );
  };

  const renderCompleted = () => {
    return (
      <View>
        <Spacer position="top" size="large" />
        <Text variant="caption">Completed orders</Text>
      </View>
    );
  };

  const renderCancelled = () => {
    return (
      <View>
        <Spacer position="top" size="large" />
        <Text variant="caption">Cancelled orders</Text>
      </View>
    );
  };

  const renderScene = SceneMap({
    pending: renderPending,
    ongoing: renderOngoing,
    completed: renderCompleted,
    cancelled: renderCancelled,
  });

  return (
    <SafeArea>
      <Container>
        <HeaderContainer>
          <Spacer position="top" size="large" />
          <PageTitle>Orders</PageTitle>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen);

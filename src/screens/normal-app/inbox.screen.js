import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { SceneMap, TabBar, TabBarItem, TabView } from "react-native-tab-view";
import { FlatList, useWindowDimensions, View } from "react-native";
import { rgba } from "polished";

import { Spacer } from "../../components/spacer/spacer.component";
import { SafeArea } from "../../components/utils/safearea.component";
import { Text } from "../../components/typography/typography.component";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { renderTabBar } from "./utils";
import { TabViewContainer } from "../../components/tabs/tabs.component";
import {
  HeaderContainer,
  PageTitle,
} from "../components/details-screen.component";

export const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const MessagesListContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  flex: 1;
`;

const NotificationsContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  padding: ${({ theme }) => theme.space[3]} 0px;

  flex: 1;
`;

const MessageCardContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[1]};
`;

const Separator = styled.View`
  height: 2px;
  background-color: ${({ theme }) => rgba(theme.colors.ui.primary, 0.05)};
`;

const MessageCardContent = styled.View`
  flex-direction: row;
  flex: 1;
`;

const MessageCardMessagePreview = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  padding-right: ${({ theme }) => theme.space[3]};
`;

const MessageCardStatusContainer = styled.View``;

const MessageCardStatusCnt = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.ui.primary};
`;

const NotificationCardContainer = styled.View.attrs((props) => ({
  style: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    width: 350,
  },
}))`
  padding: ${({ theme }) => theme.space[3]};
  border-radius: ${({ theme }) => theme.sizes[2]};
  background-color: white;
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

const NotificationCardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const NotificationCardStatus = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 100px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.brand.primary : "white"};
  position: absolute;
  top: ${({ theme }) => theme.space[1]};
  left: ${({ theme }) => theme.space[1]};
`;

const NotificationTimeContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const NotificationCard = ({ notification }) => {
  const theme = useTheme();
  const {
    time = "1 hour ago",
    title = "Information",
    content = "lorem ipsum",
    icon,
  } = notification;

  return (
    <NotificationCardContainer>
      <NotificationCardStatus active={true} />
      <NotificationCardHeader>
        <Ionicons
          name="md-information-circle"
          size={30}
          color={theme.colors.brand.primary}
        />
        <NotificationTimeContainer>
          <Ionicons
            name="md-time-outline"
            size={18}
            color={rgba(theme.colors.ui.primary, 0.4)}
          />
          <Spacer position="left" size="small" />
          <Text style={{ fontSize: 12 }}>{time}</Text>
        </NotificationTimeContainer>
      </NotificationCardHeader>
      <Spacer position="bottom" size="large" />
      <Text variant="caption" styled={{ fontSize: 20 }}>
        {title}
      </Text>
      <Spacer position="bottom" size="large" />
      <Text style={{ fontSize: 14, lineHeight: 20 }}>{content}</Text>
      <Spacer position="bottom" size="large" />
    </NotificationCardContainer>
  );
};

const latestMessages = [
  {
    _id: 1,
    text: "Hey there freshr",
    createdAt: new Date(),
    time: "3 min",
    user: {
      _id: 2,
      name: "Alex dimitri",
      avatar: "https://placeimg.com/140/140/any",
    },
    unreadCnt: 3,
  },
  {
    _id: 2,
    text: "Hello client",
    createdAt: new Date(),
    time: "3 min",
    user: {
      _id: 3,
      name: "Paul walker",
      avatar: "https://placeimg.com/140/140/any",
    },
    unreadCnt: 3,
  },
  {
    _id: 3,
    text: "Hello, I am available now",
    createdAt: new Date(),
    time: "3 min",
    user: {
      _id: 4,
      name: "John doe",
      avatar: "https://placeimg.com/140/140/any",
    },
    unreadCnt: 3,
  },
];

const MessageCard = ({ latestMessage }) => {
  const navigation = useNavigation();
  return (
    <>
      <Spacer position="top" size="medium" />
      <MessageCardContainer
        onPress={() =>
          navigation.navigate("Chat", { user: latestMessage.user })
        }
      >
        <Avatar.Image source={{ uri: latestMessage.user.avatar }} />
        <Spacer position="left" size="large" />
        <MessageCardContent>
          <View>
            <Text variant="caption" style={{ fontSize: 14 }}>
              {latestMessage.user.name}
            </Text>
            <Spacer position="bottom" size="medium" />
            <MessageCardMessagePreview numberOfLines={1} ellipsis="tail">
              {latestMessage.text}
            </MessageCardMessagePreview>
          </View>
        </MessageCardContent>
        <MessageCardStatusContainer>
          <Text variant="caption">{latestMessage.time}</Text>
          <Spacer position="bottom" size="small" />

          <MessageCardStatusCnt>
            <Text variant="caption" style={{ color: "white" }}>
              {latestMessage.unreadCnt}
            </Text>
          </MessageCardStatusCnt>
        </MessageCardStatusContainer>
      </MessageCardContainer>
      <Separator />
    </>
  );
};

const notificationsData = [
  {
    id: 1,
    title: "Informational",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat justo ac tortor hendrerit",
    time: "2 hour ago",
  },
  {
    id: 2,
    title: "Informational",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat justo ac tortor hendrerit",
    time: "2 hour ago",
  },
  {
    id: 3,
    title: "Informational",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat justo ac tortor hendrerit",
    time: "2 hour ago",
  },
];

const InboxScreen = () => {
  const layout = useWindowDimensions();
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "messages", title: "Messages" },
    { key: "notifications", title: "Notifications" },
  ]);

  useEffect(() => {
    setNotifications(notificationsData);
    setMessages(latestMessages);
  }, []);

  const renderNotifications = () => {
    return (
      <NotificationsContainer>
        <FlatList
          data={notifications}
          renderItem={({ item }) => <NotificationCard notification={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </NotificationsContainer>
    );
  };

  const renderMessages = () => {
    return (
      <MessagesListContainer>
        <FlatList
          data={messages}
          renderItem={({ item }) => <MessageCard latestMessage={item} />}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      </MessagesListContainer>
    );
  };

  const renderScene = SceneMap({
    messages: renderMessages,
    notifications: renderNotifications,
  });

  return (
    <SafeArea>
      <Container>
        <HeaderContainer>
          <Spacer position="top" size="large" />
          <PageTitle>Inbox</PageTitle>
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

export default connect(mapStateToProps, mapDispatchToProps)(InboxScreen);

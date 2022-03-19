import {useEffect, useState} from "react";
import {connect} from "react-redux";
import styled, {useTheme} from 'styled-components/native';
import {SceneMap, TabBar, TabBarItem, TabView} from "react-native-tab-view";
import {FlatList, useWindowDimensions, View} from "react-native";
import {rgba} from "polished";

import {Spacer} from "../components/spacer/spacer.component";
import {SectionTitle} from "./components/details-screen.component";
import {SafeArea} from "../components/utils/safearea.component";
import {Text} from '../components/typography/typography.component';
import {Time} from "react-native-gifted-chat";
import {Avatar} from "react-native-paper";


const Container = styled.View`
  flex: 1;
  background-color: white;
`

const HeaderContainer = styled.View`
  padding: ${({theme}) => theme.space[3]};
`

const PageTitle = styled(SectionTitle)`
  font-size: 35px;
  font-weight: 700;
`

const TabViewContainer = styled.View`
  flex: 1;
  padding: 0px ${({theme}) => theme.space[3]};
  background-color: ${({theme}) => theme.colors.ui.quaternary};
`

const MessagesListContainer = styled.View`
  background-color: ${({theme}) => theme.colors.ui.quaternary};
  flex: 1
`

const NotificationsContainer = styled.View`
  background-color: ${({theme}) => theme.colors.ui.quaternary};
  flex: 1
`

const MessageCardContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${({theme}) => theme.space[2]} ${({theme}) => theme.space[1]}
`

const Separator = styled.View`
  height: 2px;
  background-color: ${({theme}) => rgba(theme.colors.ui.primary, 0.05)};
`


const MessageCardContent = styled.View`
  flex-direction: row;
  flex: 1
`

const MessageCardMessagePreview = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  padding-right: ${({theme}) => theme.space[3]}
`

const MessageCardStatusContainer = styled.View`
`

const MessageCardStatusCnt = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 100px;
  background-color: ${({theme}) => theme.colors.ui.primary};
`

const latestMessages = [
    {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        time: "3 min",
        user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
        unreadCnt: 3,
    },{
        _id: 2,
        text: 'Hello developer',
        createdAt: new Date(),
        time: "3 min",
        user: {
            _id: 3,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
        unreadCnt: 3,
    },{
        _id: 3,
        text: 'Hello, I am available now',
        createdAt: new Date(),
        time: "3 min",
        user: {
            _id: 4,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
        unreadCnt: 3,
    },
]

const MessageCard = ({latestMessage}) => (
    <>
        <Spacer position="top" size="medium"/>
        <MessageCardContainer>
            <Avatar.Image source={{uri: latestMessage.user.avatar}}/>
            <Spacer position="left" size="large"/>
            <MessageCardContent>
                <View>
                    <Text variant="caption" style={{fontSize: 14}}>{latestMessage.user.name}</Text>
                    <Spacer position="bottom" size="medium"/>
                    <MessageCardMessagePreview numberOfLines={1} ellipsis="tail">{latestMessage.text}</MessageCardMessagePreview>
                </View>
            </MessageCardContent>
            <MessageCardStatusContainer>
                <Text variant="caption">{latestMessage.time}</Text>
                <Spacer position="bottom" size="small"/>

                <MessageCardStatusCnt><Text variant="caption" style={{color: "white"}}>{latestMessage.unreadCnt}</Text></MessageCardStatusCnt>
            </MessageCardStatusContainer>
        </MessageCardContainer>
        <Separator/>
    </>

)


const renderMessages = () => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        setMessages(latestMessages)
    }, [])

    return (
        <MessagesListContainer>
            <FlatList
                data={messages}
                renderItem={({item}) => <MessageCard latestMessage={item}/>}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
            />
        </MessagesListContainer>
    )
}
const renderNotifications = () =>  <NotificationsContainer/>
const renderTabBarItem = (props) => <TabBarItem {...props} style={{flex: 1, padding: 16}}/>
const renderLabel= ({ route, focused, color }) => (
    <Text style={{ color, margin: 8 }}>
        {route.title}
    </Text>
)
const renderTabBar = (props) => {
    const theme = useTheme()
    return (
        <TabBar {...props}
            renderLabel={renderLabel}
            renderTabBarItem={renderTabBarItem}
            activeColor={"black"}
            inactiveColor={rgba(theme.colors.ui.primary, 0.4)}
            indicatorStyle={{backgroundColor: "black", height: 2}}
            style={{backgroundColor: theme.colors.ui.quaternary}}
        />
    )
}

const renderScene = SceneMap({
    messages: renderMessages,
    notifications: renderNotifications,
});

const InboxScreen = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'messages', title: 'Messages' },
        { key: 'notifications', title: 'Notifications' },
    ]);

    return (
        <SafeArea>
            <Container>
                <HeaderContainer>
                    <Spacer position="top" size="large"/>
                    <PageTitle>Inbox</PageTitle>
                    <Spacer position="top" size="large"/>
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
    )
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(InboxScreen)

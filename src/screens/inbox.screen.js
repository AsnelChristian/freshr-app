import {connect} from "react-redux";
import styled, {useTheme} from 'styled-components/native';
import {SceneMap, TabBar, TabBarItem, TabView} from "react-native-tab-view";
import {useWindowDimensions} from "react-native";
import {useState} from "react";

import {Spacer} from "../components/spacer/spacer.component";
import {SectionTitle} from "./components/details-screen.component";
import {SafeArea} from "../components/utils/safearea.component";
import {Text} from '../components/typography/typography.component';
import {rgba} from "polished";


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

const renderMessages = () =>  <MessagesListContainer/>
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

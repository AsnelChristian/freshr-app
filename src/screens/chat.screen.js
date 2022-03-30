import styled, { useTheme } from "styled-components/native";
import { connect } from "react-redux";
import React, { useState, useCallback, useEffect } from "react";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import { rgba } from "polished";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const SendButton = styled.View`
  padding: ${({ theme }) => theme.space[2]};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const renderSend = (props) => {
  return (
    <Send {...props}>
      <SendButton>
        <Ionicons name="send" size={30} color="#E8AE4C" />
      </SendButton>
    </Send>
  );
};
const renderBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: rgba("#E8AE4C", 0.8),
        },
        left: {
          backgroundColor: rgba("white", 0.8),
        },
      }}
      textStyle={{
        right: {
          color: "white",
        },
        left: {
          color: "black",
        },
      }}
    />
  );
};

const scrollToBottomComponent = () => {
  return <FontAwesome name="angle-double-down" size={23} />;
};

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "Hello world",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      renderSend={renderSend}
    />
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

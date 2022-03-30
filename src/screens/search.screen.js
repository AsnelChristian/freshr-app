import { useState } from "react";
import { Animated, FlatList, View } from "react-native";
import { connect } from "react-redux";
import { useTheme } from "styled-components/native";

import { SafeArea } from "../components/utils/safearea.component";
import { Text } from "../components/typography/typography.component";
import { Spacer } from "../components/spacer/spacer.component";
import { ServiceButton, ServiceImage } from "./search.styles";
import { CustomSearchBar } from "../components/form/input.component";
import {
  Content,
  PageContainer,
  Row,
  Separator,
} from "../components/helpers/helpers.component";
import { setCurrentService } from "../redux/booking/booking.actions";

const SearchScreen = (props) => {
  const theme = useTheme();
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [active, setActive] = useState(false);

  const animatedValue = new Animated.Value(0);

  const animate = () => {
    animatedValue.setValue(0);

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleSearchChange = (inputText) => {
    const results = props.services.filter(
      (item) => inputText && item.name.toLowerCase().includes(inputText)
    );
    setSearchInput(inputText);
    setSearchResults(results);
    animate();
  };

  const renderSearch = () => {
    return (
      <Row>
        <CustomSearchBar
          value={searchInput}
          color="black"
          autoFocus={true}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Search services..."
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          onChangeText={handleSearchChange}
        />
      </Row>
    );
  };

  const renderNotFound = () => {
    return (
      <View>
        <Text
          variant="label"
          style={{ fontSize: 18 }}
          color={theme.colors.ui.primary}
        >
          No service{" "}
          <Text variant="caption" style={{ fontSize: 18 }}>
            {searchInput}
          </Text>{" "}
          found.
        </Text>
        <Spacer position="bottom" size="large" />
        <Separator />
      </View>
    );
  };

  const renderServiceButton = ({ service }) => {
    return (
      <ServiceButton
        onPress={() => {
          const serviceCategory = props.categories.filter(
            (item) => item.id === service.category
          )[0];
          props.setCurrentService(service, serviceCategory);
          props.navigation.goBack();
        }}
      >
        <Row>
          <ServiceImage source={{ uri: service.image }} />
          <Spacer position="left" size="medium" />
          <Text variant="caption" style={{ fontSize: 16 }}>
            {service.name}
          </Text>
        </Row>
        <Spacer position="bottom" size="small" />
        <Separator />
      </ServiceButton>
    );
  };

  const renderServices = ({ services }) => {
    const opacity = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
      extrapolate: "clamp",
    });

    return (
      <Animated.View style={{ opacity }}>
        <View>
          <Spacer position="top" size="large" />
          <FlatList
            data={services}
            renderItem={({ item }) => renderServiceButton({ service: item })}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Animated.View>
    );
  };

  const renderResults = () => {
    if (searchResults.length === 0 && searchInput) {
      return (
        <View>
          <Spacer position="top" size="large" />
          {renderNotFound()}
          {renderServices({ services: props.services })}
        </View>
      );
    } else if (searchResults.length === 0) {
      return <View>{renderServices({ services: props.services })}</View>;
    } else {
      return renderServices({ services: searchResults });
    }
  };

  return (
    <SafeArea>
      <PageContainer>
        <Content>
          {renderSearch()}
          {renderResults()}
        </Content>
      </PageContainer>
    </SafeArea>
  );
};

const mapStateToProps = (state) => ({
  services: state.services.services,
  categories: state.categories.categories,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentService: (service, category) =>
    dispatch(setCurrentService(service, category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

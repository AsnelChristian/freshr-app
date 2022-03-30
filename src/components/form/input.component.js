import { Dimensions, StyleSheet, View } from "react-native";
import { Input } from "galio-framework";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";

import { theme } from "../../infrastructure/theme";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";

const { width } = Dimensions.get("window");

export const SearchBar = styled(Searchbar)`
  flex-direction: row;
  height: 48px;
  flex: 1;
  border-width: 1px;
  border-radius: 30px;
  border-color: ${({ theme }) => theme.colors.ui.border};
`;

export const CustomSearchBar = (props) => {
  const { shadowless, success, error, primary } = props;

  const inputStyles = [
    styles.input,
    styles.shadow,
    success && styles.success,
    error && styles.error,
    primary && styles.primary,
    { ...props.style },
  ];

  return (
    <SearchBar
      placeholder="Search services..."
      style={inputStyles}
      color={theme.colors.ui.header}
      clearIcon={() => <MaterialIcons name="clear" size={16} color={"black"} />}
      icon={() => (
        <Feather name="search" size={16} color={theme.colors.brand.muted} />
      )}
      {...props}
    />
  );
};

CustomSearchBar.defaultProps = {
  shadowless: false,
  success: false,
  error: false,
  primary: false,
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 30,
    height: 44,
    borderColor: theme.colors.ui.border,
    backgroundColor: "#FFFFFF",
  },
  success: {
    borderColor: theme.colors.text.inputSuccess,
  },
  error: {
    borderColor: theme.colors.text.inputError,
  },
  primary: {
    borderColor: theme.colors.brand.primary,
  },
  shadow: {
    shadowColor: theme.colors.ui.primary,
    shadowOffset: { width: 0, height: 0.5 },
    shadowRadius: 1,
    shadowOpacity: 0.13,
    elevation: 2,
  },
});

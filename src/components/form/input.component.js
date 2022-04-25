import { Dimensions, StyleSheet, View } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";

import { theme } from "../../infrastructure/theme";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { rgba } from "polished";

export const SearchBar = styled(Searchbar)`
  flex-direction: row;
  height: 44px;
  flex: 1;
  border-width: 1px;
  border-radius: 30px;
  border-color: ${({ theme }) => theme.colors.brand.quaternary};
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
      color={theme.colors.brand.quaternary}
      clearIcon={() => <MaterialIcons name="clear" size={16} color={"black"} />}
      icon={() => (
        <Feather
          name="search"
          size={16}
          color={theme.colors.brand.quaternary}
        />
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
    borderColor: theme.colors.brand.quaternary,
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
    shadowColor: theme.colors.brand.quaternary,
    shadowOffset: { width: 0, height: 0.5 },
    shadowRadius: 1,
    shadowOpacity: 0.13,
    elevation: 2,
  },
});

export const SearchLocation = styled(Searchbar).attrs((props) => ({
  selectionColor: "black",
  autoFocus: true,
}))`
  border-radius: ${({ theme }) => theme.sizes[2]};
  elevation: 0;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  color: ${({ theme }) => theme.colors.ui.primary};
  font-size: 12px;
`;

export const SearchLocationNotAutoFocus = styled(Searchbar).attrs((props) => ({
  selectionColor: "black",
}))`
  border-radius: ${({ theme }) => theme.sizes[2]};
  elevation: 0;
  background-color: ${({ theme }) => theme.colors.ui.quaternary};
  color: ${({ theme }) => theme.colors.ui.primary};
  font-size: 12px;
`;

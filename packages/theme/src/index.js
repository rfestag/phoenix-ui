import React, { useContext } from "react";
import PropTypes from "prop-types";
import merge from "deepmerge";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { createContext } from "@phoenix-ui/core";
import { SET_THEME } from "./actions";

/**
 * Defeault theme overrides.
 */
export const defaultTheme = {
  control: {
    zIndex: 1000,
    backgroundColor: "#212121",
    navigation: {
      position: "fixed",
      bottom: 12,
      right: 12
    }
  }
};

/**
 * Merge one or more Material UI theme definitions with the default theme, and return a theme that can be used by the ThemeProvider
 * @see https://material-ui.com/styles/api/#themeprovider
 * @see https://material-ui.com/customization/theming/#createmuitheme-options-args-theme
 * @param {...*} themes - A list of Material UI theme objects. They will be merged with the default theme, and passed to createMuiTheme
 * @returns {object} A material UI theme
 * @example
 * const overrides = {
 *   shape: {
 *     borderRadius: 0
 *   }
 * }
 * const dark = {
 * }
 * const theme = buildTheme(overrides, dark)
 */
export function buildTheme(...themes) {
  return createMuiTheme(merge.all([defaultTheme, ...themes]));
}

const DEFAULT_STATE = { themes: {}, theme: createMuiTheme(defaultTheme) };
const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_THEME: {
      const theme = state.themes[payload];
      return { ...state, theme };
    }
  }
  return state;
};

export const [
  ThemeContext,
  ContextProvider,
  ThemeContextConsumer
] = createContext(reducer, DEFAULT_STATE);
const InnerContextProvider = ({ children }) => {
  const { state } = useContext(ThemeContext);
  const { theme } = state;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
InnerContextProvider.propTypes = {
  children: PropTypes.any
};
export const ThemeContextProvider = ({ children, initialState }) => (
  <ContextProvider initialState={initialState}>
    <InnerContextProvider>{children}</InnerContextProvider>
  </ContextProvider>
);
ThemeContextProvider.propTypes = {
  children: PropTypes.any,
  initialState: PropTypes.any
};

import { buildTheme } from "@phoenix-ui/theme";
import orange from "@material-ui/core/colors/orange";

const overrides = {
  shape: {
    borderRadius: 0,
  },
};
const dark = {
  palette: {
    type: "dark",
    primary: orange,
  },
  map: {
    control: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  },
};
const light = {};
const themes = {
  dark: buildTheme(overrides, dark),
  light: buildTheme(overrides, light),
};
const theme = themes.dark;
export default { themes, theme };

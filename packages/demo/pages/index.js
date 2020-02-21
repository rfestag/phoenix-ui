import React from "react";
import { MapContextProvider } from "@phoenix-ui/map";
import { ThemeContextProvider } from "@phoenix-ui/theme";
import mapConfig from "../config/map";
import themeConfig from "../config/theme";
import Map from "../components/NextMap";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const App = () => (
  <div style={{ width: "100%", height: "100vh" }}>
    <ThemeContextProvider initialState={themeConfig}>
      <MapContextProvider initialState={mapConfig}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <AppBar position="static" color="default">
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1 }} />
              <Toolbar variant="dense">A</Toolbar>
            </div>
          </AppBar>
          <div style={{ flex: 1, position: "relative" }}>
            <Map />
          </div>
        </div>
      </MapContextProvider>
    </ThemeContextProvider>
  </div>
);

export default App;

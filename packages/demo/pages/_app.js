import React from "react";
import PropTypes from "prop-types";
import "leaflet/dist/leaflet.css";
import "@phoenix-ui/map/popup.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
};

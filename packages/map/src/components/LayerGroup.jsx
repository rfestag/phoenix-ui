import React from "react";
import PropTypes from "prop-types";
import { LayerGroup as LeafletLayerGroup } from "react-leaflet";
import LayerTypes from "./LayerTypes";

const ChildLayer = ({ type, props }) => {
  const Overlay = LayerTypes[type];
  return <Overlay {...props} />;
};
ChildLayer.propTypes = {
  type: PropTypes.string,
  props: PropTypes.object
};
export const LayerGroup = ({ children }) => {
  return <LeafletLayerGroup>{children.map(ChildLayer)}</LeafletLayerGroup>;
};
LayerGroup.propTypes = {
  children: PropTypes.array
};

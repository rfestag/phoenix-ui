import React, { useContext } from "react";
import PropTypes from "prop-types";
import L from "leaflet";
import { Map as LMap } from "react-leaflet";
import { MapContext } from "../index";
import { setViewport } from "../actions";
import { Navigation } from "./Navigation";
import { MapToolbar } from "./MapToolbar";
import LayerTypes from "./LayerTypes";
import "leaflet-editable";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 40]
});

L.Marker.prototype.options.icon = DefaultIcon;

const corner1 = L.latLng(-90, -720);
const corner2 = L.latLng(90, 720);
const MAX_BOUNDS = L.latLngBounds(corner1, corner2);

const Map = ({ children }) => {
  const { state, dispatch } = useContext(MapContext);
  const { center, zoom, viewport, baseLayers, overlays } = state;
  const baseLayer = baseLayers.find(l => l.visible);
  const BaseLayer = LayerTypes[baseLayer.type];
  const activeOverlays = overlays.reduce((overlays, l) => {
    if (l.visible) {
      const OverlayLayer = LayerTypes[l.type];
      overlays.push(<OverlayLayer key={l.name} {...l.props} />);
    }
    return overlays;
  }, []);

  return (
    <LMap
      center={center}
      zoom={zoom}
      viewport={viewport}
      worldCopyJump={true}
      maxBoundsViscosity={1.0}
      maxBounds={MAX_BOUNDS}
      onViewportChanged={v => dispatch(setViewport(v))}
      zoomControl={false}
      style={{ width: "100%", height: "100%" }}
      onContextMenu={L.DomEvent.preventDefault}
      editable={true}
      attributionControl={false}
    >
      <BaseLayer {...baseLayer.props} />
      {activeOverlays}
      {children}
      <MapToolbar />
      <Navigation />
    </LMap>
  );
};
Map.propTypes = {
  children: PropTypes.any
};

export default Map;

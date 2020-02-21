import React, { memo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import L from "leaflet";
import buffer from "@turf/buffer";
import { makeStyles } from "@material-ui/core/styles";
import { removeFeature, updateFeature } from "../utils";
import { ShapeToolbar } from "./ShapeToolbar";
import {
  Circle,
  Polyline,
  Polygon,
  Rectangle,
  GeoJSON,
  LayerGroup,
  Popup,
  Tooltip
} from "react-leaflet";

const useStyles = makeStyles({
  tooltip: {
    "box-shadow": "unset",
    "background-color": "unset",
    "border-radius": "unset",
    border: "none"
  }
});

const bounds = bbox => {
  const [w, s, e, n] = bbox;
  const sw = L.latLng(s, w);
  const ne = L.latLng(n, e);

  return [sw, ne];
};
const toPositions = coordinates => {
  return coordinates.map(([lon, lat]) => [lat, lon]);
};

const ToolbarPopup = ({ feature, layer, onUpdate, onDelete }) => {
  return (
    <Popup className="toolbar-popup" style={{ height: 0 }}>
      <ShapeToolbar
        feature={feature}
        layer={layer}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </Popup>
  );
};
ToolbarPopup.propTypes = {
  feature: PropTypes.object,
  layer: PropTypes.object,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func
};
const Label = ({ children }) => {
  const { tooltip } = useStyles();
  return (
    <Tooltip className={tooltip} direction="center" permanent>
      {children}
    </Tooltip>
  );
};
Label.propTypes = {
  children: PropTypes.any
};

const Layer = memo(({ feature, onUpdate, onDelete }) => {
  const [layer, setLayer] = useState(null);
  const { geometry, properties } = feature;
  const style = () => properties.style;
  const ref = useCallback(node => {
    if (node) {
      setLayer(node.leafletElement);
    }
  });
  if (geometry.type === "LineString") {
    if (properties.buffer) {
      const buffered = buffer(geometry, properties.buffer, { unit: "meters" });
      const positions = buffered.coordinates.map(toPositions);
      return (
        <Polygon ref={ref} positions={positions} style={style}>
          <ToolbarPopup
            feature={feature}
            layer={layer}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
          <Label>{properties.name}</Label>
        </Polygon>
      );
    } else {
      const positions = toPositions(geometry.coordinates);
      return (
        <Polyline ref={ref} positions={positions} style={style}>
          <ToolbarPopup
            feature={feature}
            layer={layer}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
          <Label>{properties.name}</Label>
        </Polyline>
      );
    }
  } else if (geometry.type === "Polygon") {
    if (properties.type === "Circle") {
      const center = [properties.center[1], properties.center[0]];
      return (
        <Circle
          ref={ref}
          center={center}
          radius={properties.radius}
          style={style}
        >
          <ToolbarPopup
            feature={feature}
            layer={layer}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
          <Label>{properties.name}</Label>
        </Circle>
      );
    } else if (properties.type === "Rectangle") {
      return (
        <Rectangle ref={ref} bounds={bounds(feature.bbox)} style={style}>
          <ToolbarPopup
            feature={feature}
            layer={layer}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
          <Label>{properties.name}</Label>
        </Rectangle>
      );
    } else {
      const positions = geometry.coordinates.map(toPositions);
      return (
        <Polygon ref={ref} positions={positions} style={style}>
          <ToolbarPopup
            feature={feature}
            layer={layer}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
          <Label>{properties.name}</Label>
        </Polygon>
      );
    }
  } else {
    return (
      <GeoJSON ref={ref} data={feature} style={style}>
        <ToolbarPopup
          feature={feature}
          layer={layer}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
        <Label>{properties.name}</Label>
      </GeoJSON>
    );
  }
});
Layer.propTypes = {
  feature: PropTypes.object,
  layer: PropTypes.object,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func
};

export const FeatureLayer = ({ layer, onFeaturesChanged }) => {
  const onUpdate = (oldFeature, newFeature) => {
    onFeaturesChanged(layer, updateFeature(layer, oldFeature, newFeature));
  };
  const onDelete = feature => {
    console.log("Removing", feature);
    console.log(layer);
    console.log(removeFeature(layer, feature));
    onFeaturesChanged(layer, removeFeature(layer, feature));
  };

  return (
    <LayerGroup>
      {layer.props.features.map(f => (
        <Layer
          key={f.properties.id}
          onDelete={onDelete}
          onUpdate={onUpdate}
          feature={f}
        />
      ))}
    </LayerGroup>
  );
};
FeatureLayer.propTypes = {
  layer: PropTypes.object,
  onFeaturesChanged: PropTypes.func
};

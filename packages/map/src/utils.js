import L from "leaflet";
import circle from "@turf/circle";
import bbox from "@turf/bbox";

import { RECTANGLE, CIRCLE, LINE, POLYGON, MARKER } from "./constants";

const counts = {};
const getName = type => {
  counts[type] = (counts[type] || 0) + 1;
  return `${type} ${counts[type]}`;
};

export const handlers = {
  rectangle: map => {
    const type = RECTANGLE;
    const name = getName(type);
    const properties = {
      type,
      name,
      id: name
    };
    const layer = map.editTools.startRectangle();
    layer.properties = properties;
    return layer;
  },
  circle: map => {
    const type = CIRCLE;
    const name = getName(type);
    const properties = {
      type,
      name,
      id: name
    };
    const layer = map.editTools.startCircle();
    layer.properties = properties;
    return layer;
  },
  line: map => {
    const type = LINE;
    const name = getName(type);
    const properties = {
      type,
      name,
      id: name
    };
    const layer = map.editTools.startPolyline();
    layer.properties = properties;
    return layer;
  },
  polygon: map => {
    const type = POLYGON;
    const name = getName(type);
    const properties = {
      type,
      name,
      id: name
    };
    const layer = map.editTools.startPolygon();
    layer.properties = properties;
    return layer;
  },
  marker: map => {
    const type = MARKER;
    const name = getName(type);
    const properties = {
      type,
      name,
      id: name
    };
    const layer = map.editTools.startMarker();
    layer.properties = properties;
    return layer;
  }
};
export const layerToFeature = layer => {
  let geojson = layer.toGeoJSON();
  geojson.properties = { ...layer.properties };
  if (layer instanceof L.Circle) {
    const center = geojson.geometry.coordinates;
    geojson = circle(geojson, layer._mRadius, { units: "meters" });
    geojson.properties.radius = layer._mRadius;
    geojson.properties.center = center;
  }
  geojson.bbox = bbox(geojson);
  return geojson;
};
let featureId = 0;
export const createFeatureLayer = ({ name, ...opts }) => {
  if (name === undefined) throw "You must specify a name";
  return {
    name,
    id: featureId++,
    type: "FeatureLayer",
    visible: true,
    description: "",
    thumbnail: "",
    props: {
      features: []
    },
    ...opts
  };
};
export const updateFeatures = (layer, features) => {
  const newLayer = { ...layer };
  newLayer.props = { ...newLayer.props };
  newLayer.props.features = features;
  return newLayer;
};
export const addFeature = (layer, feature) => {
  const features = [...layer.props.features, feature];
  return updateFeatures(layer, features);
};
export const removeFeature = (layer, feature) => {
  const features = layer.props.features.filter(f => f !== feature);
  return updateFeatures(layer, features);
};
export const updateFeature = (layer, oldFeature, newFeature) => {
  const features = layer.props.features.map(f =>
    f === oldFeature ? newFeature : f
  );
  return updateFeatures(layer, features);
};

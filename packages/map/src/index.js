import { createContext } from "@phoenix-ui/core";
import {
  SET_VIEWPORT,
  SET_BASELAYER,
  ADD_BASELAYER,
  REMOVE_BASELAYER,
  SHOW_OVERLAY,
  HIDE_OVERLAY,
  ADD_OVERLAY,
  REMOVE_OVERLAY,
  UPDATE_OVERLAY,
  ADD_USER_LAYER,
  REMOVE_USER_LAYER,
  UPDATE_USER_LAYER
} from "./actions";
import overlays from "./overlays";
import baseLayers from "./baseLayers";

/**
 * The default map state
 */
const DEFAULT_STATE = {
  viewport: {
    center: [0, 0],
    zoom: 3
  },
  baseLayers,
  overlays,
  userLayers: []
};

const addLayer = (list, layer) => {
  return [...list, layer];
};
const removeLayer = (list, layer) => {
  return list.filter(l => l === layer);
};
const replaceLayer = (list, oldLayer, newLayer) => {
  return list.map(l => (l === oldLayer ? newLayer : l));
};
const setVisibility = (list, layer, visible, exclusive = false) => {
  return list.map(l => {
    if (l === layer) l = { ...l, visible };
    else if (exclusive && visible && l.visible) l = { ...l, visible: false };
    return l;
  });
};

/**
 * The reducer for map state. Executed on action dispatch
 */
const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_VIEWPORT: {
      return { ...state, viewport: payload };
    }
    case SET_BASELAYER: {
      const baseLayers = setVisibility(state.baseLayers, payload, true, true);
      return { ...state, baseLayers };
    }
    case ADD_BASELAYER: {
      const baseLayers = addLayer(state.baseLayers, payload);
      return { ...state, baseLayers };
    }
    case REMOVE_BASELAYER: {
      const baseLayers = removeLayer(state.baseLayers, payload);
      return { ...state, baseLayers };
    }
    case SHOW_OVERLAY: {
      const overlays = setVisibility(state.overlays, payload, true);
      return { ...state, overlays };
    }
    case HIDE_OVERLAY: {
      const overlays = setVisibility(state.overlays, payload, false);
      return { ...state, overlays };
    }
    case ADD_OVERLAY: {
      const overlays = addLayer(state.overlays, payload);
      return { ...state, overlays };
    }
    case REMOVE_OVERLAY: {
      const overlays = removeLayer(state.overlays, payload);
      return { ...state, overlays };
    }
    case UPDATE_OVERLAY: {
      const { oldLayer, newLayer } = payload;
      const overlays = replaceLayer(state.overlays, oldLayer, newLayer);
      return { ...state, overlays };
    }
    case ADD_USER_LAYER: {
      const userLayers = addLayer(state.userLayers, payload);
      return { ...state, userLayers };
    }
    case REMOVE_USER_LAYER: {
      const userLayers = removeLayer(state.userLayers, payload);
      return { ...state, userLayers };
    }
    case UPDATE_USER_LAYER: {
      const { oldLayer, newLayer } = payload;
      const userLayers = replaceLayer(state.userLayers, oldLayer, newLayer);
      return { ...state, userLayers };
    }
    default: {
      return state;
    }
  }
};
export const [
  MapContext,
  MapContextProvider,
  MapContextConsumer
] = createContext(reducer, DEFAULT_STATE);

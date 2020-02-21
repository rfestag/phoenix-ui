export const SET_VIEWPORT = "SET_VIEWPORT";
export const SET_BASELAYER = "SET_BASELAYER";
export const ADD_BASELAYER = "ADD_BASELAYER";
export const REMOVE_BASELAYER = "REMOVE_BASELAYER";
export const UPDATE_BASELAYER = "UPDATE_BASELAYER";
export const SHOW_OVERLAY = "SHOW_OVERLAY";
export const HIDE_OVERLAY = "HIDE_OVERLAY";
export const ADD_OVERLAY = "ADD_OVERLAY";
export const REMOVE_OVERLAY = "REMOVE_OVERLAY";
export const UPDATE_OVERLAY = "UPDATE_OVERLAY";
export const ADD_USER_LAYER = "ADD_USER_LAYER";
export const REMOVE_USER_LAYER = "REMOVE_USER_LAYER";
export const UPDATE_USER_LAYER = "UPDATE_USER_LAYER";

/**
 * @typedef {Object} LayerDefinition
 * @property {!string} type - A string representation of a react-leaflet layer (such as TileLayer)
 * @property {!string} name - A display name for the layer
 * @property {!boolean} visible - Whether the layer is currently visible or not
 * @property {string} description - A short description of the layer
 * @property {string} thumbnail - A url for a thumbnail image representing this layer
 * @property {!object} props - The properties to pass directly to the layer. They should be properties accepted by the type of layer provided
 */

/**
 * @typedef {Object} Viewport
 * @property {!number[]} center - The zoom for the layer. Array is [longitude, latitude]
 * @property {!number} zoom - The zoom for the layer
 */

/**
 * Sets the viewport of the map.
 * @param {Viewport} payload
 */
export const setViewport = payload => ({ type: SET_VIEWPORT, payload });
/**
 * Sets the current base layer of the map.
 * @param {LayerDefinition} payload
 */
export const setBaselayer = payload => ({ type: SET_BASELAYER, payload });
/**
 * Adds a new layer as a base layer
 * @param {LayerDefinition} payload
 */
export const addBaselayer = payload => ({ type: ADD_BASELAYER, payload });
/**
 * Removes an existing base layer
 * @param {LayerDefinition} payload
 */
export const removeBaselayer = payload => ({ type: REMOVE_BASELAYER, payload });
/**
 * Marks an overlay as visible
 * @param {LayerDefinition} payload
 */
export const showOverlay = payload => ({ type: SHOW_OVERLAY, payload });
/**
 * Marks an overlay as hidden
 * @param {LayerDefinition} payload
 */
export const hideOverlay = payload => ({ type: HIDE_OVERLAY, payload });
/**
 * Adds a new overlay to this list of available overlays
 * @param {LayerDefinition} payload
 */
export const addOverlay = payload => ({ type: ADD_OVERLAY, payload });
/**
 * Removes an overlay from the list of available overlays
 * @param {LayerDefinition} payload
 */
export const removeOverlay = payload => ({ type: REMOVE_OVERLAY, payload });
/**
 * Updates an overlay from the list of available overlays
 * @param {LayerDefinition} payload
 */
export const updateOverlay = (oldLayer, newLayer) => ({
  type: UPDATE_OVERLAY,
  payload: { oldLayer, newLayer }
});
/**
 * Adds a new user layer to this list of available layers
 * @param {LayerDefinition} payload
 */
export const addUserLayer = payload => ({ type: ADD_USER_LAYER, payload });
/**
 * Removes a user layer from the list of available layers
 * @param {LayerDefinition} payload
 */
export const removeUserLayer = payload => ({
  type: REMOVE_USER_LAYER,
  payload
});
/**
 * Updates a user layer from the list of available layers
 * @param {LayerDefinition} payload
 */
export const updateUserLayer = (oldLayer, newLayer) => ({
  type: UPDATE_USER_LAYER,
  payload: { oldLayer, newLayer }
});

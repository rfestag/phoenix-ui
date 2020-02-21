import React, { useEffect, useState, useContext } from "react";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useLeaflet } from "react-leaflet";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import RectIcon from "@material-ui/icons/Stop";
import LineIcon from "@material-ui/icons/Timeline";
import CircleIcon from "@material-ui/icons/FiberManualRecord";
import MarkerIcon from "@material-ui/icons/Place";
import { MapContext } from "../index";
import { addUserLayer, updateUserLayer } from "../actions";
import { PolygonIcon } from "./PolygonIcon";
import { FeatureLayer } from "./FeatureLayer";
import { FeatureLayerSelect } from "./FeatureLayerSelect";
import defaultTheme from "../theme";
import {
  handlers,
  layerToFeature,
  createFeatureLayer,
  addFeature
} from "../utils";

const useStyles = makeStyles(theme => {
  const mapToolbar =
    theme?.map?.control?.toolbar || defaultTheme.control.toolbar;
  const zIndex = theme?.map?.control?.zIndex || defaultTheme.control.zIndex;
  const backgroundColor =
    theme?.map?.control?.backgroundColor ||
    defaultTheme.control.backgroundColor;
  return {
    root: {
      zIndex,
      backgroundColor,
      ...mapToolbar
    },
    toolbar: {
      padding: 0
    },
    buttons: {
      backgroundColor: "unset"
    }
  };
});

const StyledToggleButtonGroup = withStyles(theme => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: "none",
    padding: theme.spacing(0, 1)
  }
}))(ToggleButtonGroup);
const DEFAULT_OPTION = { name: "No layer selected" };
export const MapToolbar = () => {
  const { state, dispatch } = useContext(MapContext);
  const [layer, setLayer] = useState(null);
  const [active, setActive] = useState({});
  const { map } = useLeaflet();
  const { root, toolbar, buttons } = useStyles();
  const { activeTool, activeLayer } = active;
  const { userLayers } = state;

  //This is a bit hacky. The events are called in a awkward order:
  // editable:drawing:end
  // Toggle Click
  // onChange
  //As a result, we have no way to tell the onEnd callback whether the click was on
  //the button or on the map. To get around that, we do a double update to the state.
  //The first clears the activeLayer, so we can start a new one (see the useEffect).
  //The second waits a short time and checks to see if the activeTool changed. If it did,
  //we remove the layer that was inevitably added
  const onEnd = e => {
    e.layer.disableEdit();
    map.editTools.stopDrawing();
    setActive({ activeTool, activeLayer: null });
    setTimeout(() => {
      setActive(active => {
        if (layer && activeTool === active.activeTool) {
          const newLayer = addFeature(layer, layerToFeature(e.layer));
          dispatch(updateUserLayer(layer, newLayer));
          setLayer(newLayer);
        }
        e.layer.remove();
        return active;
      });
    }, 50);
  };
  const updateTool = (e, activeTool) => {
    if (activeLayer) activeLayer.disableEdit();
    setActive({ activeTool, activeLayer: null });
  };
  const handleChange = (oldLayer, newLayer) => {
    setLayer(newLayer);
    dispatch(updateUserLayer(oldLayer, newLayer));
  };

  //Register callbacks for drawing end.
  useEffect(() => {
    map.on("editable:drawing:commit", onEnd);
    //If some tool is active, but we don't have an active layer,
    //start a new one
    if (activeTool && !activeLayer) {
      setActive({ activeTool, activeLayer: handlers[activeTool](map) });
    }
    return () => {
      map.off("editable:drawing:commit", onEnd);
    };
  });
  const activeUserLayers = userLayers.reduce((layers, l) => {
    if (l.visible) {
      layers.push(
        <FeatureLayer key={l.name} layer={l} onFeaturesChanged={handleChange} />
      );
    }
    return layers;
  }, []);

  useEffect(() => {
    let userLayer = userLayers[0];
    if (!userLayer) {
      userLayer = createFeatureLayer({ name: "User Layer" });
      dispatch(addUserLayer(userLayer));
    }
    setLayer(userLayer);
  }, []);

  return (
    <>
      <Paper className={root}>
        <div style={{ flex: 1 }} />
        <Toolbar variant="dense" className={toolbar}>
          <FeatureLayerSelect
            value={layer || DEFAULT_OPTION}
            onChange={setLayer}
            color="inherit"
          />
          <StyledToggleButtonGroup
            exclusive
            value={activeTool}
            onChange={updateTool}
            className={buttons}
          >
            <ToggleButton value="rectangle" disabled={!layer}>
              <RectIcon />
            </ToggleButton>
            <ToggleButton value="circle" disabled={!layer}>
              <CircleIcon />
            </ToggleButton>
            <ToggleButton value="line" disabled={!layer}>
              <LineIcon />
            </ToggleButton>
            <ToggleButton value="polygon" disabled={!layer}>
              <PolygonIcon />
            </ToggleButton>
            <ToggleButton value="marker" disabled={!layer}>
              <MarkerIcon />
            </ToggleButton>
          </StyledToggleButtonGroup>
        </Toolbar>
      </Paper>
      {activeUserLayers}
    </>
  );
};

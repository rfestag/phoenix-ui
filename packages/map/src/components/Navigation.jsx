import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import PlusIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";
import LayerIcon from "@material-ui/icons/Layers";
import MiniMapIcon from "@material-ui/icons/PictureInPictureAltSharp";
import { useLeaflet } from "react-leaflet";
import { makeStyles } from "@material-ui/core/styles";
import defaultTheme from "../theme";
import { LayerDialog } from "./LayerDialog";

const useStyles = makeStyles(theme => {
  const navigation =
    theme?.map?.control?.navigation || defaultTheme.control.navigation;
  const zIndex = theme?.map?.control?.zIndex || defaultTheme.control.zIndex;
  const backgroundColor =
    theme?.map?.control?.backgroundColor ||
    defaultTheme.control.backgroundColor;
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      zIndex,
      ...navigation
    },
    buttons: {
      marginBottom: 8,
      backgroundColor,
      "& button": {
        padding: "6px 8px"
      }
    }
  };
});

export const Navigation = () => {
  const { map } = useLeaflet();
  const { root, buttons } = useStyles();
  const [showLayerDialog, setShowLayerDialog] = useState(false);

  const toggleLayerDialog = () => {
    setShowLayerDialog(showLayerDialog => !showLayerDialog);
  };
  const closeLayerDialog = () => {
    setShowLayerDialog(false);
  };

  return (
    <>
      <LayerDialog open={showLayerDialog} onClose={closeLayerDialog} />
      <div className={root}>
        <ButtonGroup className={buttons}>
          <Button onClick={toggleLayerDialog}>
            <LayerIcon fontSize="small" />
          </Button>
        </ButtonGroup>
        <ButtonGroup orientation="vertical" className={buttons}>
          <Button onClick={() => map.zoomIn()}>
            <PlusIcon fontSize="small" />
          </Button>
          <Button onClick={() => map.zoomOut()}>
            <MinusIcon fontSize="small" />
          </Button>
        </ButtonGroup>
        <ButtonGroup className={buttons}>
          <Button>
            <MiniMapIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
};

import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useLeaflet } from "react-leaflet";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    zIndex: theme.control.zIndex
  }
}));

export const ShapeToolbar = ({ feature, onUpdate, onDelete }) => {
  const { map } = useLeaflet();
  const { root } = useStyles();

  const handleClick = () => {
    map.closePopup();
    if (onUpdate) onUpdate(feature, feature);
  };

  return (
    <div className={root}>
      <ButtonGroup color="primary" variant="contained">
        <Button onClick={handleClick}>
          <EditIcon />
        </Button>
        <Button onClick={() => onDelete(feature)}>
          <DeleteIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
};
ShapeToolbar.propTypes = {
  feature: PropTypes.object,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func
};

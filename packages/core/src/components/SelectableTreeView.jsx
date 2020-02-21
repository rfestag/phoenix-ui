import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import IndeterminateIcon from "@material-ui/icons/IndeterminateCheckBoxSharp";
import UncheckedIcon from "@material-ui/icons/CheckBoxOutlineBlankSharp";
import CheckedIcon from "@material-ui/icons/CheckBoxSharp";

const useTreeItemStyles = makeStyles(theme => ({
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0)
  },
  labelIcon: {
    marginRight: theme.spacing(1)
  },
  labelText: {
    fontWeight: "inherit",
    whiteSpace: "nowrap",
    flexGrow: 1
  }
}));

function StyledTreeItem({
  labelText,
  onSelect,
  checked,
  indeterminate,
  ...other
}) {
  const classes = useTreeItemStyles();
  const Icon = checked
    ? CheckedIcon
    : indeterminate
    ? IndeterminateIcon
    : UncheckedIcon;

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    onSelect();
  };
  const handleKeyDown = e => {
    if (e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      onSelect();
    }
  };

  return (
    <TreeItem
      onKeyDown={handleKeyDown}
      label={
        <div className={classes.labelRoot}>
          <Icon
            color="inherit"
            className={classes.labelIcon}
            onClick={handleClick}
          />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
        </div>
      }
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  labelText: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool
};

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400
  }
});

const EMPTY = [];
const SelectableItem = ({
  item,
  selected,
  forceSelected = false,
  onSelect,
  ...props
}) => {
  const children = item.children || EMPTY;
  const totalSelectedChildren = Object.keys(selected?.children || {}).length;
  const selectionMode = selected?.selectionMode || 0;
  const isSelected = forceSelected || selectionMode === 1;
  const isIndeterminate = selectionMode === 2;

  const handleSelected = () => {
    //If I'm selected, deselect
    if (isSelected) {
      onSelect(item.id, undefined);
    }
    //Otherwise, select
    else {
      onSelect(item.id, { selectionMode: 1, children: undefined });
    }
  };
  const handleChildSelected = (id, child) => {
    const childSelectionMode = child?.selectionMode || 0;
    if (childSelectionMode === 1) {
      //If all children are selected, I am selected
      if (totalSelectedChildren + 1 === children.length) {
        onSelect(item.id, { selectionMode: 1, children: undefined });
      }
      //Otherwise, update child's selection
      else {
        const children = selected?.children || {};
        onSelect(item.id, {
          selectionMode: 2,
          children: { ...children, [id]: child }
        });
      }
    } else if (childSelectionMode == 2) {
      const children = selected?.children || {};
      onSelect(item.id, {
        selectionMode: 2,
        children: { ...children, [id]: child }
      });
    } else {
      //Case 1: I am currently selected. My children should be undefined, so I reset them
      if (isSelected) {
        const selectedChildren = item.children.reduce((selected, child) => {
          if (id !== child.id)
            selected[child.id] = { selectionMode: 1, children: undefined };
          return selected;
        }, {});
        onSelect(item.id, { selectionMode: 2, children: selectedChildren });
      }
      //This should only happen if this node is indeterminate. When that happens,
      //we should know the children
      else {
        const selectedChildren = Object.keys(selected.children).reduce(
          (selected, c) => {
            if (id !== c)
              selected[c] = { selectionMode: 1, children: undefined };
            return selected;
          },
          {}
        );
        if (Object.keys(selectedChildren).length === 0)
          onSelect(item.id, { selectionMode: 0, children: undefined });
        else
          onSelect(item.id, { selectionMode: 2, children: selectedChildren });
      }
    }
  };
  return (
    <StyledTreeItem
      labelText={item.name}
      checked={isSelected}
      indeterminate={isIndeterminate}
      onSelect={handleSelected}
      {...props}
    >
      {children.map(c => (
        <SelectableItem
          key={c.id}
          nodeId={c.id}
          item={c}
          forceSelected={isSelected}
          selected={selected?.children ? selected.children[c.id] : undefined}
          onSelect={handleChildSelected}
        />
      ))}
    </StyledTreeItem>
  );
};
SelectableItem.propTypes = {
  item: PropTypes.object,
  selected: PropTypes.object,
  forceSelected: PropTypes.bool,
  onSelect: PropTypes.func
};
const buildSelected = (node, isSelected) => {
  if (isSelected(node)) return { selectionMode: 1, children: undefined };
  else if (node.children) {
    const children = node.children.reduce((selected, c) => {
      const result = buildSelected(c, isSelected);
      if (result !== undefined) selected[c.id] = result;
      return selected;
    }, {});
    if (Object.keys(children).length === 0) return undefined;
    return { selectionMode: 2, children };
  } else {
    return undefined;
  }
};
export const SelectableTreeView = ({ data, getIsSelected, onSelect }) => {
  const [selected, setSelected] = useState({});
  const classes = useStyles();

  const handleSelect = (id, newSelection) => {
    const newSelect = { ...selected, [id]: newSelection };
    onSelect(newSelect);
  };
  useEffect(() => {
    const selected = buildSelected({ children: data }, getIsSelected);
    setSelected(selected?.children || {});
  }, [data]);

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      defaultExpanded={EMPTY}
    >
      {data.map(d => (
        <SelectableItem
          key={d.id}
          nodeId={d.id}
          item={d}
          selected={selected[d.id]}
          onSelect={handleSelect}
        />
      ))}
    </TreeView>
  );
};
SelectableTreeView.propTypes = {
  data: PropTypes.array,
  getIsSelected: PropTypes.func,
  onSelect: PropTypes.func
};

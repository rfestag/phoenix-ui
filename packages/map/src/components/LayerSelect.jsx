import React, { useContext, useState } from "react";
import { MapContext } from "../index";
import { SelectableTreeView } from "@phoenix-ui/core/lib/components/SelectableTreeView";

export const LayerSelect = () => {
  const { state } = useContext(MapContext);
  //const { state, dispatch } = useContext(MapContext);
  //const [selected, setSelected] = useState({});
  const [, setSelected] = useState({});
  const { overlays } = state;

  const handleSelect = selected => {
    console.log("SELECTED", selected);
    setSelected(selected);
  };
  return (
    <SelectableTreeView
      data={overlays}
      onSelect={handleSelect}
      getIsSelected={d => d.visible}
    />
  );
};

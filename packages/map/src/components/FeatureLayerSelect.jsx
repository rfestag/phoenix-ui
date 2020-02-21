import React, { useContext } from "react";
import PropTypes from "prop-types";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { MapContext } from "../index";
import { createFeatureLayer } from "../utils";
import { addUserLayer } from "../actions";

const filter = createFilterOptions();

const LayerInput = params => (
  <TextField
    {...params}
    label="Drawing Layer"
    InputProps={{ ...params.InputProps, disableUnderline: true }}
    fullWidth
  />
);

export const FeatureLayerSelect = ({ value, onChange }) => {
  const { state, dispatch } = useContext(MapContext);
  const { userLayers } = state;

  return (
    <Autocomplete
      autoHighlight
      disableClearable
      value={value}
      options={userLayers}
      getOptionLabel={option => option.name}
      renderInput={LayerInput}
      style={{ width: 200 }}
      onChange={(e, value) => {
        if (value && value.inputValue) {
          const layer = createFeatureLayer({ name: value.inputValue });
          dispatch(addUserLayer(layer));
          onChange(layer);
          return;
        }
        onChange(value);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        if (params.inputValue !== "") {
          filtered.push({
            inputValue: params.inputValue,
            name: `Create ${params.inputValue}`
          });
        }
        return filtered;
      }}
      renderOption={(option, { inputValue }) => {
        const matches = match(option.name, inputValue);
        const parts = parse(option.name, matches);

        return (
          <div>
            {parts.map((part, index) => (
              <span
                key={index}
                style={{ fontWeight: part.highlight ? 800 : 400 }}
              >
                {part.text}
              </span>
            ))}
          </div>
        );
      }}
    />
  );
};
FeatureLayerSelect.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func
};

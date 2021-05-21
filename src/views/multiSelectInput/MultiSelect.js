import React from "react";
import Select from "react-select";

export default ({
  onChange, options, value, className, defaultValue,
}) => {
  const selectValue = (options, value) => (options ? options.find((option) => option.value === value) : "");

  return (
        <div className={ className }>
            <Select
              defaultValue={ defaultValue }
              value={ selectValue(options, value) }
              onChange={ (value) => {
                onChange(value);
              } }
              options={ options }
              isMulti
            />
        </div>

  );
};

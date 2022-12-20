import React from "react";
import PropTypes from "prop-types";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

function SelectField({ control, errors, name, label, options = [] }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className={"input-field"}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label={label}
                            name={name}
                            error={!!errors?.[name]}
                            // helperText={!!errors[name] && errors[name].message}
                            {...field}
                        >
                            {options &&
                                options.length > 0 &&
                                options.map((item, index) => (
                                    <MenuItem value={item.value} key={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </div>
            )}
        />
    );
}

SelectField.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
};

export default SelectField;

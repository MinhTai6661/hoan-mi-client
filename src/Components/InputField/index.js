import React from "react";
import PropTypes from "prop-types";
import { TextField, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

function InputFeild({ control, errors, name, label, isTextarea = false }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className={"input-field"}>
                    <TextField
                        multiline={isTextarea}
                        id={name}
                        label={label}
                        variant="standard"
                        error={!!errors?.[name]}
                        helperText={!!errors[name] && errors[name].message}
                        {...field}
                    />
                </div>
            )}
        />
    );
}

InputFeild.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
};

export default InputFeild;

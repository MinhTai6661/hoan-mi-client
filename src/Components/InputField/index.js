import React from "react";
import PropTypes from "prop-types";
import { TextField, Button } from "@mui/material";

function InputFeild(props) {
    return (
        <div>
            <TextField
                id="standard-basic"
                label="password"
                variant="standard"
            />
        </div>
    );
}

InputFeild.propTypes = {};

export default InputFeild;

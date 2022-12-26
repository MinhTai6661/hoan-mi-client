import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./ModalWrapper.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import { Modal } from "@mui/material";
const cx = classNames.bind(styles);

function ModalWrapper({ onClose, open, children }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                overFlow: "auto",
            }}
        >
            <div className={cx("wrapper")}>{children}</div>
        </Modal>
    );
}

ModalWrapper.propTypes = {
    // onChange: PropTypes.func,
};

export default ModalWrapper;

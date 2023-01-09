import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./ChooseImage.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import { Button, ButtonBase, Input, Modal } from "@mui/material";
import { commons } from "../../untils";
import Container from "../Container";
const cx = classNames.bind(styles);

function ChooseImage({ image, onChange = () => {} }) {
    const [isOpenLightBox, setIsOpenLightBox] = useState(false);
    // const [image, setPreviewImage] = useState(false);

    const handleChangeImage = async (e, field) => {
        const file = e.target.files[0];

        if (file) {
            const url = await commons.getBase64(file);
            // setPreviewImage(url);
            onChange(url);
        }
    };
    // useEffect(() => {
    //     onChange(previewImage);
    // }, [previewImage, onChange]);

    return (
        <div className={cx("wrapper")}>
            <label htmlFor="input">
                <span className={cx("label")}>Chọn ảnh</span>
                <input
                    class={cx("custom-file-input")}
                    sx={{ marginTop: 5 }}
                    type="file"
                    onChange={handleChangeImage}
                    id="input"
                    hidden
                />
            </label>

            <div
                onClick={() => setIsOpenLightBox(true)}
                className={cx("preview-image", { "has-image": !!image })}
                style={{
                    backgroundImage: `url('${image}')`,
                }}
            ></div>

            <Modal
                className={cx("modal-wrapper")}
                open={isOpenLightBox}
                onClose={() => setIsOpenLightBox(false)}
            >
                <img className={cx("light-box-image")} src={image} alt="" />
            </Modal>
        </div>
    );
}

ChooseImage.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default ChooseImage;

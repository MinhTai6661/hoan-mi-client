import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Empty.module.scss";
import { images } from "../../public/image";
const cx = classNames.bind(styles);

function Empty({ title }) {
    return (
        <div className={cx("wrapper")}>
            <h3>{title}</h3>
            <div className={cx("image")}>
                <img src={images.empty} alt={images.empty} />
            </div>
        </div>
    );
}

Empty.propTypes = {};

export default Empty;

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Loading.module.scss";
const cx = classNames.bind(styles);

function Loading({ show }) {
    return (
        <div className={cx("wrapper", { isShow: show })}>
            <span className={cx("icon")}></span>
        </div>
    );
}

Loading.propTypes = {};

export default Loading;

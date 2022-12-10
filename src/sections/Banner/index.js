import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Banner.module.scss";
import { images } from "../../public/image";

const cx = classNames.bind(styles);
function Banner(props) {
    return (
        <div
            className={cx("wrapper")}
            style={{
                backgroundImage: `url('${images.homeBanner}')`,
            }}
        >
            <div className={cx("overlay")}></div>
            <h2 className={cx("caption")}>Hệ thống y tế được tin tưởng nhất việt nam</h2>
        </div>
    );
}

Banner.propTypes = {};

export default Banner;

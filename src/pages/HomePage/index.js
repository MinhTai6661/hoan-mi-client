import React from "react";
import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
const cx = classNames.bind(styles);

export default function HomePage() {
    return <div className={cx("wrapper")}>HomePage</div>;
}

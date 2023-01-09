import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";

const cx = classNames.bind(styles);

export default function DefaultLayout() {
    return (
        <Fragment>
            <Header />
            <div className={cx("main")}>
                <Outlet />
            </div>
            <Footer />
        </Fragment>
    );
}

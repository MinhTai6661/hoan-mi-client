import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

export default function DefaultLayout() {
    return (
        <Fragment>
            <Header />
            <div className="main">
                <Outlet />
            </div>
            <Footer />
        </Fragment>
    );
}

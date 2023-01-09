import classNames from "classnames/bind";
import React from "react";
import Banner from "../../sections/Banner";
import Introduce from "../../sections/Introduce";
import OutstandingDoctor from "../../sections/OutstandingDoctors";
import Reward from "../../sections/Reward";
import Specialties from "../../sections/Specialties";
import styles from "./IntroducePage.module.scss";
const cx = classNames.bind(styles);

export default function IntroducePage() {
    return <div className={cx("wrapper")}>introduce page</div>;
}

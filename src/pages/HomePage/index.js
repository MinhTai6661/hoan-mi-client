import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopDoctor } from "../../redux/doctorSlice";
import Banner from "../../sections/Banner";
import Reward from "../../sections/Reward";
import Introduce from "../../sections/Introduce";
import SpecialList from "../../sections/SpecialList";
import Carousel from "../../Components/Carousel";
import OutstandingDoctor from "../../sections/OutstandingDoctors";
const cx = classNames.bind(styles);

export default function HomePage() {
    const dispath = useDispatch();

    useEffect(() => {
        dispath(fetchTopDoctor(5));
    }, []);

    return (
        <div className={cx("wrapper")}>
            <Banner />
            <Reward />
            <Introduce />
            <SpecialList />
            <OutstandingDoctor />
        </div>
    );
}

import classNames from "classnames/bind";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Container from "../../Components/Container";
import DoctorItem from "../../Components/DoctorItem";
import styles from "./BookingPage.module.scss";

const cx = classNames.bind(styles);

export default function BookingPage() {
    const doctorsList = useSelector((state) => state.manageDoctor.allDoctor);
    console.log("BookingPage  doctorsList", doctorsList);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className={cx("wrapper")}>
            <Container>
                {doctorsList &&
                    doctorsList.length > 0 &&
                    doctorsList.map((item) => (
                        <DoctorItem
                            info={{
                                ...item,
                                MarkDown: {
                                    description: item?.MarkDown?.description,
                                },
                            }}
                        />
                    ))}
            </Container>
        </div>
    );
}

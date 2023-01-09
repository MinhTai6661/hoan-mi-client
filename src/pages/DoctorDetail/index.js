import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./DoctorDetail.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Divider, Grid } from "@mui/material";
import Container from "../../Components/Container";
import { useState } from "react";
import useService from "../../service/userService";
import { toast } from "react-toastify";
import { commons } from "../../untils";
import { useRef } from "react";
import userService from "../../service/userService";
import moment from "moment";
import { format } from "../../constants";
import Schedules from "../../Components/Schedules";
import SchedulesBooking from "../../Components/SchedulesBooking";
import BookingModal from "../../Components/BookingModal";
import DoctorInfo from "../../Components/DoctorInfo";

const cx = classNames.bind(styles);

export default function DoctorDetail() {
    const { id: currentUserId } = useParams();

    const allSchedules = useSelector((state) => state.manageDoctor.allSchedules);

    const [doctor, setDoctor] = useState();
    const [showModal, setShowModal] = useState(false);

    //normal data
    const fullName = `${doctor?.firstName} ${doctor?.lastName}`;
    const description = doctor?.MarkDown?.description;
    const article = doctor?.MarkDown?.contentHTML;
    const urlImage = commons.toBase64(doctor?.image || "");
    const position = doctor?.positionData?.valueVi;
    const articleRef = useRef(null);

    useEffect(() => {
        (async () => {
            const res = await useService.getDoctor(currentUserId);
            if (res.data.errorCode !== 0) {
                toast.error("bác sĩ không tồn tại");
                return;
            }
            setDoctor(res.data.data);
        })();
    }, [currentUserId]);

    const handleBooking = (value) => {
        // console.log(value);
    };

    useEffect(() => {
        articleRef.current.innerHTML = article;
    }, [article]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className={cx("wrapper")}>
            <Container>
                <DoctorInfo info={doctor} />
                <section className={cx("medical-exam-info")}>
                    <Grid container>
                        <Grid item>
                            <div className={cx("schedule")}>
                                {doctor && (
                                    <SchedulesBooking
                                        doctorId={doctor?.id}
                                        // onSubmit={(value) => handleBooking(value)}
                                    />
                                )}
                            </div>
                        </Grid>
                        <Grid item>
                            <div className={cx("location")}></div>
                        </Grid>
                    </Grid>
                </section>
                <Divider />
                <section className={cx("description")}>
                    <article className="doctor-article" ref={articleRef}></article>
                </section>
            </Container>
        </div>
    );
}

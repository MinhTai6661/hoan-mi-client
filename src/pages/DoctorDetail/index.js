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

const cx = classNames.bind(styles);

export default function DoctorDetail() {
    const { id: currentUserId } = useParams();

    const allSchedules = useSelector((state) => state.manageDoctor.allSchedules);

    const [doctor, setDoctor] = useState();
    const [schedulesList, setSchedulesList] = useState([]);
    console.log("DoctorDetail  schedulesList", schedulesList);

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

            const currentSchedulesList = await userService.getSchedulesList(
                res.data.data.id,
                new Date(moment().format(format.time.TO_SERVER)).getTime()
            );
            const currentSchedulesArr = currentSchedulesList.data.data.map((item) => {
                return item.timeType;
            });

            const list = allSchedules.filter((item) => currentSchedulesArr.includes(item.keyMap));
            setSchedulesList(list);
        })();
    }, [currentUserId, allSchedules]);

    const handleChangeSchedule = (item) => {
        console.log(item);
    };

    useEffect(() => {
        articleRef.current.innerHTML = article;
    }, [article]);
    return (
        <div className={cx("wrapper")}>
            <Container>
                <section className={cx("introduce")}>
                    <Grid container>
                        <Grid item xs={12} md={2}>
                            <div className={cx("avatar")}>
                                <img src={urlImage} alt="" />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={10}>
                            <div className={cx("doctor-info")}>
                                <h3 className={cx("title")}>
                                    {position} {fullName}
                                </h3>
                                <p className={cx("desction")}>{description}</p>
                            </div>
                        </Grid>
                    </Grid>
                </section>
                <section className={cx("medical-exam-info")}>
                    <Grid container>
                        <Grid item>
                            <div className={cx("schedule")}>
                                {/* <Schedules
                                    allSchedules={schedulesList}
                                    onChange={handleChangeSchedule}
                                /> */}
                                <SchedulesBooking doctorId={doctor?.id} />
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

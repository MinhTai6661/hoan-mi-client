import { Divider, Grid } from "@mui/material";
import classNames from "classnames/bind";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../../Components/Container";
import DoctorInfo from "../../Components/DoctorInfo";
import DoctorItem from "../../Components/DoctorItem";
import Empty from "../../Components/Empty";
import SchedulesBooking from "../../Components/SchedulesBooking";
import route from "../../constants/Route";
import { images } from "../../public/image";
import useService from "../../service/userService";
import { commons } from "../../untils";
import styles from "./SpecialtyDetail.module.scss";

const cx = classNames.bind(styles);

export default function SpecialtyDetail() {
    const { id: specialtyId } = useParams();

    const [doctorsList, setDoctorsList] = useState([]);
    const [specialty, setSpecialty] = useState([]);
    useEffect(() => {
        getDotorsBySpecialtyId();
        getSpecialty();
    }, []);

    const getDotorsBySpecialtyId = () => {
        (async () => {
            const res = await useService.getDotorsBySpecialtyId(specialtyId);
            if (res.data.errorCode !== 0) {
                toast.error("có lỗi xảy ra");
                return;
            }
            setDoctorsList(res.data.data);
        })();
    };
    const getSpecialty = () => {
        (async () => {
            const res = await useService.getSpecialtyDetail(specialtyId);
            console.log("res", res);
            if (res.data.errorCode !== 0) {
                toast.error("có lỗi xảy ra");
                return;
            }
            setSpecialty(res.data.data);
        })();
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("specialty")}>
                <div className={cx("thumbnail")}>
                    <div className={cx("overlay")}></div>
                    <img src={commons.toBase64(specialty?.image || "")} alt="" />
                </div>
                <div className={cx("info")}>
                    <Container>
                        <h1 className={cx("title")}>{specialty.name}</h1>
                        <div className={cx("description")}>
                            <article
                                dangerouslySetInnerHTML={{ __html: specialty.descriptionHTML }}
                            ></article>
                        </div>
                    </Container>
                </div>
            </div>
            <Container>
                {doctorsList &&
                    doctorsList.length > 0 &&
                    doctorsList.map((item) => {
                        // item.User.MarkDown.description = item?.description || "";
                        return (
                            <DoctorItem
                                info={{
                                    ...item?.User,
                                    MarkDown: {
                                        description: item?.description,
                                    },
                                }}
                            />
                        );
                    })}

                {doctorsList && doctorsList.length === 0 && (
                    <div className={cx("empty")}>
                        <Empty title={"Chuyên khoa chưa có bác sĩ"} />
                    </div>
                )}
            </Container>
        </div>
    );
}

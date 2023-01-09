import { Grid } from "@mui/material";
import classNames from "classnames/bind";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import route from "../../constants/Route";
import { commons } from "../../untils";
import DoctorInfo from "../DoctorInfo";
import SchedulesBooking from "../SchedulesBooking";
import styles from "./DoctorItem.module.scss";

const cx = classNames.bind(styles);

function DoctorItem({ info }) {
    return (
        <div className={cx("wrapper")}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <DoctorInfo info={info} />
                    <Link
                        to={`${route.DOCTOR_DETAIL}/${info.id}`}
                        className={cx("description-doctor")}
                    >
                        Chi tiết
                    </Link>
                </Grid>
                <Grid item xs={12} md={6}>
                    <SchedulesBooking doctorId={info.id} />
                </Grid>
            </Grid>
        </div>
    );
}

DoctorItem.propTypes = {
    // onChange: PropTypes.func,
};

export default DoctorItem;

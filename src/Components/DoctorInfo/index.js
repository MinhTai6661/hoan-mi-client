import { Grid } from "@mui/material";
import classNames from "classnames/bind";
import moment from "moment";
import React from "react";
import { commons } from "../../untils";
import styles from "./DoctorInfo.module.scss";

const cx = classNames.bind(styles);

function DoctorInfo({ info, small, scheduleTime }) {
    const fullName = `${info?.firstName} ${info?.lastName}`;
    const description = info?.MarkDown?.description;
    const article = info?.MarkDown?.contentHTML;
    const urlImage = commons.toBase64(info?.image || "");
    const position = info?.positionData?.valueVi;
    return (
        <div className={cx("introduce", { small })}>
            <Grid container>
                <Grid item xs={12} md={small ? 2 : 3}>
                    <div className={cx("avatar")}>
                        <img src={urlImage} alt="" />
                    </div>
                </Grid>
                <Grid item xs={12} md={small ? 10 : 9}>
                    <div className={cx("doctor-info")}>
                        <h3 className={cx("title")}>
                            {position} {fullName}
                        </h3>
                        <p className={cx("description")}>{description}</p>
                    </div>
                    {scheduleTime && (
                        <div className={cx("schedule-time")}>
                            Lịch hẹn:{" "}
                            <span className={cx("hour")}>
                                {scheduleTime && scheduleTime.selectedSechedule.valueVi}
                            </span>
                            <span className={cx("date")}>
                                {scheduleTime &&
                                    scheduleTime.date &&
                                    moment(scheduleTime?.date)
                                        .locale("vi")
                                        .format("dddd - DD/MM/YYYY")}
                            </span>
                        </div>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}

DoctorInfo.propTypes = {
    // onChange: PropTypes.func,
};

export default DoctorInfo;

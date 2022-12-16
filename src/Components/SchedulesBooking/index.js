import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./SchedulesBooking.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import Schedules from "../Schedules";
import userService from "../../service/userService";
import { format } from "../../constants";
import moment from "moment";
import { Alert, Button, MenuItem, Select } from "@mui/material";
import { array } from "yup";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import localization from "moment/locale/vi";

const cx = classNames.bind(styles);

function SchedulesBooking({ doctorId, onSubmit }) {
    const allSchedules = useSelector((state) => state.manageDoctor.allSchedules);
    const [date, setDate] = useState(1);
    console.log("SchedulesBooking  date", date);
    const [currentSchedules, setCurrentSchedules] = useState([]);
    const [daysList, setDaysList] = useState([]);
    const [availableSchedule, setAvaiableSchedule] = useState();
    const [selectedSechedule, setSelectedSechedule] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await userService.getSchedulesList(doctorId, date);
            console.log("res", res);
            if (doctorId && date && res.data.errorCode !== 0) {
                toast.warning("có lỗi xảy ra");
                return;
            }
            if (res && res?.data?.data && res?.data?.data?.length > 0) {
                const currentSchedulesArr = res.data.data.map((item) => {
                    return item.timeType;
                });
                setCurrentSchedules(currentSchedulesArr);
                const avaiables =
                    allSchedules.filter((item) => currentSchedulesArr.includes(item.keyMap)) || [];
                setAvaiableSchedule(avaiables);
            } else {
                setAvaiableSchedule([]);
                setSelectedSechedule(null);
            }
        })();
    }, [date, allSchedules]);

    useEffect(() => {
        const arrayDays = Array(7)
            .fill(null)
            .map((value, i) => {
                return {
                    label: moment(new Date()).add(i, "days").locale("vi").format("dddd - DD/MM"),
                    value: moment(new Date()).add(i, "days").startOf("days").valueOf(),
                };
            });
        setDaysList(arrayDays);
        setDate(arrayDays[0].value);
    }, []);

    const handleChangeDate = (value) => {
        console.log("handleChangeDate  value", value.target.value);
        setDate(value.target.value);
    };

    const handleScheduleChange = (value) => {
        setSelectedSechedule(value);
    };

    const handleSubmit = () => {
        if (selectedSechedule) {
            console.log(doctorId, selectedSechedule);
            return;
        }
        toast.info("vui lòng chọn lịch khám");
    };
    return (
        <div className={cx("wrapper")}>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={date}
                onChange={handleChangeDate}
                label="Age"
                sx={{ mb: 5 }}
            >
                {daysList &&
                    daysList.length > 0 &&
                    daysList.map((item) => {
                        return (
                            <MenuItem value={item?.value}>
                                <span style={{ textTransform: "capitalize" }}> {item?.label}</span>
                            </MenuItem>
                        );
                    })}
            </Select>
            {availableSchedule && availableSchedule.length > 0 ? (
                <Schedules allSchedules={availableSchedule || []} onChange={handleScheduleChange} />
            ) : (
                <Alert severity="info">Chưa có lịch khám, vui lòng chọn ngày khác</Alert>
            )}
            <Button onClick={handleSubmit} variant="contained">
                {" "}
                Đặt lịch
            </Button>
        </div>
    );
}

SchedulesBooking.propTypes = {
    // onChange: PropTypes.func,
};

export default SchedulesBooking;

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
import utilities from "../../untils/utilities";
import commons from "../../untils/commons";
import BookingModal from "../BookingModal";

const cx = classNames.bind(styles);

function SchedulesBooking({ doctorId, onSubmit = () => {} }) {
    const allSchedules = useSelector((state) => state.manageDoctor.allSchedules);
    const [date, setDate] = useState(new Date());
    console.log("SchedulesBooking  date", date);
    const [currentSchedules, setCurrentSchedules] = useState([]);
    const [daysList, setDaysList] = useState([]);
    const [availableSchedule, setAvaiableSchedule] = useState([]);
    const [selectedSechedule, setSelectedSechedule] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // get avaiable schedules
    useEffect(() => {
        (async () => {
            const res = await userService.getSchedulesList(doctorId, commons.toUnix(date));
            if (doctorId && date && res.data.errorCode !== 0) {
                toast.warning("có lỗi xảy ra");
                return;
            }
            console.log("hellooooooooooooo");

            if (res && res?.data?.data && res?.data?.data?.length > 0) {
                console.log("hellooooooooooooo2");
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
    }, [date, allSchedules, doctorId]);

    //get 7 days from today
    useEffect(() => {
        const arrayDays = Array(7)
            .fill(null)
            .map((value, i) => {
                return {
                    label: moment(new Date()).add(i, "days").locale("vi").format("dddd - DD/MM"),
                    value: moment(new Date()).add(i, "days").startOf("days").valueOf(),
                };
            });
        const firstDate = arrayDays[0].label;
        const dateName = firstDate.slice(0, firstDate.indexOf("-") - 1);
        const replace = firstDate.replace(dateName, "hôm nay");

        arrayDays[0].label = replace;
        setDaysList(arrayDays);
        setDate(arrayDays[0].value);
    }, []);

    const handleChangeDate = (e) => {
        setDate(e.target.value);
    };
    const handleScheduleChange = (value) => {
        setSelectedSechedule(value);
    };

    const handleOpenModal = () => {
        if (selectedSechedule) {
            setShowModal(true);
            onSubmit({
                doctorId,
                selectedSechedule,
            });
            return;
        }
        toast.info("vui lòng chọn lịch khám");
    };

    const handleSubmit = async (req) => {
        console.log("handleSubmit  req", req);
        const res = await userService.createSApoiment(req);
        if (res && res.data.errorCode === 2) {
            toast.info("bạn đã có một lịch khám trước đó, vui lòng xem lại lịch khám của bạn");
            return;
        }
        if (res && res.data.errorCode !== 0) {
            console.log("handleSubmit  res.data.errorCode", res.data.errorCode);
            toast.info("có lỗi xảy ra !");
            return;
        }
        toast.success("Thêm lịch khám thành công, cảm ơn bạn đã tin tưởng chúng tôi");
        // setShowModal(false);
    };
    return (
        <div className={cx("wrapper")}>
            {showModal && (
                <BookingModal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    scheduleTime={{ selectedSechedule, date }}
                    doctorId={doctorId}
                    onSubmitCallBack={handleSubmit}
                />
            )}
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
                            <MenuItem value={item?.value} key={item.value}>
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
            <Button onClick={handleOpenModal} variant="contained">
                Đặt lịch
            </Button>
        </div>
    );
}

SchedulesBooking.propTypes = {
    doctorId: PropTypes.number.isRequired,
};

export default SchedulesBooking;

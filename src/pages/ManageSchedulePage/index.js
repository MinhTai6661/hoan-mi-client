import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./MangeSchedulePage.module.scss";
import Container from "../../Components/Container";
import { Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { date } from "yup";
import { toast } from "react-toastify";
import moment from "moment/moment";
import { format } from "../../constants";
import userService from "../../service/userService";

const cx = classNames.bind(styles);
export default function ManageSchedulesPage() {
    const allDoctors = useSelector((state) => state.manageDoctor.allDoctor);
    const allSchedules = useSelector((state) => state.manageDoctor.allSchedules);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentDoctor, setCurrentDoctor] = useState(null);
    const [selectedSchedules, setSelectedSchedules] = useState([]);

    const renderOptions = (allDoctors) => {
        return allDoctors.map((item) => {
            const fullName = item.lastName + " " + item.firstName;
            return { value: +item.id, label: fullName };
        });
    };
    const handleClickSchedule = (keyMap) => {
        const isExist = selectedSchedules.includes(keyMap);

        if (isExist) {
            setSelectedSchedules((prev) => prev.filter((item) => item !== keyMap));
        } else {
            setSelectedSchedules((prev) => [...prev, keyMap]);
        }
    };

    const handleAddSchedule = async () => {
        if (!currentDoctor) {
            toast.warning("hãy nhập thông tin bác sĩ");
            return;
        }
        if (!currentDate) {
            toast.warning("bạn chưa nhập ngày");
            return;
        }
        if (selectedSchedules.length === 0) {
            toast.warning("hãy chọn lịch khám");
            return;
        }

        const result = selectedSchedules.map((item) => {
            return {
                doctorId: currentDoctor,
                date: new Date(moment(currentDate).format(format.time.TO_SERVER)).getTime(),
                timeType: item,
            };
        });
        const res = await userService.createDoctorSchedule({
            schedules: result,
        });
        toast.success("cập nhật lịch khám thành công");
    };

    useEffect(() => {
        //load avaiable selected schedule
        (async () => {
            const currentSchedulesList = await userService.getSchedulesList(
                currentDoctor,
                new Date(moment(currentDate).format(format.time.TO_SERVER)).getTime()
            );
            console.log("currentSchedulesList", currentSchedulesList.data.data);
            const currentSchedulesArr = currentSchedulesList.data.data.map((item) => {
                return item.timeType;
            });
            setSelectedSchedules(currentSchedulesArr);
        })();
    }, [currentDoctor, currentDate]);

    return (
        <div className={cx("wrapper")}>
            <Container>
                <Grid container spacing={5}>
                    <Grid item xs={12} lg={5}>
                        <label htmlFor="select-doctor">chọn bác sĩ</label>
                        <Select
                            options={renderOptions(allDoctors)}
                            onChange={(e) => {
                                setCurrentDoctor(e.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} lg={7}>
                        <label htmlFor="doctor-desciption">Chọn ngày</label>
                        <DatePicker
                            className={cx("date-picker")}
                            selected={currentDate}
                            onChange={(date) => setCurrentDate(date)}
                            minDate={new Date()}
                            dateFormat={currentDate?.toLocaleDateString("vi-VI") || ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <label>Lịch khám</label>
                        <div className={cx("schedules-list")}>
                            {allSchedules &&
                                allSchedules.length > 0 &&
                                allSchedules.map((item) => (
                                    <span
                                        key={item.id}
                                        className={cx("schedule-item", {
                                            active: selectedSchedules.includes(item.keyMap),
                                        })}
                                        onClick={() => handleClickSchedule(item.keyMap)}
                                    >
                                        {item.valueVi}
                                    </span>
                                ))}
                        </div>
                    </Grid>
                </Grid>

                <Button variant="contained" fullWidth onClick={handleAddSchedule} sx={{ mb: 5 }}>
                    Cập nhật lịch
                </Button>
            </Container>
        </div>
    );
}

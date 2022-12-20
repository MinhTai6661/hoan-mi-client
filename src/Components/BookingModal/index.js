import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, FormControl, Grid, InputLabel, Select, TextField } from "@mui/material";
import classNames from "classnames/bind";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { format } from "../../constants";
import userService from "../../service/userService";
import { commons } from "../../untils";
import DoctorInfo from "../DoctorInfo";
import InputFeild from "../InputField";
import ModalWrapper from "../ModalWrapper";
import SelectField from "../SelectFeild";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./BookingModal.module.scss";
import { Message } from "@mui/icons-material";

const cx = classNames.bind(styles);
const schema = yup
    .object({
        firstName: yup.string().required("vui lòng nhập họ"),
        lastName: yup.string().required("tvui lòng nhập tên"),
        phoneNumber: yup
            .string()
            .matches(
                /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                "vui lòng nhập đúng định dạng số điện thoại"
            )
            .required("vui lòng nhập số điện thoại"),
        gender: yup.string().required("vui lòng chọn giới tính"),
        email: yup
            .string()
            .email("vui lòng nhập đúng định dạng email")
            .required("vui lòng nhập email"),
        address: yup.string().required("vui lòng nhập địa chie"),
        reason: yup.string().required("vui lòng nhập lý do khám"),
        bookingFor: yup.string().required("vui lòng nhập người khám"),
    })
    .required();

function BookingModal({
    onClose,
    open,
    defaultValues,
    scheduleTime,
    doctorId,
    onSubmitCallBack,
    ...others
}) {
    const genders = useSelector((state) => state.manageUser.genderList);
    const allDoctors = useSelector((state) => state.manageDoctor.allDoctor);
    const [birthday, setBirthday] = useState(new Date());

    const [doctor, setDoctor] = useState("");

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
        setValue,
    } = useForm({
        defaultValues: defaultValues || {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            gender: "M",
            email: "",
            address: "",
            reason: "",
            bookingFor: "",
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log("onSubmit  data", birthday);
        const req = {
            doctorId: doctor.id,
            timeType: scheduleTime.selectedSechedule.keyMap,
            date: commons.toUnix(scheduleTime.date),
            email: data.email,
            phoneNumber: data.phoneNumber,
            address: data.address,
            gender: data.gender,
            reason: data.reason,
            statusId: "S1",
            birthday: commons.toUnix(birthday),
        };
        onSubmitCallBack(req);
    };

    useEffect(() => {
        (async () => {
            const res = await userService.getDoctor(doctorId);

            setDoctor(res.data.data);
        })();
    }, [doctorId]);

    return (
        <div className={cx("wrapper")}>
            <ModalWrapper open={open} onClose={onClose} {...others}>
                <DoctorInfo info={doctor} small scheduleTime={scheduleTime} />
                <form onSubmit={handleSubmit(onSubmit)} className={cx("form")}>
                    <Grid container spacing={2}>
                        {/* {JSON.stringify(scheduleTime)} */}
                        {/* 
                        <Grid item xs={12} md={6}>
                            <SelectField
                                control={control}
                                name="doctor"
                                label="bác sĩ"
                                errors={errors}
                                options={commons.renderListDoctorsDropDown(allDoctors)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SelectField
                                control={control}
                                name="doctor"
                                label="Lịch khám"
                                errors={errors}
                                options={allDoctors}
                            />
                        </Grid> */}

                        <Grid item xs={12} md={6}>
                            <InputFeild
                                control={control}
                                name="firstName"
                                label="Họ"
                                errors={errors}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InputFeild
                                control={control}
                                name="lastName"
                                label="Tên"
                                errors={errors}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InputFeild
                                control={control}
                                name="email"
                                label="email"
                                errors={errors}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputFeild
                                control={control}
                                name="phoneNumber"
                                label="Số điện thoại"
                                errors={errors}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputFeild
                                control={control}
                                name="address"
                                label="Địa chỉ"
                                errors={errors}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InputFeild
                                control={control}
                                name="bookingFor"
                                label="Khám cho ai"
                                errors={errors}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputFeild
                                control={control}
                                name="reason"
                                label="Lý do khám"
                                isTextarea
                                errors={errors}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SelectField
                                control={control}
                                name="gender"
                                label="Giới tính"
                                errors={errors}
                                options={commons.renderListGendersDropDown(genders)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {/* <label htmlFor="doctor-desciption">Chọn ngày</label> */}

                            <DatePicker
                                placeholderText="Ngày sinh"
                                className={cx("date-picker")}
                                selected={birthday}
                                onChange={(date) => setBirthday(date)}
                                value={birthday}
                                dateFormat={birthday?.toLocaleDateString("vi-VI") || ""}
                                scrollableYearDropdown
                                showFullMonthYearPicker
                                showYearDropdown
                                showFourColumnMonthYearPicker
                                // showYearPicker
                                // nextYearAriaLabel
                                // nextYearButtonLabel
                                // previousYearAriaLabel
                                // previousYearButtonLabel
                                // scrollableMonthYearDropdown
                                // showMonthYearDropdown
                                // showMonthYearPicker
                                // showQuarterYearPicker
                                // startDate
                                // yearDropdownItemNumber
                                // yearItemNumber
                            />

                            {/* <DatePicker
                                placeholderText="Ngày sinh"
                                className={cx("date-picker")}
                                // selected={currentDate}
                                // onChange={(date) => setCurrentDate(date)}
                                minDate={new Date()}
                                // dateFormat={currentDate?.toLocaleDateString("vi-VI") || ""}
                            /> */}
                        </Grid>
                    </Grid>
                    <Alert severity="info">
                        Lưu ý: mỗi bệnh nhân chỉ được đặt lịch khám 1 lần trên ngày
                    </Alert>
                    <Button fullWidth variant="contained" type="submit" sx={{ marginTop: 5 }}>
                        Đặt lịch
                    </Button>
                </form>
            </ModalWrapper>
        </div>
    );
}

BookingModal.propTypes = {
    // onChange: PropTypes.func,
};

export default BookingModal;

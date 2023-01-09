import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import classNames from "classnames/bind";
import React, { useEffect } from "react";
import { useState } from "react";
import "react-markdown-editor-lite/lib/index.css";
import styles from "./ManagePatient.module.scss";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import userService from "../../service/userService";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import commons from "../../untils/commons";
import { common } from "@mui/material/colors";
import Confirm from "../../Components/Confirm";

const cx = classNames.bind(styles);

export default function ManagePatient() {
    const doctorId = useSelector((state) => state.auth.currentUser.id); //to get patienlist base on id
    const [patientsList, setPatientsList] = useState([1]);
    const [date, setDate] = useState(new Date());
    const [showConfirmDialog, setShowConfirmDialog] = useState(true);

    useEffect(() => {
        (async () => {
            const res = await userService.getPatientBookings({
                doctorId: doctorId,
                date: commons.toUnix(date),
            });
            console.log("handleGetPatientBookings  res", res);
            if (res.data.errorCode !== 0) {
                return;
            }
            setPatientsList(res.data.data);
        })();
    }, [doctorId, date]);

    // const handleGetPatientBookings = async () => {};

    const handleConfirm = async (id) => {
        const res = await userService.confirmScheduleById(id);
        console.log("handleConfirm  res", res);
        if (res.data.errorCode !== 0) {
            toast.warning("Có lỗi xảy ra, xác nhận không thành công");
            return;
        }
        // setPatientsList((prev) => prev.filter((item) => item.id !== id));
        // toast.success(" Xác nhận thành công");
        const index = patientsList.findIndex((item) => item.id === id);
        const newPatientsList = [...patientsList];
        // newPatientsList[index].statusId = "S3";
        // setPatientsList(newPatientsList);
        setPatientsList((prev) =>
            prev.map((item) => {
                return item.id === id ? { ...item, statusId: "S3" } : { ...item };
            })
        );
    };

    return (
        <div className={cx("wrapper")}>
            <h1 className={"main-title"}>Quản lý lịch khám bệnh nhân</h1>
            <DatePicker
                className={cx("date-picker")}
                placeholderText="Ngày khám"
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat={date?.toLocaleDateString("vi-VI") || ""}
                scrollableYearDropdown
                showFullMonthYearPicker
                showYearDropdown
                showFourColumnMonthYearPicker
            />
            <Table
                sx={{ minWidth: 650, maxWidth: "100%", overflow: "auto" }}
                aria-label="simple table"
                className={cx("list-user")}
            >
                <TableHead>
                    <TableRow
                        sx={{
                            textTransform: "capitalize",
                        }}
                    >
                        <TableCell>STT</TableCell>
                        <TableCell>Thời gian khám</TableCell>
                        <TableCell>Họ Tên</TableCell>
                        <TableCell>email</TableCell>
                        <TableCell>Giới tính</TableCell>
                        <TableCell>Ngày sinh</TableCell>
                        <TableCell>Lý do khám</TableCell>
                        <TableCell>Chức năng </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {patientsList &&
                        patientsList.length > 0 &&
                        patientsList.map((row, index) => (
                            <TableRow
                                className={cx("patient-item", {
                                    "is-confirm": row?.statusId === "S3",
                                })}
                                key={row.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row?.scheduleTimeData?.valueVi}</TableCell>
                                <TableCell>
                                    {row?.userBooking?.firstName} {row?.userBooking?.lastName}
                                </TableCell>
                                <TableCell>{row?.userBooking?.email}</TableCell>
                                <TableCell>{row?.userBooking?.genderData?.valueVi}</TableCell>
                                <TableCell>{row?.birthday}</TableCell>
                                <TableCell>{row?.reason}</TableCell>

                                <TableCell className={cx("btn-group")}>
                                    <Button
                                        disabled={date > new Date()}
                                        variant="contained"
                                        sx={{ mb: 1 }}
                                        onClick={() => {
                                            handleConfirm(row.id);
                                        }}
                                    >
                                        <CheckIcon sx={{ cursor: "pointer" }} color="#fff" />
                                        <span> {"Xác nhận"}</span>
                                    </Button>

                                    {/* <Button variant="contained" color="error">
                                        <DeleteForeverOutlinedIcon
                                            sx={{ cursor: "pointer" }}
                                            color="#fff"
                                            // onClick={() => handleDeleteUser(row.id)}
                                        />
                                        <span>Huỷ</span>
                                    </Button> */}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
}

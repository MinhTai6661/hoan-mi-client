import { Avatar } from "@mui/material";
import { routes } from "../../constants";
import ManagePatient from "../../pages/ManagePatient";
import ManageSpecialty from "../../pages/ManageSpecialty";

export const doctorMenu = [
    {
        title: "Quản lý bệnh nhân",
        to: routes.MANAGE_PATIENT,
    },
];
export const managerMenu = [
    {
        title: "Quản lý người dùng",
        to: routes.MANAGE_USER,
    },
    {
        title: "Quản lý thông tin bác sĩ",
        to: routes.MANAGE_ARTICLE,
    },
    {
        title: "Quản lý lịch khám",
        to: routes.MANAGE_SCHEDULE,
    },
    {
        title: "Quản lý Chuyên khoa",
        to: routes.MANAGE_SPECIALTY,
    },
];

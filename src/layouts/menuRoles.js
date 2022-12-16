import { Avatar } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { routes } from "../constants";

export const doctorMenu = [
    {
        title: "hồ sơ cá nhân",
        to: routes.HOME,
        icon: <Avatar />,
    },
    {
        title: "Tài khoản",
        to: "/",
        icon: <Avatar />,
        isDivide: true,
    },
    {
        title: "Quản lý ",
        to: routes.MANAGE,
        icon: <ManageAccountsIcon />,
    },
];
export const managerMenu = [
    {
        title: "hồ sơ cá nhân",
        to: routes.HOME,
        icon: <Avatar />,
    },
    {
        title: "Tài khoản",
        to: "/",
        icon: <Avatar />,
        isDivide: true,
    },
    {
        title: "Quản lý ",
        to: routes.MANAGE,
        icon: <ManageAccountsIcon />,
    },
];
export const patientMenu = [
    {
        title: "hồ sơ cá nhân",
        to: routes.HOME,
        icon: <Avatar />,
    },
    {
        title: "Tài khoản",
        to: "/",
        icon: <Avatar />,
        isDivide: true,
    },
];

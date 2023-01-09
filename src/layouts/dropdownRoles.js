import { Avatar } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { routes } from "../constants";

export const doctorMenu = [
    {
        title: "Quản lý ",
        to: routes.MANAGE,
        icon: <ManageAccountsIcon />,
    },
];
export const managerMenu = [
    {
        title: "Quản lý ",
        to: routes.MANAGE,
        icon: <ManageAccountsIcon />,
    },
];
export const patientMenu = [];

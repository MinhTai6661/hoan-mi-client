import { Avatar } from "@mui/material";
import { routes } from "../../constants";

export const doctorMenu = [
    {
        title: "Quản lý lịch khám",
        to: routes.MANAGE_SCHEDULE,
        icon: <Avatar />,
    },
];
export const managerMenu = [
    {
        title: "Quản lý người dùng",
        to: routes.MANAGE_USER,
        icon: <Avatar />,
    },
    {
        title: "Quản lý bài viết",
        to: routes.MANAGE_ARTICLE,
        icon: <Avatar />,
    },
];

import React from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "../../Components/Container";
import { Avatar, Button, ListItemIcon, Menu, MenuItem } from "@mui/material";
import AccountMenu from "./AccountMenu";
import { Logout, Person } from "@mui/icons-material";
import userService from "../../service/userService";
import { routes } from "../../constants";
import images from "../../public/image";

// import "./Header.scss";

const cx = classNames.bind(styles);

const menu = [
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
        title: "quản lý người dùng",
        to: routes.MANAGE_USER,
        icon: (
            <ListItemIcon>
                <Person fontSize="small" />
            </ListItemIcon>
        ),
    },
];
export default function Header() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        userService.logout();
        navigate("/login");
    };
    return (
        <header className={cx("wrapper")}>
            <Container>
                <div className={cx("inner")}>
                    <Link to={routes.HOME} className={cx("logo")}>
                        <img src={images.logo} alt="" />
                    </Link>
                    <nav className={cx("navbar")}>
                        <ul className={cx("menu-list")}>
                            <li>
                                <NavLink to="/">Trang chủ</NavLink>
                            </li>
                            <li>
                                <NavLink to="/">giới thiệu</NavLink>
                            </li>
                            <li>
                                <NavLink to="/">đặt lịch</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className={cx("auth")}>
                        <AccountMenu onLogOut={handleLogout} menuList={menu} userName={"Tai"} />
                    </div>
                </div>
            </Container>
        </header>
    );
}

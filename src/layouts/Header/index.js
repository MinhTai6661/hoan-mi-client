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
import { images } from "../../public/image";
import { localService } from "../../service/localService";
import commons from "../../untils/commons";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../redux/authSlice";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { role } from "../../constants";
import * as menuRole from "./../menuRoles";

// import "./Header.scss";

const cx = classNames.bind(styles);

export default function Header() {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, []);
    useEffect(() => {
        if (currentUser.roleId === role.DOCTOR) {
            setMenu(menuRole.doctorMenu);
            return;
        }
        if (currentUser.roleId === role.MANANGER) {
            setMenu(menuRole.managerMenu);
            return;
        }
        if (currentUser.roleId === role.PATIENT) {
            setMenu(menuRole.patientMenu);
        }
    }, [currentUser]);
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
                        <AccountMenu
                            onLogOut={handleLogout}
                            menuList={menu}
                            userName={currentUser?.lastName || ""}
                            avatar={commons.toBase64(currentUser?.image || "")}
                            currentUser={currentUser || ""}
                        />
                    </div>
                </div>
            </Container>
        </header>
    );
}

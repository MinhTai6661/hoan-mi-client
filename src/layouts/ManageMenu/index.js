import React from "react";
import classNames from "classnames/bind";
import styles from "./ManageMenu.module.scss";
import { NavLink } from "react-router-dom";
import { role, routes } from "../../constants";
import Container from "../../Components/Container";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import * as manageMenuRoles from "./manageMenuRoles";

const cx = classNames.bind(styles);
export default function ManageMenu() {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        if (currentUser.roleId === role.DOCTOR) {
            setMenu(manageMenuRoles.doctorMenu);
            return;
        }
        if (currentUser.roleId === role.MANANGER) {
            setMenu(manageMenuRoles.managerMenu);
            return;
        }
    }, [currentUser]);
    return (
        <div className={cx("wrapper")}>
            <Container>
                <ul className={cx("list")}>
                    {menu &&
                        menu.length > 0 &&
                        menu.map((item) => (
                            <li className={cx("item")}>
                                <NavLink
                                    className={(nav) => cx("link", { active: nav.isActive })}
                                    to={item.to}
                                >
                                    {item.title}
                                </NavLink>
                            </li>
                        ))}

                    {/* <li className={cx("item")}>
                        <NavLink
                            className={(nav) => cx("link", { active: nav.isActive })}
                            to={routes.MANAGE_ARTICLE}
                        >
                            Bài viết
                        </NavLink>
                    </li> */}
                </ul>
            </Container>
        </div>
    );
}

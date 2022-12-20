import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { role } from "../../constants";
import route from "../../constants/Route";
import ManageMenu from "../../layouts/ManageMenu";

export default function ManagePage() {
    const currentRole = useSelector((state) => state.auth.currentUser.roleId);
    const navigate = useNavigate();

    useEffect(() => {
        // if ((currentRole && currentRole === role.DOCTOR) || currentRole === role.MANANGER) {
        //     console.log("hello");
        // } else {
        //     navigate(route.HOME);
        //     toast.error("không có quyền truy cập");
        // }
    }, []);
    return (
        <div>
            <ManageMenu />
            <Outlet />
        </div>
    );
}

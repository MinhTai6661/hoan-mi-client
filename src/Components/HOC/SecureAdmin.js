import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { localService } from "../../service/localService";

export default function SecureAdmin({ children }) {
    const navigae = useNavigate();
    useEffect(() => {
        const userLogin = localService.user.get();
        console.log("useEffect  userLogin.roleId ", typeof userLogin.roleId);
        if (userLogin.roleId !== "R1") {
            navigae("/");
        }
    }, []);

    return <>{children}</>;
}

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { localService } from "../../service/localService";

export default function SecurePatient({ children }) {
    const navigae = useNavigate();
    useEffect(() => {
        const userLogin = localService.user.get();
        if (userLogin.roleId !== "R2") {
            navigae("/");
        }
    }, []);

    return <>{children}</>;
}

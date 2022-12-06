import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { localService } from "../../service/localService";

export default function Secure({ children }) {
    const navigae = useNavigate();
    useEffect(() => {
        const isLoggin = localService.user.get();
        if (!isLoggin) {
            navigae("/login");
        }
    }, []);

    return <>{children}</>;
}

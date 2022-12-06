import React, { useState } from "react";
import userService from "../../service/userService";
import LoginForm from "./form";
import { localService } from "../../service/localService";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const handleLogin = (data) => {
        const login = async () => {
            const res = await userService.login(data);
            if (res.data.errorCode !== 0) {
                setError(res.data.errorMessage);
            } else {
                console.log("ok");
                await localService.user.set(res.data.user);
                navigate("/");
            }
        };
        login();
    };
    return (
        <>
            <LoginForm submit={handleLogin} errorMess={error} />
    
        </>
    );
}

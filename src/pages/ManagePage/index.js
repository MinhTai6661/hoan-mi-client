import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../../Components/Container";
import SecureAdmin from "../../Components/HOC/SecureAdmin";
import Secure from "../../Components/HOC/SecureAdmin";
import SecurePatient from "../../Components/HOC/SecurePatient";
import { role, routes } from "../../constants";
import route from "../../constants/Route";
import ManageMenu from "../../layouts/ManageMenu";
import { localService } from "../../service/localService";
import ManageArticle from "../ManageArticle";
import ManagePatient from "../ManagePatient";
import ManageSchedulesPage from "../ManageSchedulePage";
import ManageSpecialties from "../ManageSpecialties";
import ManageSpecialty from "../ManageSpecialty";
import ManageUser from "../ManageUser";

export default function ManagePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const userLogin = localService.user.get();
        console.log("useEffect  userLogin", userLogin);
        if (userLogin.roleId === "R1") {
            navigate(route.MANAGE_USER);
            return;
        }
        if (userLogin.roleId === "R2") {
            navigate(route.MANAGE_PATIENT);
            return;
        }
    }, []);
    return (
        <>
            <ManageMenu />
            <Container>
                <Routes>
                    <Route
                        index
                        path={routes.MANAGE_USER}
                        element={
                            <SecureAdmin>
                                <ManageUser />
                            </SecureAdmin>
                        }
                    />
                    <Route
                        path={routes.MANAGE_ARTICLE}
                        element={
                            <SecureAdmin>
                                <ManageArticle />
                            </SecureAdmin>
                        }
                    />
                    <Route
                        path={routes.MANAGE_SCHEDULE}
                        element={
                            <SecureAdmin>
                                <ManageSchedulesPage />
                            </SecureAdmin>
                        }
                    />
                    <Route
                        path={routes.MANAGE_SPECIALTY}
                        element={
                            <SecureAdmin>
                                {/* <ManageSpecialty /> */}
                                <ManageSpecialties />
                            </SecureAdmin>
                        }
                    />

                    <Route
                        path={routes.MANAGE_PATIENT}
                        element={
                            <SecurePatient>
                                <ManagePatient />
                            </SecurePatient>
                        }
                    />
                </Routes>
            </Container>
        </>
    );
}

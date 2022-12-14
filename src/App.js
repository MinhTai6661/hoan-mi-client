import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DefaultLayout from "./layouts/DefaultLayout";
import LoginPage from "./pages/LoginPage";
import Secure from "./Components/HOC/Secure";
import ManageUser from "./pages/ManageUser";
import { routes } from "./constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ManageArticle from "./pages/ManageArticle";
import { ToastContainer } from "react-toastify";
import DoctorDetail from "./pages/DoctorDetail";
import ManagePage from "./pages/ManagePage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllDoctor, fetchAllSchedules, fetchTopDoctor } from "./redux/doctorSlice";
import {
    fetchAllGender,
    fetchAllPosition,
    fetchAllRole,
    fetchAllUser,
} from "./redux/ManageUserSlice";
import ManageSchedulesPage from "./pages/ManageSchedulePage";
import VerifyAppoiment from "./pages/VerifyAppointment";
import ManageSpecialty from "./pages/ManageSpecialty";
import SpecialtyDetail from "./pages/SpecialtyDetail";
import ManagePatient from "./pages/ManagePatient";
import { fetchAllSpecialties } from "./redux/manageSpecialtySlice";
import BookingPage from "./pages/BookingPage";
import IntroducePage from "./pages/IntroducePage";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTopDoctor(10));
        dispatch(fetchAllGender());
        dispatch(fetchAllPosition());
        dispatch(fetchAllRole());
        dispatch(fetchAllUser());
        dispatch(fetchAllDoctor());
        dispatch(fetchAllSchedules());
        dispatch(fetchAllSpecialties());
        //
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <Routes>
                {/* normal pages */}
                <Route element={<DefaultLayout />}>
                    <Route path={routes.HOME} element={<HomePage />} />
                    <Route path={`${routes.DOCTOR_DETAIL}/:id`} element={<DoctorDetail />} />
                    <Route path={`${routes.SPECIALTY_DETAIL}/:id`} element={<SpecialtyDetail />} />
                    <Route path={routes.BOOKING} element={<BookingPage />} />
                    <Route path={routes.VERIFY_APPOINTMENT} element={<VerifyAppoiment />} />
                    <Route path={routes.INTRODUCE} element={<IntroducePage />} />

                    {/* manage pages */}
                    <Route
                        path={`${routes.MANAGE}/*`}
                        element={
                            <Secure>
                                <ManagePage />
                            </Secure>
                        }
                    />
                    {/* <Route
                        path={routes.MANAGE_DOCTOR}
                        element={
                            <Secure>
                                <ManagePage />
                            </Secure>
                        }
                    /> */}
                </Route>
                {/* //login */}
                <Route path={routes.LOGIN} element={<LoginPage />} />
            </Routes>
        </>
    );
}

export default App;

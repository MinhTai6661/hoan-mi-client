import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DefaultLayout from "./layouts/DefaultLayout";
import LoginPage from "./pages/LoginPage";
import Secure from "./Components/HOC/Secure";
import ManageUser from "./pages/ManageUser";
import { routes } from "./constants";
import { useEffect } from "react";
import userService from "./service/userService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ManageArticle from "./pages/ManageArticle";
import { ToastContainer } from "react-toastify";
function App() {
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
                <Route element={<DefaultLayout />}>
                    <Route path={routes.HOME} element={<HomePage />}></Route>
                    <Route
                        path={routes.MANAGE_USER}
                        element={
                            <Secure>
                                <ManageUser />
                            </Secure>
                        }
                    ></Route>
                    <Route path={routes.MANAGE_ARTICLE} element={<ManageArticle />}></Route>
                </Route>
                <Route path={routes.LOGIN} element={<LoginPage />} />
            </Routes>
        </>
    );
}

export default App;

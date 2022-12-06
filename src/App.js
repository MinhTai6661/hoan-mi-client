import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DefaultLayout from "./layouts/DefaultLayout";
import LoginPage from "./pages/LoginPage";
import Secure from "./Components/HOC/Secure";
import ManageUser from "./pages/ManageUser";
import { routes } from "./constants";
function App() {
    return (
        <Routes>
            <Route
                element={
                    <Secure>
                        <DefaultLayout />
                    </Secure>
                }
            >
                <Route path={routes.HOME} element={<HomePage />}></Route>
                <Route
                    path={routes.MANAGE_USER}
                    element={<ManageUser />}
                ></Route>
            </Route>
            <Route path={routes.LOGIN} element={<LoginPage />} />
        </Routes>
    );
}

export default App;

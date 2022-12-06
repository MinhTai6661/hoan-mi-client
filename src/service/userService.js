import axios from "axios";
import axiosClient from "./axiosClient";
import { localService } from "./localService";

const userService = {
    getUser: (param) => {
        const path = "/get-all-user";
        return axiosClient.get(path, { params: { id: param } });
    },
    createNewUser: {},
    login: (user) => {
        console.log("user", user);
        const path = "/login";
        return axiosClient.post(path, user);
    },
    logout: () => {
        console.log("hi");
        localService.user.remove();
    },
    addUser: (user) => {
        const path = "/create-new-user";
        return axiosClient.post(path, user);
    },
    deleteUser: (id) => {
        const path = "/delete-user";
        return axiosClient.delete(path, {
            data: {
                id: id,
            },
        });
    },
    editUser: (user) => {
        const path = "/edit-user";
        return axiosClient.put(path, user);
    },
    getAllCodeService: (type) => {
        const path = "/all-code";
        return axiosClient.get(path, { params: { type: type } });
    },
};

export default userService;

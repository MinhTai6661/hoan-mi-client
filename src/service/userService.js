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
        const path = "/login";
        return axiosClient.post(path, user);
    },
    logout: () => {
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
    getTopDoctor: (limit) => {
        const path = "/top-doctor-home";
        return axiosClient.get(path, { params: { limit: limit } });
    },
    getAllDoctors: () => {
        const path = "/get-all-doctors";
        return axiosClient.get(path);
    },
    getDoctor: (id) => {
        const path = "/get-doctor-detail";
        return axiosClient.get(path, { params: { id: id } });
    },
    createDoctorDetail: (data) => {
        const path = "/create-doctor-detail";
        return axiosClient.post(path, {
            contentMarkDown: data.contentMarkDown,
            description: data.description,
            contentHTML: data.contentHTML,
            doctorId: data.doctor,
        });
    },
    editDoctorArticle: (data) => {
        const path = "/update-doctor";

        return axiosClient.put(path, {
            doctorId: data.doctor,
            contentHTML: data.contentHTML,
            contentMarkDown: data.contentMarkDown,
            description: data.description,
        });
    },
    createDoctorSchedule: (data) => {
        const path = "/create-doctor-schedule";
        return axiosClient.post(path, data);
    },
    getSchedulesList: (doctorId, date) => {
        const path = "/get-doctor-schedules";
        return axiosClient.get(path, { params: { doctorId, date } });
    },
};

export default userService;

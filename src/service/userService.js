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
            specialty: data.specialty,
        });
    },
    editDoctorArticle: (data) => {
        const path = "/update-doctor";

        return axiosClient.put(path, {
            doctorId: data.doctor,
            contentHTML: data.contentHTML,
            contentMarkDown: data.contentMarkDown,
            description: data.description,
            specialty: data.specialty,
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
    createSApoiment: (req) => {
        const path = "/create-apoinment";
        return axiosClient.post(path, req);
    },
    verifyAppointment: ({ doctorId, token }) => {
        const path = "/verify-appoiment";
        return axiosClient.post(path, { doctorId, token });
    },
    createSpecialty: (data) => {
        const path = "/create-specialty";
        return axiosClient.post(path, {
            descriptionMarkDown: data.descriptionMarkDown,
            descriptionHTML: data.descriptionHTML,
            image: data.image,
            name: data.name,
        });
    },
    getSpecialties: (params) => {
        const path = "/get-specialties";
        return axiosClient.get(path, { params });
    },
    getDotorsBySpecialtyId: (specialtyId) => {
        const path = "/get-doctors-by-specialty";
        return axiosClient.get(path, { params: { specialtyId } });
    },
    getSpecialtyDetail: (specialtyId) => {
        const path = "/get-specialty-detail";
        return axiosClient.get(path, { params: { specialtyId: specialtyId } });
    },
    getPatientBookings: (params) => {
        const path = "/get-patient-by-doctor";
        const { doctorId, date } = params;
        return axiosClient.get(path, { params: { doctorId: doctorId, date: date } });
    },
    confirmScheduleById: (bookingId) => {
        const path = "/confirm-schedule";
        console.log("bookingId", bookingId);
        return axiosClient.post(path, { bookingId: bookingId });
    },
    updateSpecialty: (newData) => {
        const path = "/update-speialty";
        return axiosClient.put(path, {
            id: newData.id,
            name: newData.name,
            descriptionHTML: newData.descriptionHTML,
            descriptionMarkDown: newData.descriptionMarkDown,
            image: newData.image,
        });
    },
    deleteSpecialty: (id) => {
        const path = `/delete-specialty/${id}`;
        return axiosClient.delete(path);
    },
};

export default userService;

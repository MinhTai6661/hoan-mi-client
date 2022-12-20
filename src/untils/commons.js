import { Buffer } from "buffer";
import moment from "moment";
import { format } from "../constants";

const commons = {
    getBase64: (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    },
    toBase64: (buffer) => {
        const url = new Buffer(buffer, "base64").toString("binary");
        return url;
    },
    toUnix: (time) => {
        return new Date(moment(time).format(format.time.TO_SERVER)).getTime();
    },
    toHumanDate: (time) => {
        return new Date(moment(time).format(format.time.TO_SERVER));
    },
    renderListGendersDropDown: (list, lang = "vi") => {
        return (
            list &&
            list.map((item) => {
                return {
                    label: lang === "vi" ? item.valueVi : item.valueChina,
                    value: item.keyMap,
                };
            })
        );
    },
    renderListDoctorsDropDown: (list, lang = "vi") => {
        return (
            list &&
            list.map((item) => {
                const fullName = item.lastName + " " + item.firstName;
                return { value: +item.id, label: fullName };
            })
        );
    },
};

export default commons;

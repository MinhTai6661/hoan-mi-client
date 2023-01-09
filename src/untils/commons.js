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
    toHumanDate: (time, lang = "vi") => {
        return moment(time).locale("vi").format("dddd - DD/MM/YYYY");
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
    renderListSpecialtiesDropDown: (list, lang = "vi") => {
        return (
            list &&
            list.map((item) => {
                return { value: +item.id, label: item.name };
            })
        );
    },
    removeAccents(str) {
        var AccentsMap = [
            "aàảãáạăằẳẵắặâầẩẫấậ",
            "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
            "dđ",
            "DĐ",
            "eèẻẽéẹêềểễếệ",
            "EÈẺẼÉẸÊỀỂỄẾỆ",
            "iìỉĩíị",
            "IÌỈĨÍỊ",
            "oòỏõóọôồổỗốộơờởỡớợ",
            "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
            "uùủũúụưừửữứự",
            "UÙỦŨÚỤƯỪỬỮỨỰ",
            "yỳỷỹýỵ",
            "YỲỶỸÝỴ",
        ];
        for (var i = 0; i < AccentsMap.length; i++) {
            var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
            var char = AccentsMap[i][0];
            str = str.replace(re, char);
        }
        return str;
    },
};

export default commons;

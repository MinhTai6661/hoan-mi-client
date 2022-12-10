import { Buffer } from "buffer";

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
};

export default commons;

import React, { useEffect } from "react";
import styles from "./VerifyAppoiment.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import allCodes from "../../constants/allCodes";
import userService from "../../service/userService";
import { images } from "../../public/image";
const cx = classNames.bind(styles);

export default function VerifyAppoiment() {
    const [isVerifySuccess, setIsVerifySuccess] = useState(false);
    const [errorCode, setErrorCode] = useState(null);
    console.log("VerifyAppoiment  errorCode", errorCode);

    useEffect(() => {
        (async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const doctorId = urlParams.get("doctorId");
            const token = urlParams.get("token");
            console.log("useeffect  errorCode", errorCode);
            if (errorCode === 0) {
                console.log("==================0", errorCode);
                return;
            }

            const res = await userService.verifyAppointment({
                //problem: call 2 times here
                token,
                doctorId,
            });
            console.log("res", res.data);

            // setIsVerifySuccess(false);

            setErrorCode(+res.data.errorCode);
        })();
    }, []);

    return (
        <div className={cx("wrapper")}>
            <h2 className={cx("message")}>
                {errorCode === 2 && (
                    <div>
                        Lich hẹn không tồn tại
                        <div>
                            <img src={images.error} alt="" />
                        </div>
                    </div>
                )}
                {errorCode === 3 && (
                    <div>
                        Lịch hẹn đã được xác nhận trước đó
                        <div>
                            <img src={images.error} alt="" />
                        </div>
                    </div>
                )}
                {errorCode === 0 && (
                    <div>
                        Xác nhận lịch hẹn thành công ! Chúc bạn thật nhiều sức khoẻ.
                        <img src={images.success} alt="" />
                    </div>
                )}
            </h2>
        </div>
    );
}

import React, { useEffect } from "react";
import styles from "./VerifyAppoiment.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import allCodes from "../../constants/allCodes";
import userService from "../../service/userService";
import { images } from "../../public/image";
const cx = classNames.bind(styles);

export default function VerifyAppoiment() {
    const { S1, S2, S3 } = allCodes.statusBooking;
    const [isVerifySuccess, setIsVerifySuccess] = useState(S1);
    const [errorCode, setErrorCode] = useState(S1);

    useEffect(() => {
        (async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const doctorId = urlParams.get("doctorId");
            const token = urlParams.get("token");
            const res = await userService.verifyAppointment({
                token,
                doctorId,
            });
            console.log("res", res);
            if (res.data.errorCode !== 0) {
                setIsVerifySuccess(false);
                setErrorCode(+res.data.errorCode);
                return;
            }
            setIsVerifySuccess(true);
            setErrorCode(res.data.errorCode);
        })();
    }, []);

    return (
        <div className={cx("wrapper")}>
            {/* <h1 className={cx("message-main")}>
                {isVerifySuccess
                    ? " Xác nhận lịch hẹn thành công "
                    : " Xác nhận lịch hẹn không thành công "}{" "}
            </h1> */}
            <h2 className={cx("message")}>
                {errorCode === 2 && (
                    <div>
                        {" "}
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

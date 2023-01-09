import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Carousel from "../../Components/Carousel";
import route from "../../constants/Route";
import classNames from "classnames/bind";
import styles from "./OutstandingDoctor.module.scss";
import { commons } from "../../untils";

const cx = classNames.bind(styles);

function OutStandingDoctorItem({ item, onClick }) {
    const fullName = item?.firstName + item?.lastName;
    const position = item?.positionData?.valueVi;
    const url = commons.toBase64(item?.image);
    return (
        <div className={cx("item")} onClick={onClick}>
            <div className={cx("inner")}>
                <div className={cx("avatar")}>
                    <img src={url} alt="" />
                </div>
                <span className={cx("info")}>
                    {position} {fullName}
                </span>
                <span className={cx("specialty")}>Nội tổng hợp</span>
            </div>
        </div>
    );
}
export default function OutstandingDoctor() {
    const topDoctor = useSelector((state) => state.manageDoctor.topDoctorList);
    const navigate = useNavigate();
    const handleClickItem = (value) => {
        navigate(route.DOCTOR_DETAIL + "/" + value.id);
    };
    return (
        <div className={cx("wrapper")}>
            <h2 className={` title-primary  } `}>Bác sĩ nổi bật</h2>
            <Carousel list={topDoctor} onClick={handleClickItem}>
                {topDoctor &&
                    topDoctor.length &&
                    topDoctor.map((item, index) => (
                        <OutStandingDoctorItem
                            item={item}
                            onClick={() => handleClickItem(item)}
                            key={item.id}
                        />
                    ))}
            </Carousel>
        </div>
    );
}

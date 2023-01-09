import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Carousel from "../../Components/Carousel";
import route from "../../constants/Route";
import userService from "../../service/userService";
import classNames from "classnames/bind";
import styles from "./Specialties.module.scss";
import SpecialtyItem from "./SpecialtyItem";
const cx = classNames.bind(styles);

export default function Specialties() {
    const [specialtiesList, setSpecialtiesList] = useState([]);
    useEffect(() => {
        (async () => {
            const res = await userService.getSpecialties();
            if (res.data.errorCode !== 0) {
                toast.warning("có lỗi xảy ra");
                return;
            }
            setSpecialtiesList(res.data.data);
        })();
    }, []);

    const navigate = useNavigate();
    const handleClickItem = (value) => {
        navigate(route.SPECIALTY_DETAIL + "/" + value.id);
    };

    return (
        <div className={cx("wrapper")}>
            <h2 className={`${cx("title")} title-primary`}>Các chuyên khoa của chúng tôi</h2>
            <Carousel list={specialtiesList} onClick={handleClickItem}>
                {specialtiesList &&
                    specialtiesList.length &&
                    specialtiesList.map((item, index) => (
                        <SpecialtyItem item={item} key={item.id} onClick={handleClickItem} />
                    ))}
            </Carousel>
        </div>
    );
}

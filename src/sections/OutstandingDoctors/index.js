import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Carousel from "../../Components/Carousel";
import route from "../../constants/Route";

export default function OutstandingDoctor() {
    const topDoctor = useSelector((state) => state.manageDoctor.topDoctorList);
    const navigate = useNavigate();
    const handleClickItem = (value) => {
        navigate(route.DOCTOR_DETAIL + "/" + value.id);
    };
    return (
        <div>
            <h2 className={` title-primary  } `}>Bác sĩ nổi bật</h2>
            <Carousel list={topDoctor} onClick={handleClickItem} />
        </div>
    );
}

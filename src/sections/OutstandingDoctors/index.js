import React from "react";
import { useSelector } from "react-redux";
import Carousel from "../../Components/Carousel";

export default function OutstandingDoctor() {
    const topDoctor = useSelector((state) => state.manageDoctor.topDoctorList);
    console.log("HomePage  topDoctor", topDoctor);
    return (
        <div>
            {/* <h2 className={` title-primary ${cx("heading")} `}>Bác sĩ nổi bật</h2> */}

            <Carousel list={topDoctor} />
        </div>
    );
}

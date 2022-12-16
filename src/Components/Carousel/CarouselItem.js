import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Carousel.module.scss";
import { images } from "../../public/image";
import { commons } from "../../untils";

const cx = classNames.bind(styles);
function CarouselItem({ item, onClick }) {
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

CarouselItem.propTypes = {};

export default CarouselItem;

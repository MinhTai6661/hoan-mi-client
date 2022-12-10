import React, { useRef } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import classNames from "classnames/bind";
import styles from "./Carousel.module.scss";
import CarouselItem from "./CarouselItem";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
const cx = classNames.bind(styles);
function Carousel({ list }) {
    const carouselRef = useRef(null);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: list.length < 5 ? list.length : 5,
        slidesToScroll: 1,
        // autoplay: true,
        // speed: 3000,
        // autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    speed: 2000,
                    autoplaySpeed: 3000,
                },
            },
        ],
    };
    return (
        <div className={cx("wrapper")}>
            <span
                className={cx("btn-prev")}
                onClick={() => {
                    carouselRef.current.slickPrev();
                }}
            >
                <ArrowBackIosOutlinedIcon className={cx("icon")} />
            </span>
            <Slider {...settings} ref={carouselRef}>
                {list && list.length > 0 && list.map((item) => <CarouselItem item={item} />)}
            </Slider>
            <span
                className={cx("btn-next")}
                onClick={() => {
                    carouselRef.current.slickNext();
                }}
            >
                <ArrowForwardIosOutlinedIcon className={cx("icon")} />
            </span>
        </div>
    );
}

Carousel.propTypes = {};

export default Carousel;

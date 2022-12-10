import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./SpecialList.module.scss";
import { Link } from "react-router-dom";
import { icons } from "../../public/image";
import Container from "../../Components/Container";

const cx = classNames.bind(styles);
function SpecialList(props) {
    return (
        <div className={cx("wrapper")}>
            <h2 className={`${cx("heading")} title-primary`}>Các Chuyên khoa của Chúng tôi</h2>
            <Container>
                <ul className={cx("special-list")}>
                    <li>
                        <Link className={cx("link")} to={"/"}>
                            <span className={cx("icon")}>
                                <img src={icons.orthopedics} alt="" />
                            </span>
                            <span className={cx("title")}>tim mạch</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={cx("link")} to={"/"}>
                            <span className={cx("icon")}>
                                <img src={icons.orthopedics} alt="" />
                            </span>
                            <span className={cx("title")}>nội tổng quát</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={cx("link")} to={"/"}>
                            <span className={cx("icon")}>
                                <img src={icons.orthopedics} alt="" />
                            </span>
                            <span className={cx("title")}>sản phụ</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={cx("link")} to={"/"}>
                            <span className={cx("icon")}>
                                <img src={icons.orthopedics} alt="" />
                            </span>
                            <span className={cx("title")}>tiêu hoá</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={cx("link")} to={"/"}>
                            <span className={cx("icon")}>
                                <img src={icons.orthopedics} alt="" />
                            </span>
                            <span className={cx("title")}>Chỉnh hình</span>
                        </Link>
                    </li>
                </ul>
            </Container>
        </div>
    );
}

SpecialList.propTypes = {};

export default SpecialList;

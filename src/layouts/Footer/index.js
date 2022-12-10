import React from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import Container from "../../Components/Container";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { images } from "../../public/image";

const cx = classNames.bind(styles);
export default function Footer() {
    return (
        <div className={cx("wrapper")}>
            <Container>
                <div className={cx("top")}>
                    <Grid container>
                        <Grid item xs={12} md={4}>
                            <div className={cx("info")}>
                                <h3 className={cx("name")}>Tập đoàn y khoa hoàn mĩ</h3>
                                <span className={cx("location")}>Thủ dầu một, bình dương</span>
                                <span className={cx("phone")}> (028) 3820 6001</span>
                                <span className={cx("email")}> contactus@hoanmy.com</span>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <ul className={cx("footer-list")}>
                                <li>
                                    <Link to="/">GIỚI THIỆU VỀ CHÚNG TÔI</Link>
                                </li>
                                <li>
                                    <Link to="/">MẠNG LƯỚI</Link>
                                </li>
                                <li>
                                    <Link to={"/"}>CỘNG ĐỒNG</Link>
                                </li>
                                <li>
                                    <Link to={"/"}>ĐÀO TẠO & HUẤN LUYỆN</Link>
                                </li>
                                <li>
                                    <Link to={"/"}>NGHIÊN CỨU & CẢI TIẾN</Link>
                                </li>
                            </ul>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <ul className={cx("footer-list")}>
                                <li>
                                    <Link to={"/"}>GIỚI THIỆU VỀ CHÚNG TÔI</Link>
                                </li>
                                <li>
                                    <Link to={"/"}>MẠNG LƯỚI</Link>
                                </li>
                                <li>
                                    <Link to={"/"}>CỘNG ĐỒNG</Link>
                                </li>
                                <li>
                                    <Link to={"/"}>ĐÀO TẠO & HUẤN LUYỆN</Link>
                                </li>
                                <li>
                                    <Link to={"/"}>NGHIÊN CỨU & CẢI TIẾN</Link>
                                </li>
                            </ul>
                        </Grid>
                    </Grid>
                </div>
                <div className={cx("bottom")}>
                    <div className={cx("connect")}>
                        <h4>kết nối với chúng tôi</h4>
                        <div className={cx("social-list")}>
                            <span>
                                <YouTubeIcon />
                            </span>
                            <span>
                                <FacebookOutlinedIcon />
                            </span>
                        </div>
                        <span className={cx("hastag")}>#tantamchamsoc</span>
                    </div>
                    <div className={cx("logo")}>
                        <img src={images.logoFooter} alt="" />
                        <span>Copyright 2022 © Hoan My Corporation</span>
                    </div>
                </div>
            </Container>
        </div>
    );
}

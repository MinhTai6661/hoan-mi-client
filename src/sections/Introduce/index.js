import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Introduce.module.scss";
import Container from "../../Components/Container";
import { images } from "../../public/image";
import { Grid } from "@mui/material";
import Button from "../../Components/Button";

const cx = classNames.bind(styles);
function Introduce(props) {
    return (
        <div className={cx("wrapper")}>
            <Container>
                <Grid container spacing={4}>
                    <Grid item sx={12} lg={6}>
                        <div className={cx("img-wrapper")}>
                            <img src={images.introduce} alt="" />
                        </div>
                    </Grid>
                    <Grid item sx={12} lg={6}>
                        <div className={cx("description")}>
                            <h3 className={cx("heading")}>
                                Các bệnh viện và phòng khám của chúng tôi
                            </h3>
                            <p>
                                Hoàn Mỹ tự hào trong việc cung cấp dịch vụ chăm sóc hàng đầu với chi
                                phí hợp lý cho tất cả mọi người, với mạng lưới cơ sở rộng khắp trên
                                toàn lãnh thổ Việt Nam. Hệ thống chăm sóc sức khỏe của chúng tôi bao
                                gồm hơn 2.800 giường bệnh hoạt động trên khắp
                                <strong> 15 bệnh viện</strong> và
                                <stong>6 phòng khám.</stong>
                            </p>
                            <Button fill upperCase className={cx("btn")}>
                                {" "}
                                Xem thêm
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

Introduce.propTypes = {};

export default Introduce;

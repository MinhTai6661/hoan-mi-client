import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Reward.module.scss";
import { images } from "../../public/image";
import Button from "../../Components/Button";

const cx = classNames.bind(styles);
function Reward(props) {
    return (
        <div className={cx("wrapper")}>
            <ul className={cx("reward-list")}>
                <li className={cx("item")}>
                    <img src={images.rewarGold} alt="" />
                </li>
                <li className={cx("item")}>
                    <img src={images.rewardBest} alt="" />
                </li>
                <li className={cx("item")}>
                    <img src={images.rewardVn} alt="" />
                </li>
            </ul>
            <div className={cx("btn-list")}>
                <Button primary fill className={cx("btn")} big>
                    Đặt lịch khám
                </Button>
                <Button primary fill className={cx("btn")} big>
                    Lập kế hoạch thăm khám
                </Button>
            </div>
        </div>
    );
}

Reward.propTypes = {};

export default Reward;

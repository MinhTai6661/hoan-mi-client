import classNames from "classnames/bind";
import { useEffect } from "react";
import { commons } from "../../untils";
import styles from "./Specialties.module.scss";

const cx = classNames.bind(styles);

export default function SpecialtyItem({ item, onClick }) {
    // const fullName = item?.firstName + item?.lastName;
    const name = item?.name;
    const url = item?.image ? commons.toBase64(item?.image) : "";

    return (
        <div className={cx("item")} onClick={() => onClick(item)}>
            <div className={cx("inner")}>
                <div className={cx("thumbnail")}>
                    <img src={url} alt="" />
                </div>
                <span className={cx("name")}> {name}</span>
            </div>
        </div>
    );
}

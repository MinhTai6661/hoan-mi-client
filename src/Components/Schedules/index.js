import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./SchedulesList.module.scss";
import { useState } from "react";
import { useEffect } from "react";
const cx = classNames.bind(styles);

function Schedules({ allSchedules, onChange = () => {}, isMultiple }) {
    const [selectedSchedules, setSelectedSchedules] = useState([]);

    const handleSelectSchedule = (keyMap) => {
        if (isMultiple) {
            const isExist = selectedSchedules.includes(keyMap);
            if (isExist) {
                setSelectedSchedules(selectedSchedules.filter((item) => item !== keyMap));
            } else {
                setSelectedSchedules((prev) => [...prev, keyMap]);
            }
            return;
        }
        setSelectedSchedules((prev) => [keyMap]);
    };

    useEffect(() => {
        onChange(isMultiple ? selectedSchedules : selectedSchedules[0]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSchedules]);
    return (
        <div className={cx("schedules-list")}>
            {allSchedules &&
                allSchedules.length > 0 &&
                allSchedules.map((item) => (
                    <span
                        key={item.id}
                        className={cx("schedule-item", {
                            active: selectedSchedules.includes(item),
                        })}
                        onClick={() => handleSelectSchedule(item)}
                    >
                        {item.valueVi}
                    </span>
                ))}
        </div>
    );
}

Schedules.propTypes = {
    onChange: PropTypes.func,
    allSchedules: PropTypes.array.isRequired,
    isMultiple: PropTypes.bool,
};

export default Schedules;

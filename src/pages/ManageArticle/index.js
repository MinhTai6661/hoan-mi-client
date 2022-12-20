import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, TextareaAutosize } from "@mui/material";
import classNames from "classnames/bind";
import MarkdownIt from "markdown-it";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import * as yup from "yup";
import userService from "../../service/userService";
import { commons } from "../../untils";
import styles from "./ManageArticle.module.scss";

const cx = classNames.bind(styles);

const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
];

const schema = yup
    .object({
        doctor: yup.number().required("vui lòng chọn bác sĩ"),
        description: yup.string().required("vui lòng nhập trường này"),
    })
    .required();

export default function ManageArticle() {
    const dispatch = useDispatch();
    const allDoctors = useSelector((state) => state.manageDoctor.allDoctor);
    const [markDownText, setMarkDownText] = useState("");
    const [markDownHtml, setMarkDownHtml] = useState("");
    const [markDownError, setMarkDownError] = useState("");
    const [isAddMode, setIsAddMode] = useState(false);
    const [defaultValues, setDefaultValues] = useState({});
    const {
        control,
        register,
        setValue,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: defaultValues,
        resolver: yupResolver(schema),
    });
    // control._formValues.doctor = 6;
    const handleEditorChange = (value) => {
        setMarkDownText(value.text);
        setMarkDownHtml(value.html);
    };
    const renderOptions = (allDoctors) => {
        return allDoctors.map((item) => {
            const fullName = item.lastName + " " + item.firstName;
            return { value: +item.id, label: fullName };
        });
    };

    const onSubmit = async (data) => {
        if (!markDownText) {
            setMarkDownError("vui lòng nhập bài viết");
            return;
        }
        data.contentMarkDown = markDownText;
        data.contentHTML = markDownHtml;
        if (isAddMode) {
            const res = await userService.createDoctorDetail(data);
            if (res.data.errorCode === 0) {
                toast.success("Thêm bài viết thành công");
                setIsAddMode(false);
            } else {
                toast.error("Có lỗi xảy ra, không thể thêm bài viết");
            }
            return;
        }
        const res = await userService.editDoctorArticle(data);
        if (res.data.errorCode === 0) {
            toast.success("Sửa bài viết thành công");
        } else {
            toast.error("Có lỗi xảy ra, không thể sửa bài viết");
        }
        return;
    };
    const handleChangeDropdown = (doctorId, onChange) => {
        onChange(doctorId);

        (async () => {
            const res = await userService.getDoctor(doctorId);
            if (res.data.errorCode !== 0) {
                toast.error("có lỗi xảy ra");
                return;
            }
            if (res.data.data.MarkDown.id) {
                toast.info("bác sĩ đã có bài viết hãy sửa thông tin bài viết");

                setValue("description", res.data.data.MarkDown.description);
                setMarkDownText(res.data.data.MarkDown.contentMarkDown);
                setIsAddMode(false);
            } else {
                setIsAddMode(true);
                setValue("description", "");
                setMarkDownText("");
            }
        })();
    };
    return (
        <form className={cx("wrapper")} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
                <Grid item xs={12} lg={5}>
                    <label htmlFor="select-doctor">chọn bác sĩ</label>
                    <Controller
                        name="doctor"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <Select
                                options={commons.renderListDoctorsDropDown(allDoctors)}
                                id="select-doctor"
                                placeholder="chọn bác sĩ"
                                // {...field}

                                onChange={(e) => {
                                    handleChangeDropdown(e.value, onChange);
                                }}
                            />
                        )}
                    />
                    {errors.doctor && (
                        <span className="error-message">{errors.doctor.message}</span>
                    )}
                </Grid>

                <Grid item xs={12} lg={7}>
                    <label htmlFor="doctor-desciption">Mô tả</label>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextareaAutosize
                                id="doctor-desciption"
                                aria-label="minimum height"
                                minRows={3}
                                maxRows={5}
                                placeholder="Mô tả"
                                // style={{ width: 200 }}
                                className={cx("text-area")}
                                {...field}
                            />
                        )}
                    />

                    {errors.description && (
                        <span className="error-message">{errors.description.message}</span>
                    )}
                </Grid>

                <Grid item xs={12}>
                    <label htmlFor="select-doctor">Bài viết</label>

                    <MdEditor
                        style={{ height: "500px" }}
                        value={markDownText}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleEditorChange}
                        placeholder="Nhập bài viết bác sĩ ...."
                    />
                    {!markDownText && <span className="error-message">{markDownError}</span>}
                </Grid>
            </Grid>

            <Button
                type="submit"
                variant="contained"
                fullWidth
                color={!isAddMode ? "success" : "primary"}
            >
                {!isAddMode ? "Sửa" : "Thêm"} thông tin
            </Button>
        </form>
    );
}

import { Button, Grid, TextareaAutosize } from "@mui/material";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import styles from "./ManageArticle.module.scss";
import classNames from "classnames/bind";
import { useSelect } from "@mui/base";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDoctor } from "../../redux/doctorSlice";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { all } from "axios";
import userService from "../../service/userService";
import { toast } from "react-toastify";
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
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {},
        resolver: yupResolver(schema),
    });
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
    useEffect(() => {
        dispatch(fetchAllDoctor());
    }, []);
    const onSubmit = async (data) => {
        if (!markDownText) {
            setMarkDownError("vui lòng nhập bài viết");
            return;
        }
        data.contentMarkDown = markDownText;
        data.contentHTML = markDownHtml;
        console.log("onSubmit  data", data);

        const res = await userService.createDoctorDetail(data);
        console.log("onSubmit  res", res);
        if (res.data.errorCode === 0) {
            toast.success("Thêm bài viết thành công");
        } else {
            toast.error("Có lỗi xảy ra, không thể thêm bài viết");
        }
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
                                options={renderOptions(allDoctors)}
                                id="select-doctor"
                                // {...field}

                                onChange={(e) => {
                                    onChange(e.value);
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
                    />
                    {!markDownText && <span className="error-message">{markDownError}</span>}
                </Grid>
            </Grid>

            <Button type="submit" variant="contained" fullWidth>
                Thêm thông tin
            </Button>
        </form>
    );
}

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid } from "@mui/material";
import classNames from "classnames/bind";
import MarkdownIt from "markdown-it";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import ChooseImage from "../../Components/ChooseImage";
import InputFeild from "../../Components/InputField";
import userService from "../../service/userService";
import styles from "./ManageSpecialty.module.scss";

const cx = classNames.bind(styles);

const mdParser = new MarkdownIt(/* Markdown-it options */);

const schema = yup
    .object({
        name: yup.string().required("vui lòng nhập tên chuyên khoa"),
    })
    .required();

export default function ManageSpecialty() {
    const [markDownText, setMarkDownText] = useState("");
    const [markDownHtml, setMarkDownHtml] = useState("");
    console.log("ManageSpecialty  markDownHtml", markDownHtml);
    const [specialtyImage, setSpecialtyImage] = useState("");
    const [markDownError, setMarkDownError] = useState("");
    const [isAddMode, setIsAddMode] = useState(false);

    const [defaultValues, setDefaultValues] = useState({
        name: "",
        description: "",
    });
    const {
        control,
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

    const onSubmit = async (data) => {
        if (!markDownText) {
            setMarkDownError("vui lòng nhập bài viết");
            return;
        }

        data.descriptionMarkDown = markDownText;
        data.descriptionHTML = markDownHtml;
        data.image = specialtyImage;
        const res = await userService.createSpecialty(data);
        if (res.data.errorCode === 1) {
            toast.warning("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        if (res.data.errorCode === 2) {
            toast.warning("Chuyên khoa đã tồn tại");
            return;
        }
        if (res.data.errorCode === 3) {
            toast.warning("éo có lỗi");
            return;
        }
        toast.success("Thêm chuyên khoa thành công!");

        return;
    };

    const handleChangeImage = (imageRes) => {
        setSpecialtyImage(imageRes);
    };

    return (
        <form className={cx("wrapper")} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
                <Grid item xs={12} lg={5}>
                    <InputFeild
                        control={control}
                        errors={errors}
                        label="Tên chuyên khoa"
                        name="name"
                    />
                </Grid>

                <Grid item xs={12} lg={7}>
                    <ChooseImage onChange={handleChangeImage} image={specialtyImage} />
                </Grid>

                <Grid item xs={12}>
                    <label htmlFor="select-doctor">Bài viết</label>

                    <MdEditor
                        style={{ height: "500px" }}
                        value={markDownText}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleEditorChange}
                        placeholder="Nhập bài  viết ...."
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

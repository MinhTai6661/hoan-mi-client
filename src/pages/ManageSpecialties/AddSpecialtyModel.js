import React, { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Grid, Modal } from "@mui/material";
import classNames from "classnames/bind";
import MarkdownIt from "markdown-it";
import { useForm } from "react-hook-form";
import MdEditor from "react-markdown-editor-lite";
import * as yup from "yup";
import ChooseImage from "../../Components/ChooseImage";
import InputFeild from "../../Components/InputField";
import { commons } from "../../untils";
import styles from "./ManageSpecialties.module.scss";
import ModalWrapper from "../../Components/ModalWrapper";

const cx = classNames.bind(styles);
const mdParser = new MarkdownIt(/* Markdown-it options */);
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 900,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

function AddSpecialtyModel({
    open,
    onClose,
    onAddUser,
    addError,
    initialValue,
    isAddMode,
    onEditUser,
}) {
    const [isOpenLightBox, setIsOpenLightBox] = useState(false);
    const [markDownText, setMarkDownText] = useState(initialValue.descriptionMarkDown || "");
    const [markDownHtml, setMarkDownHtml] = useState(initialValue.descriptionHTML || "");
    const [specialtyImage, setSpecialtyImage] = useState("");
    console.log("specialtyImage", typeof specialtyImage);

    const schema = yup
        .object({
            name: yup.string().required("vui lòng nhập tên chuyên khoa"),
        })
        .required();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        data.image = specialtyImage;
        data.descriptionMarkDown = markDownText;
        data.descriptionHTML = markDownHtml;

        if (isAddMode) {
            onAddUser(data, reset);
        } else {
            onEditUser({ ...data, id: initialValue.id }, reset);
        }
    };

    const handleChangeImage = (imageRes) => {
        setSpecialtyImage(imageRes);
    };

    const handleEditorChange = (value) => {
        setMarkDownText(value.text);
        setMarkDownHtml(value.html);
    };

    useEffect(() => {
        const image = control._formValues.image;

        if (image) {
            const url = image;
            setSpecialtyImage(url);
        }
    }, []);

    return (
        <div>
            <ModalWrapper open={open} onClose={onClose}>
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
                            {!specialtyImage && (
                                <Alert sx={{ marginTop: 5 }} severity="error">
                                    Hãy chọn ảnh đại diện chuyên khoa
                                </Alert>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <label htmlFor="select-doctor">Bài viết</label>

                            <MdEditor
                                style={{ height: "500px" }}
                                value={markDownText || initialValue?.descriptionMarkDown}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={handleEditorChange}
                                placeholder="Nhập bài  viết ...."
                            />
                            {!markDownText && (
                                // <span className="error-message">{markDownError}</span>

                                <Alert sx={{ marginTop: 5 }} severity="error">
                                    Hãy nhập bài viết chuyên khoa
                                </Alert>
                            )}
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
            </ModalWrapper>
        </div>
    );
}

AddSpecialtyModel.propTypes = {};

export default AddSpecialtyModel;

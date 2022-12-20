import React, { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import {
    Alert,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
} from "@mui/material";
import Input from "@mui/material/Input";
import classNames from "classnames/bind";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { commons } from "../../untils";
import styles from "./AddModal.module.scss";

const cx = classNames.bind(styles);

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

function AdUserModal({
    open,
    onClose,
    onAddUser,
    addError,
    initialValue,
    isAddMode,
    onEditUser,
    genders,
    positions,
    roles,
}) {
    const [imagePreview, setImagePreview] = useState("");
    const [isOpenLightBox, setIsOpenLightBox] = useState(false);

    const schema = yup
        .object({
            firstName: yup.string().required("trường này là bắt buộc"),
            lastName: yup.string().required("trường này là bắt buộc"),
            email: yup
                .string()
                .email("bạn phải nhập đúng định dạng email")
                .required("trường này là bắt buộc"),
            password: isAddMode ? yup.string().required("trường này là bắt buộc") : yup.string(),
            address: yup.string().required("trường này là bắt buộc"),
            gender: yup.string().required("trường này là bắt buộc"),
            phoneNumber: yup
                .string()
                .matches(
                    /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                    "Vui lòng nhập đúng định dạng số điện thoại"
                )
                .required("trường này là bắt buộc"),
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
        data.image = imagePreview;
        if (isAddMode) {
            onAddUser(data, reset);
        } else {
            onEditUser({ ...data, id: initialValue.id }, reset);
        }
    };

    const handleChange = async (e, field) => {
        const file = e.target.files[0];

        if (file) {
            const url = await commons.getBase64(file);
            setImagePreview(url);
        }
    };

    useEffect(() => {
        const imageBuffer = control._formValues.image;

        if (imageBuffer) {
            const url = commons.toBase64(control._formValues.image);
            setImagePreview(url);
        }
    }, []);

    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    overFlow: "auto",
                }}
            >
                <div className={cx("wrapper")}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <div className={"input-field"}>
                                            <TextField
                                                disabled={!isAddMode}
                                                id="standard-basic"
                                                label="email"
                                                variant="standard"
                                                error={!!errors.email}
                                                helperText={errors.email && errors.email.message}
                                                {...field}
                                            />
                                        </div>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <div className={"input-field"}>
                                            <TextField
                                                disabled={!isAddMode}
                                                id="standard-basic"
                                                label="mật khẩu"
                                                variant="standard"
                                                error={!!errors.password}
                                                helperText={
                                                    errors.password && errors.password.message
                                                }
                                                {...field}
                                            />
                                        </div>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    render={({ field }) => (
                                        <div className={"input-field"}>
                                            <TextField
                                                id="standard-basic"
                                                label="Họ"
                                                variant="standard"
                                                error={!!errors.firstName}
                                                helperText={
                                                    errors.firsName && errors.firstName.message
                                                }
                                                {...field}
                                            />
                                        </div>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="lastName"
                                    control={control}
                                    render={({ field }) => (
                                        <div className={"input-field"}>
                                            <TextField
                                                id="standard-basic"
                                                label="Tên"
                                                variant="standard"
                                                error={!!errors.lastName}
                                                helperText={
                                                    errors.lastName && errors.lastName.message
                                                }
                                                {...field}
                                            />
                                        </div>
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="address"
                                    control={control}
                                    render={({ field }) => (
                                        <div className={"input-field"}>
                                            <TextField
                                                id="standard-basic"
                                                label="địa chỉ"
                                                variant="standard"
                                                error={!!errors.address}
                                                helperText={
                                                    errors.address && errors.address.message
                                                }
                                                {...field}
                                            />
                                        </div>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="phoneNumber"
                                    control={control}
                                    render={({ field }) => (
                                        <div className={"input-field"}>
                                            <TextField
                                                id="standard-basic"
                                                label="Số điện thoại"
                                                variant="standard"
                                                error={!!errors.phoneNumber}
                                                helperText={
                                                    errors.phoneNumber && errors.phoneNumber.message
                                                }
                                                {...field}
                                            />
                                        </div>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Controller
                                    name="gender"
                                    control={control}
                                    render={({ field }) => (
                                        <div className={"input-field"}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">
                                                    Giới tính
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Giới tính"
                                                    {...field}
                                                >
                                                    {genders &&
                                                        genders.length > 0 &&
                                                        genders.map((item, index) => (
                                                            <MenuItem
                                                                value={item.keyMap}
                                                                key={item.id}
                                                            >
                                                                {item.valueVi}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Controller
                                    name="positionId"
                                    control={control}
                                    render={({ field }) => (
                                        <div className={"input-field"}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">
                                                    Vị trí
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    // value={Chức vụ}
                                                    label="Vị trí"
                                                    {...field}
                                                    // defaultValue={1}
                                                >
                                                    {positions &&
                                                        positions.length > 0 &&
                                                        positions.map((item) => (
                                                            <MenuItem
                                                                value={item.keyMap}
                                                                key={item.id}
                                                            >
                                                                {item.valueVi}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Controller
                                    name="roleId"
                                    control={control}
                                    render={({ field }) => (
                                        <div className={"input-field"}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">
                                                    vai trò
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    // value={Chức vụ}
                                                    label="Vai trò"
                                                    {...field}
                                                    // defaultValue={1}
                                                >
                                                    {roles &&
                                                        roles.length > 0 &&
                                                        roles.map((item) => (
                                                            <MenuItem
                                                                value={item.keyMap}
                                                                key={item.id}
                                                            >
                                                                {item.valueVi}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Input sx={{ marginTop: 5 }} type="file" onChange={handleChange} />

                            {true && (
                                <div
                                    onClick={() => setIsOpenLightBox(true)}
                                    className={cx("preview-image")}
                                    style={{
                                        backgroundImage: `url('${imagePreview}')`,
                                    }}
                                ></div>
                            )}
                            <Modal open={isOpenLightBox} onClose={() => setIsOpenLightBox(false)}>
                                <img className={cx("light-box-image")} src={imagePreview} alt="" />
                            </Modal>
                        </Grid>
                        {addError && (
                            <Alert sx={{ marginTop: 5 }} severity="error">
                                {addError}
                            </Alert>
                        )}

                        <Button fullWidth variant="contained" type="submit" xs={{ marginTop: 5 }}>
                            {isAddMode ? "Thêm" : "Cập nhật "} người dùng
                        </Button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

AdUserModal.propTypes = {};

export default AdUserModal;

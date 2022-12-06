import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./LoginPage.module.scss";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import {
    TextField,
    Button,
    InputAdornment,
    IconButton,
    OutlinedInput,
    FormControl,
    InputLabel,
    Input,
    Alert,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import userService from "../../service/userService";
const cx = classNames.bind(styles);

const schema = yup
    .object({
        email: yup.string().email("bạn phải nhập đúng email").required("trường này là bắt buộc"),
        password: yup
            .string()

            .required("bạn phải nhập password"),
    })
    .required();
export default function LoginForm({ submit, errorMess }) {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        submit(data);
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <form onSubmit={handleSubmit(onSubmit)} className={cx("form-group")}>
                    <h2 className={cx("heading")}>Đăng nhập</h2>

                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <div className={cx("input-field")}>
                                <TextField
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
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <div className={cx("input-field")}>
                                <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">
                                        Password
                                    </InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={isShowPassword ? "text" : "password"}
                                        {...field}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => {
                                                        setIsShowPassword(!isShowPassword);
                                                    }}
                                                    //   onMouseDown={handleMouseDownPassword}
                                                >
                                                    {isShowPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </div>
                        )}
                    />
                    {errorMess && <Alert severity="error">{errorMess}</Alert>}
                    <Button className={cx("btn-submit")} type="submit" variant="outlined">
                        Đăng nhập
                    </Button>
                </form>
                <div className={cx("others")}>
                    <h3 className={cx("or")}>Hoặc đăng nhập với</h3>
                    <div className={cx("group-icon")}>
                        <span className={cx("fb")}>
                            <FacebookOutlinedIcon />
                        </span>
                        <span className={cx("gg")}>
                            {" "}
                            <GoogleIcon />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

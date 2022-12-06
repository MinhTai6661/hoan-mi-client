import {
    Alert,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import userService from "../../service/userService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AdUserModal from "./AdUserModal";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllGender,
    fetchAllPosition,
    fetchAllRole,
    fetchAllUser,
} from "../../redux/ManageUserSlice";
import utilities from "../../untils/utilities";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ManageUser() {
    const dispath = useDispatch();

    const genders = useSelector((state) => state.manageUser.genderList);
    const positions = useSelector((state) => state.manageUser.positionList);
    const roles = useSelector((state) => state.manageUser.roleList);
    const users = useSelector((state) => state.manageUser.userList);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");
    const [isAddMode, setIsAddMode] = useState(true);

    const initForm = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        phoneNumber: "",
        gender: genders[0]?.key,
        positionId: positions[0]?.key,
        roleId: roles[0]?.key,
        image: "",
    };
    const [initialValue, setInitialValue] = useState(initForm);
    useEffect(() => {
        dispath(fetchAllGender());
        dispath(fetchAllPosition());
        dispath(fetchAllRole());
        dispath(fetchAllUser());
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleShowModal = () => {
        setInitialValue(initForm);
        setShowModal(true);
        setIsAddMode(true);
    };

    const handleAddUser = async (data, reset) => {
        console.log("handleAddUser  data", data);
        const res = await userService.addUser(data);

        if (res.data.errorCode !== 0) {
            toast.warning("Email đã tồn tại");
        } else {
            toast.success("Thêm người dùng thành công");
            dispath(fetchAllUser());
            setShowModal(false);
            setIsAddMode(true);
            setError("");
            reset();
        }
    };
    const handleDeleteUser = async (id) => {
        const res = await userService.deleteUser(id);
        toast.success("xoá người dùng thành công");

        dispath(fetchAllUser());
    };
    const handleEditUser = async (data, reset) => {
        console.log("handleEditUser  data", data);
        const res = await userService.editUser(data);
        if (res.data.message.errorCode !== 0) {
            toast.error("Có lỗi xảy ra");
        } else {
            toast.success("cập nhật người dùng thành công");
            setShowModal(false);
            dispath(fetchAllUser());
            setIsAddMode(true);
        }
    };

    const handleClickEdit = async (id) => {
        const currentUser = await userService.getUser(id);
        console.log("handleClickEdit  currentUser.data", currentUser.data);
        if (currentUser.data.erorrCode !== 0) {
            toast.success("người dùng không tồn tại");
        } else {
            setInitialValue({ ...currentUser.data.users });
            setIsAddMode(false);
            setShowModal(true);
        }
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Button variant="contained" onClick={handleShowModal}>
                    Thêm người dùng
                </Button>{" "}
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                {showModal && (
                    <AdUserModal
                        open={showModal}
                        onClose={handleCloseModal}
                        onAddUser={handleAddUser}
                        addError={error}
                        isAddMode={isAddMode}
                        initialValue={initialValue}
                        onEditUser={handleEditUser}
                        genders={genders}
                        roles={roles}
                        positions={positions}
                    />
                )}
                <Table
                    sx={{ minWidth: 650, maxWidth: "100%", overflow: "auto" }}
                    aria-label="simple table"
                >
                    <TableHead>
                        <TableRow
                            sx={{
                                textTransform: "capitalize",
                            }}
                        >
                            <TableCell>STT</TableCell>
                            <TableCell>Họ Tên</TableCell>
                            <TableCell>email</TableCell>
                            <TableCell>địa chỉ</TableCell>
                            <TableCell>số điện thoại</TableCell>
                            <TableCell>Giới tính</TableCell>
                            <TableCell>chức vụ</TableCell>
                            <TableCell>Vai trò</TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users &&
                            users.length &&
                            users.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.firstName} {row.lastName}
                                    </TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.address}</TableCell>
                                    <TableCell>{row.phoneNumber}</TableCell>
                                    <TableCell>
                                        {utilities.getCodeById(genders, row.gender)}
                                    </TableCell>
                                    <TableCell>
                                        {utilities.getCodeById(roles, row.roleId)}
                                    </TableCell>
                                    <TableCell>
                                        {utilities.getCodeById(positions, row.positionId)}
                                    </TableCell>
                                    <TableCell>
                                        <EditIcon
                                            sx={{ cursor: "pointer" }}
                                            color="green"
                                            onClick={() => {
                                                handleClickEdit(row.id);
                                            }}
                                        />

                                        <DeleteForeverIcon
                                            sx={{ cursor: "pointer" }}
                                            color="red"
                                            onClick={() => handleDeleteUser(row.id)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
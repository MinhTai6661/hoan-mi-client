import {
    Alert,
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import userService from "../../service/userService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AdUserModal from "./AdUserModal";
import { useDispatch, useSelector } from "react-redux";
import {
    changeUserList,
    fetchAllGender,
    fetchAllPosition,
    fetchAllRole,
    fetchAllUser,
} from "../../redux/ManageUserSlice";
import utilities from "../../untils/utilities";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classNames from "classnames/bind";
import styles from "./AddModal.module.scss";
import Loading from "../../Components/Loading";
import { commons } from "../../untils";

const cx = classNames.bind(styles);

export default function ManageUser() {
    const dispath = useDispatch();

    const genders = useSelector((state) => state.manageUser.genderList);
    const positions = useSelector((state) => state.manageUser.positionList);
    const roles = useSelector((state) => state.manageUser.roleList);
    const users = useSelector((state) => state.manageUser.userList);
    const filterdUsers = useSelector((state) => state.manageUser.filterdUsers);
    const isLoading = useSelector((state) => state.manageUser.allUserLoading);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");
    const [isAddMode, setIsAddMode] = useState(true);
    const [inputValue, setInputValue] = useState("");

    const initForm = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        phoneNumber: "",
        gender: genders[0]?.keyMap,
        positionId: positions[0]?.keyMap,
        roleId: roles[0]?.keyMap,
        image: "",
    };
    const [initialValue, setInitialValue] = useState(initForm);

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleShowModal = () => {
        setInitialValue(initForm);
        setShowModal(true);
        setIsAddMode(true);
    };

    const handleAddUser = async (data, reset) => {
        const res = await userService.addUser(data);

        if (res.data.errorCode !== 0) {
            toast.warning("Email ???? t???n t???i");
        } else {
            toast.success("Th??m ng?????i d??ng th??nh c??ng");
            dispath(fetchAllUser());
            setShowModal(false);
            setIsAddMode(true);
            setError("");
            reset();
        }
    };
    const handleDeleteUser = async (id) => {
        const res = await userService.deleteUser(id);
        toast.success("xo?? ng?????i d??ng th??nh c??ng");

        dispath(fetchAllUser());
    };
    const handleEditUser = async (data, reset) => {
        const res = await userService.editUser(data);
        if (res.data.message.errorCode !== 0) {
            toast.error("C?? l???i x???y ra");
        } else {
            toast.success("c???p nh???t ng?????i d??ng th??nh c??ng");
            setShowModal(false);
            dispath(fetchAllUser());
            setIsAddMode(true);
        }
    };

    const handleClickEdit = async (id) => {
        const currentUser = await userService.getUser(id);
        if (currentUser.data.erorrCode !== 0) {
            toast.success("ng?????i d??ng kh??ng t???n t???i");
        } else {
            setInitialValue({ ...currentUser.data.users });
            setIsAddMode(false);
            setShowModal(true);
        }
    };

    const handleChangeInputValue = (e) => {
        let value = e.target.value;
        setInputValue(value);
    };
    const handleSearch = () => {
        const datacopy = [...users];
        const filteredUser = datacopy.filter((item) => {
            let fullName = item.firstName + item.lastName;
            fullName = commons.removeAccents(fullName.trim().toLowerCase());

            return fullName.includes(commons.removeAccents(inputValue.trim().toLowerCase()));
        });
        dispath(changeUserList(filteredUser));
    };

    return (
        <>
            <Button variant="contained" onClick={handleShowModal} sx={{ mb: 5 }}>
                Th??m ng?????i d??ng
            </Button>
            <Stack direction="row" spacing={2}>
                <div className={cx("search")} style={{ width: "100%", flex: 1 }}>
                    <TextField
                        label="T??m ki???m ng?????i d??ng"
                        placeholder="Nh???p t??n ng?????i d??ng"
                        value={inputValue}
                        onChange={handleChangeInputValue}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                    />
                </div>
                <Button sx={{ flexShrink: 0 }} variant="contained" onClick={handleSearch}>
                    T??m Ki???m
                </Button>
            </Stack>

            <TableContainer component={Paper}>
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
                    className={cx("list-user")}
                >
                    <TableHead>
                        <TableRow
                            sx={{
                                textTransform: "capitalize",
                            }}
                        >
                            <TableCell>STT</TableCell>
                            <TableCell>H??? T??n</TableCell>
                            <TableCell>email</TableCell>
                            <TableCell>?????a ch???</TableCell>
                            <TableCell>s??? ??i???n tho???i</TableCell>
                            <TableCell>Gi???i t??nh</TableCell>
                            <TableCell>V??? tr??</TableCell>
                            <TableCell>Vai tr??</TableCell>
                            <TableCell>Ch???c n??ng </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users &&
                            filterdUsers &&
                            users.length > 0 &&
                            (filterdUsers.length > 0 ? filterdUsers : users).map((row, index) => (
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
                                        {utilities.getCodeById(positions, row.positionId)}
                                    </TableCell>
                                    <TableCell>
                                        {utilities.getCodeById(roles, row.roleId)}
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
                {isLoading && <Loading />}
            </TableContainer>
        </>
    );
}

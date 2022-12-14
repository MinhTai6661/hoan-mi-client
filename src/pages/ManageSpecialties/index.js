import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import classNames from "classnames/bind";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "../../service/userService";
import styles from "./ManageSpecialties.module.scss";
import AddSpecialtyModel from "./AddSpecialtyModel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { commons } from "../../untils";
import { fetchAllSpecialties } from "../../redux/manageSpecialtySlice";
import { array } from "yup";
const cx = classNames.bind(styles);

export default function ManageSpecialties() {
    const dispath = useDispatch();

    const specialtiesList = useSelector((state) => state.manageSpecialty.specialtiesList);
    console.log("ManageSpecialties  specialtiesList", specialtiesList);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");
    const [isAddMode, setIsAddMode] = useState(true);

    const initForm = {
        name: "",
        descriptionHTML: "",
        descriptionMarkDown: "",
        image: "",
    };
    const [initialValue, setInitialValue] = useState(initForm);

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleAddmodalClick = () => {
        setInitialValue(initForm);
        setShowModal(true);
        setIsAddMode(true);
    };

    const handleAddSpecialty = async (data, reset) => {
        console.log("handleAddSpecialty  data", data);
        const res = await userService.createSpecialty({
            descriptionMarkDown: data.descriptionMarkDown,
            descriptionHTML: data.descriptionHTML,
            image: data.image,
            name: data.name,
        });

        if (res.data.errorCode !== 0) {
            toast.warning("c?? l???i x???y ra, kh??ng th??? th??m chuyen khoa m???i");
        } else {
            toast.success("Th??m chuy??n khoa th??nh c??ng");
            dispath(fetchAllSpecialties());
            setShowModal(false);
            setIsAddMode(true);
            setError("");
            reset();
        }
    };
    const handleDeleteSpecialty = async (id) => {
        const res = await userService.deleteSpecialty(id);
        console.log("handleDeleteSpecialty  res", res);
        if (res.data.errorCode !== 0) {
            toast.warning("c?? l???i x???y ra, kh??ng th??? xo?? chuy??n khoa");
            return;
        }

        dispath(fetchAllSpecialties());

        toast.success("xo?? chuy??n khoa th??nh c??ng");
    };
    const handleEditSpecialty = async (newData, reset) => {
        const res = await userService.updateSpecialty({
            id: newData.id,
            name: newData.name,
            descriptionHTML: newData.descriptionHTML,
            descriptionMarkDown: newData.descriptionMarkDown,
            image: newData.image,
        });
        console.log("handleEditSpecialty  res", res.data);
        if (res.data.errorCode !== 0) {
            toast.error("C?? l???i x???y ra");
        } else {
            toast.success("c???p nh???t ng?????i d??ng th??nh c??ng");
            setShowModal(false);
            dispath(fetchAllSpecialties());
            setIsAddMode(true);
        }
    };

    const handleClickEdit = async (specialty) => {
        setInitialValue({
            id: specialty.id,
            name: specialty.name,
            descriptionHTML: specialty.descriptionHTML,
            descriptionMarkDown: specialty.descriptionMarkDown,
            image: commons.toBase64(specialty.image),
        });
        setIsAddMode(false);
        setShowModal(true);
    };

    return (
        <>
            <div className={cx("wrapper")}>
                <TableContainer component={Paper}>
                    <Button variant="contained" onClick={handleAddmodalClick}>
                        Th??m Chuy??n khoa
                    </Button>
                    {showModal && (
                        <AddSpecialtyModel
                            open={showModal}
                            onClose={handleCloseModal}
                            onAddUser={handleAddSpecialty}
                            addError={error}
                            isAddMode={isAddMode}
                            initialValue={initialValue}
                            onEditUser={handleEditSpecialty}
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
                                <TableCell>T??n chuy??n khoa</TableCell>

                                <TableCell>Ch???c n??ng </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {specialtiesList &&
                                specialtiesList.length > 0 &&
                                specialtiesList.map((row, index) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{
                                            "&:last-child td, &:last-child th": {
                                                border: 0,
                                            },
                                        }}
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell scope="row">{row.name}</TableCell>

                                        <TableCell className={cx("actions")}>
                                            <EditIcon
                                                sx={{ cursor: "pointer" }}
                                                color="green"
                                                onClick={() => {
                                                    handleClickEdit(row);
                                                }}
                                            />

                                            <DeleteForeverIcon
                                                sx={{ cursor: "pointer" }}
                                                color="red"
                                                onClick={() => handleDeleteSpecialty(row.id)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    {/* {isLoading && <Loading />} */}
                </TableContainer>
            </div>
        </>
    );
}

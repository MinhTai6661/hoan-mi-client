import { UTurnRight } from "@mui/icons-material";

const utilities = {
    getCodeById: (CodeList, key, lang = "valueVi") => {
        const index = CodeList?.findIndex((item) => {
            return item.keyMap === key;
        });
        return CodeList?.[index]?.[lang];
    },
};
export default utilities;

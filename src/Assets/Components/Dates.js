import { Button } from "@mui/material";
import { useState } from "react";

const Dates = ({ id, handleButton, array, type}) => {
    const [selected, setSelected] = useState(false);
    const onClick = () => {
        handleButton(id, type);
        setSelected(prevSelected => !prevSelected);
    }

    return (
        <Button variant='contained' sx={{textTransform:"none",
            color: array.includes(id) ? "white":"black",
            backgroundColor: array.includes(id) ? "#E4423F": "#ffffff",
            borderRadius: '41px', fontSize:"14px"}} onClick={onClick}>
            {id}
        </Button>
    );
}
 
export default Dates;
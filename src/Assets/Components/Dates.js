import { Button } from "@mui/material";
import { useState } from "react";

const Dates = ({date, id, handleButtonBoolean, formData}) => {
    const [selected, setSelected] = useState(false);
    const onClick = () => {
        handleButtonBoolean(id, !selected)
        setSelected(prevSelected=> !prevSelected)
    }
    return (
        <>
        <Button variant='contained' sx={{textTransform:"none", color: selected ? "white":"black", backgroundColor: selected ? "#E4423F": "#ffffff",
            borderRadius: '41px', fontSize:"14px"}} onClick={onClick}>
            {date}
        </Button>
        </>
    );
}
 
export default Dates;
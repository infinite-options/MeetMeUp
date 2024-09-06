import { Button } from "@mui/material";
import { useState } from "react";

const Dates = ({date}) => {
    const [selected, setSelected] = useState(false);
    const onClick = () => {
        setSelected(prevSelected=> !prevSelected)
    }
    return (
        <Button sx={{textTransform:"none", color: selected ? "white":"black", backgroundColor: selected ? "#E4423F": "rgba(226,226,226,.5)", borderStyle:"solid", borderWidth:"1px", borderRadius:"20px", height:"25px", fontSize:"14px"}} onClick={onClick}>
            {date}
        </Button>
    );
}
 
export default Dates;
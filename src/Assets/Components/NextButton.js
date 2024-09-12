import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2"

import { useNavigate } from 'react-router-dom'; 

const NextButton = ({next, onClick, notallowed}) => {
    const navigate = useNavigate();
    const handleNavigate = async () => {
        if (onClick) {
            await onClick();
        }
        if (!notallowed) {
            navigate(`${next}`);
        }
    };

    return (
        <Grid container size={12} justifyContent="center" >
            <Button 
            sx={{width:"130px", backgroundColor:"#E4423F", 
            borderRadius:"25px", height:"45px", 
            color:"white", marginTop:"40px", 
            mb:"40px", textTransform:"none", 
            fontFamily:"Lexend", 
            fontSize:"18px", fontWeight:"regular"}} 
            onClick={() => {
                handleNavigate();
                }}>Next</Button>
        </Grid>
    );
}
 
export default NextButton;
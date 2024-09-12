import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2"

import { useNavigate } from 'react-router-dom'; 

const NextButton = ({next, onClick, type}) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        if (onClick) {
            onClick();

        }
        navigate(`${next}`);
    };

    return (
        <Grid container size={12} justifyContent="center" >
            <Button 
            type="submit"
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
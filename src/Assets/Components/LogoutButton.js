import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2"

import { useNavigate } from 'react-router-dom'; 

const LogoutButton = ({onClick}) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        if (onClick) {
            onClick();

        }
        navigate(`/accountSetup1Login`);
    };

    return (
        <Grid container size={12} justifyContent="center" >
            <Button 
            onClick={handleNavigate}
            sx={{width:"130px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", mb:"5px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Logout</Button>   
        </Grid>
    );
}
 
export default LogoutButton;
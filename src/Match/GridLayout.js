import Grid from "@mui/material/Grid2";
import GridPreview from "./GridPreview";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom'; 
import LogoutButton from "../Assets/Components/LogoutButton";

const GridLayout = () => {
    const navigate = useNavigate(); 
    const handleBack = () => {
        navigate(`/matching1PreferencesPage`);
    };
    const handleLogout = () => {

    };
    const handleContinue = () => {
        navigate(`/selectionResults`);
    };
    return (
        <Grid container spacing={2} sx={{maxWidth:"414px", margin:"0 auto"}}>
            <Grid size={4}>
                <GridPreview />
            </Grid>
            <Grid size={4}>
                <GridPreview />
            </Grid>
            <Grid size={4}>
                <GridPreview />
            </Grid>
            <Grid size={4}>
                <GridPreview />
            </Grid>
            <Grid size={4}>
                <GridPreview />
            </Grid>
            <Grid size={4}>
                <GridPreview />
            </Grid>
            <Grid size={4}>
                <GridPreview />
            </Grid>
            <Grid size={4}>
                <GridPreview />
            </Grid>
            <Grid size={4}>
                <GridPreview />
            </Grid>
            <Grid container size={12} justifyContent="center" >
                <Button onClick={handleBack} sx={{width:"130px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", marginTop:"40px", mb:"5px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Back</Button>
            </Grid>
            <Grid container size={12} justifyContent="center" >
                <Button onClick={handleContinue} sx={{width:"130px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", mb:"5px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Continue</Button>
            </Grid>
            <Grid container size={12} justifyContent="center" >
                <LogoutButton></LogoutButton>
            </Grid>
        </Grid>
    );
}
 
export default GridLayout;
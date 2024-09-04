import Grid from "@mui/material/Grid2";
import Preview from "./Preview";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const GridLayout = () => {
    return (
        <Grid container spacing={2} sx={{maxWidth:"414px", margin:"0 auto"}}>
            <Grid size={4}>
                <Preview />
            </Grid>
            <Grid size={4}>
                <Preview />
            </Grid>
            <Grid size={4}>
                <Preview />
            </Grid>
            <Grid size={4}>
                <Preview />
            </Grid>
            <Grid size={4}>
                <Preview />
            </Grid>
            <Grid size={4}>
                <Preview />
            </Grid>
            <Grid size={4}>
                <Preview />
            </Grid>
            <Grid size={4}>
                <Preview />
            </Grid>
            <Grid size={4}>
                <Preview />
            </Grid>
            <Grid container size={12} justifyContent="center" >
                <Link to="/preferences">
                    <Button sx={{width:"130px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", marginTop:"40px", mb:"5px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Back</Button>
                </Link>
            </Grid>
            <Grid container size={12} justifyContent="center" >
                <Button sx={{width:"130px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", mb:"5px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Continue</Button>
            </Grid>
            <Grid container size={12} justifyContent="center" >
                <Button sx={{width:"130px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", mb:"5px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Logout</Button>   
            </Grid>
        </Grid>
    );
}
 
export default GridLayout;
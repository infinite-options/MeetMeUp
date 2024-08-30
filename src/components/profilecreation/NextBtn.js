import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2"

const NextBtn = ({next}) => {
    return (
        <Grid container size={12} justifyContent="center" >
            <Link to={next}>
                <Button sx={{width:"130px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", marginTop:"40px", mb:"40px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Next</Button>
            </Link>
        </Grid>
    );
}
 
export default NextBtn;
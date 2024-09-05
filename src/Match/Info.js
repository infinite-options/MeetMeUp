import {  Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Info = ({img, info}) => {
    return (
        <Grid container size={12}>
            <Grid size={1}>
                <img src={img}></img>
            </Grid>
            <Grid size={10} justifyContent="flex-start">
                <Typography sx={{fontSize:'14px', fontWeight:"bold"}}>{info}</Typography>
            </Grid>
        </Grid>
    );
}
 
export default Info;
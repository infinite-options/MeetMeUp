import {  Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
// victors code
const AccountInfo = ({img, info}) => {
    return (
        <Grid container size={12}>
            <Grid size={1}>
                <img src={img}></img>
            </Grid>
            <Grid size={10} justifyContent="flex-start">
                <Typography sx={{fontSize:'14px', fontWeight:"bold"}}>{info ? info : "no data"}</Typography>
            </Grid>
        </Grid>
    );
}
 
export default AccountInfo;
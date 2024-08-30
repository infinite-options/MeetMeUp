import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Specifics = ({info}) => {
    return (
        <Grid size={12} container spacing={2} sx={{borderStyle:"solid", borderRadius:"20px", padding:"8px", borderColor:"#E2E2E2", borderWidth:"1px", boxShadow:"2px 5px 5px 2px rgba(0,0,0,.1)", mb:"10px"}} alignItems="center">
            <Grid size={6}>
                <Typography sx={{fontSize:"16px"}}>{info}</Typography>
            </Grid>
            <Grid size={4.5} container justifyContent="flex-end">
                <Typography sx={{fontSize:'14px', color:"#CECECE"}}>Enter</Typography>
            </Grid>
            <Grid size={1.5}>
                <img src="arrow.png" />
            </Grid>
        </Grid>
    );
}
 
export default Specifics;
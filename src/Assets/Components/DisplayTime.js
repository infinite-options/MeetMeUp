import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import remove from "../Images/delete.png"

const DisplayTime = ({index, day,start,end, onClick}) => {
    return (
        <Grid container size={12} alignItems="center" spacing={2}>
            <Grid container sx={{backgroundColor:"rgba(226,226,226,.5)", borderStyle:"solid", alignItems:'center', justifyContent:"center", width:"107px", height:"50px", borderRadius:"10px", borderWidth:"1px", borderColor:"#E2E2E2"}}>
                <Typography>{day}</Typography>
            </Grid>
            <Grid container sx={{backgroundColor:"rgba(226,226,226,.5)", borderStyle:"solid", alignItems:'center', justifyContent:"center", width:"84px", height:"50px", borderRadius:"10px", borderWidth:"1px",borderColor:"#E2E2E2"}}>
                <Typography >{start}</Typography>
            </Grid>
            <Grid container sx={{backgroundColor:"rgba(226,226,226,.5)", borderStyle:"solid", alignItems:'center', justifyContent:"center", width:"84px", height:"50px", borderRadius:"10px", borderWidth:"1px",borderColor:"#E2E2E2"}}>
                <Typography>{end}</Typography>
            </Grid>
            <Grid size={1} onClick={()=>onClick(index)}>
                <img src={remove}></img>
            </Grid>
        </Grid>
    );
}
 
export default DisplayTime;
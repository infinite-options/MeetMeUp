import { Typography, Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Link } from "react-router-dom";
// import BackButton from '../Images/BackButton.png'
import BackArrowButton from "./BackArrowButton";
const Progress = ({percent, prev}) => {
    let finished 
    let unfinished;
    const calcProgress = () => {
        if(percent.length===4) {
            finished=10.5
        }
        else {
            finished = parseInt(percent[0])* 1.1;
            unfinished=10.5-finished;
        }
    }
    calcProgress();

    return (
        <Grid container>
            <Box sx={{ position: 'relative', width: '100%' }}>
            <Grid container alignItems="center">
            <Grid item xs={3} container alignItems="center" justifyContent="flex-start">
                <BackArrowButton />
            </Grid>
            </Grid>
            <Box sx={{
            position: 'absolute',
            width: '100%',
            display: 'flex',
            top: '10px',
            justifyContent: 'center'
            }}>
            <Typography sx={{ fontSize: '22px' }}>
                Profile Creation
            </Typography>
            </Box>
            </Box>
            <Grid container size={12} alignItems="center" spacing={1} >
                <Grid size={finished} >
                    <hr style={{border: '2px solid #E4423F', borderRadius:"2px"}} />
                </Grid>
                <Grid size={1}>
                    <Typography sx={{ color:"#E4423F", fontSize:'18px'}}>
                        {percent}
                    </Typography>
                </Grid>
                <Grid size={unfinished} sx={{marginLeft:"5px"}}>
                    <hr style={{borderStyle:"solid", borderColor:"#E2E2E2", height:"2.5px", borderRadius:"3px"}} />
                </Grid>
            </Grid>
        </Grid>
    );
}
 
export default Progress;
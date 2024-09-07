import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Link } from "react-router-dom";
import BackButton from '../Images/BackButton.png'

const Progress = ({percent, prev}) => {
    let finished 
    let unfinished;
    const calcProgress = () => {
        finished = parseInt(percent[0])* 1.1;
        unfinished=10.5-finished;
    }
    calcProgress();

    return (
        <Grid container sx={{margin: 1}}>
            <Grid container alignItems="center" size={12}>
                <Grid size={3}>
                    <Link to={prev}>
                        <img src={BackButton} />
                    </Link>
                </Grid>
                <Grid size={9}>
                    <Typography sx={{fontSize:'22px', marginLeft: 3}}>Profile Creation</Typography>
                </Grid>
            </Grid>
            <Grid container size={12} alignItems="center" spacing={1}>
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
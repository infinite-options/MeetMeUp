import BackArrowButton from "./BackArrowButton";
import { Typography, Box } from "@mui/material";
import Grid from '@mui/material/Grid2';

const TopTitle = ({title, weight, page}) => {
    return (
        <Box sx={{ position: 'relative', width: '100%', marginTop: '15px' }}>
            <Grid container alignItems="center">
                <Grid item xs={1} container zIndex='10' justifyContent="flex-start">
                    <BackArrowButton page={page}/>
                </Grid>
            </Grid>
            <Box sx={{
            position: 'absolute',
            fontFamily: 'Segoe UI', 
            width: '100%',
            display: 'flex',
            top: '10px',
            justifyContent: 'center'
            }}>
            <Typography sx={{ fontSize: '22px', fontWeight: `${weight}` }}>
                {title}
            </Typography>
         </Box>
        </Box>
    )
}

export default TopTitle;
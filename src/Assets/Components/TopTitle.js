import BackArrowButton from "./BackArrowButton";
import { Typography, Box } from "@mui/material";
import Grid from '@mui/material/Grid2';

const TopTitle = ({title}) => {
    return (
        <Box sx={{ position: 'relative', width: '100%', marginTop: '15px' }}>
            <Grid container alignItems="center">
                <Grid item xs={3} container alignItems="center" zIndex='10' justifyContent="flex-start">
                    <BackArrowButton />
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
            <Typography sx={{ fontSize: '22px' }}>
                {title}
            </Typography>
         </Box>
        </Box>
    )
}

export default TopTitle;

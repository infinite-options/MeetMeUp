import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2"
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'; 
const BackArrowButton = ({onClick}) => {
    // const navigate = useNavigate();
    const handleNavigate = () => {
        if (onClick) {
            onClick();
        }
        window.history.back(); 
    };

    return (
        <Grid container size={12} justifyContent="center" >
            <IconButton 
            sx={{
                backgroundColor: "#EDEDED", color: "#333333", borderRadius: "25px", border: 'solid', borderWidth: '1px', borderColor: '#CECECE',
                // '&:hover': {
                // backgroundColor: "#D3D3D3", 
                // },
                '&:active': {
                backgroundColor: "#BEBEBE", 
                }
            }} 
            onClick={() => {
                handleNavigate();
                }}>
                <ArrowBackIcon/>
            </IconButton>
        </Grid>
    );
}
 
export default BackArrowButton;
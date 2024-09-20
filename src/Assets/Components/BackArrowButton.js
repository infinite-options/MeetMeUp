import { Button } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import Grid from "@mui/material/Grid2"
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'; 
const BackArrowButton = ({onClick, page}) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        if (onClick) {
            onClick();
        }
        if (page) {
            navigate(page);
        } else {
            window.history.back(); 
        }
    };

    return (
        <IconButton 
            sx={{
                backgroundColor: "#EDEDED", color: "#333333", borderRadius: "25px", border: 'solid', borderWidth: '1px', borderColor: '#CECECE',
                margin: '10px', marginTop: '5px',  zIndex: '10', fontFamily:"Lexend", 
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
    );
}
 
export default BackArrowButton;
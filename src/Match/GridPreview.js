import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import profileImg from "../Assets/Images/profileimg.png"

const Preview = () => {
    const name="Bob Hawk"
    const age="43"
    const gender="male"
    const where="Mandurah"
    return (
        <Link to="/match">
            <Box sx={{backgroundColor:"#E4423F", paddingTop:"5px", paddingBottom:"10px", borderRadius:"10px", display:"flex",justifyContent:"center", position:"relative", maxWidth:"414px", margin:"0 auto"}}>
                <img src={profileImg} style={{width:"100%", height:"90%"}}></img>
            </Box>
        </Link>
    );
}
 
export default Preview;
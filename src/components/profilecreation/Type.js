import { Button } from "@mui/material";

const Type = ({type}) => {
    return (
        <Button variant="outlined" sx={{color:"black", borderStyle:"solid", borderColor:"#CECECE", borderRadius:"20px", textTransform:"none", boxShadow:"2px 5px 5px 2px rgba(0,0,0,.1)", whiteSpace:"nowrap", marginRight:"5px"}}>
            {type}
        </Button>
    );
}
 
export default Type;
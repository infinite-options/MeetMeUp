import { Button } from "@mui/material";

const Type = ({type}) => {
    return (
        <Button variant="outlined" sx={{color:"black", borderStyle:"solid", borderColor:"#CECECE", borderRadius:"20px", textTransform:"none", boxShadow:"2px 5px 5px 2px rgba(0,0,0,.1)", whiteSpace:"nowrap", marginRight:"5px", width:"90%", mb:"10px"}}>
            {type}
        </Button>
    );
}
 
export default Type;
import { Button, Container, Modal, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';

const MatchFound = ({open, onClose}) => {
    return (
        <Modal
                    open={open}
                    onClose={onClose}
                >
                    <Container sx={{width:"354px", height:"470px", backgroundColor:"white", borderRadius:"10px", position:"absolute", top:"20%", left:"5%", right:"5%"}}>
                        <Grid container justifyContent="center">
                            <Grid container size={12}>
                                <Grid size={6} sx={{position:"absolute", top:"15%", left:"15%"}}>
                                    <img src="match1.png"></img>
                                </Grid>
                                <Grid size={6} sx={{position:"absolute", left:"40%", top:"5%"}}>
                                    <img src="match2.png"></img>
                                </Grid>
                            </Grid>
                            <Grid>
                                <Typography sx={{marginTop:"250px", fontSize:'40px', color:"#A61C12"}}>It's A Match!</Typography>
                            </Grid>
                            <Grid size={6} sx={{textAlign:"center"}}>
                                <Typography sx={{fontSize:"14px", mb:"10px"}}>Let's start creating a date with Charlotte and you.</Typography>
                            </Grid>
                            <Grid container size={12} justifyContent="center" >
                                <Button sx={{width:"130px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}} onClick={onClose}>Begin!</Button>
                            </Grid>
                            <Grid>
                                <Typography sx={{fontSize:'14px', color:"#E4423F", marginTop:"20px"}} onClick={onClose}>Keep matching</Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </Modal>
    );
}
 
export default MatchFound;
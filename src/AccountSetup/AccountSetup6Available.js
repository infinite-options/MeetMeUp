import Grid  from "@mui/material/Grid2";
import Progress from "../Assets/Components/Progress";
import { Button, Container, Typography } from "@mui/material";
import NextButton from "../Assets/Components/NextButton";
import DateAdd from "../Assets/Components/DateAdd";
import { useState } from "react";
// victors code
const AccountSetup6Available = () => {
    const [formData, setFormData] = useState({
        lunch: false,
        dinner: false,
        coffee: false,
        movies: false,
        supriseMe: false,
    });
    const handleButtonBoolean = (e) => {
        const { name } = e.target;
        setFormData({
            ...formData,
            [name]: !formData[name]
        });
    };

    const handleNext = (e) => {
        console.log(e);
        console.log(formData);
    };
    return (  
        <Grid container>
            <Grid size={12}>
                <Progress percent="100%" prev="/accountSetup5Create" />
            </Grid>
            <Container>
                <form onSubmit={handleNext} action='/accountSetup5Create'>
                        <div>
                            Your General Interests
                        </div>
                        <div>
                            These interests help match you to better people on meet me up. Select or add as many interests as you want.
                        </div>
                        <Button variant='contained' onClick={handleButtonBoolean} name='lunch'
                            sx={{ backgroundColor: formData['lunch'] ? '#E4423F' : '#ffffff', color: '#000000',
                                maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                        >
                            Lunch
                        </Button>
                        <Button variant='contained' onClick={handleButtonBoolean} name='dinner'
                            sx={{ backgroundColor: formData['dinner'] ? '#E4423F' : '#ffffff', color: '#000000',
                                maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                        >
                            Dinner
                        </Button>
                        <Button variant='contained' onClick={handleButtonBoolean} name='coffee'
                            sx={{ backgroundColor: formData['coffee'] ? '#E4423F' : '#ffffff', color: '#000000',
                                maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                        >
                            Coffee
                        </Button>
                        <Button variant='contained' onClick={handleButtonBoolean} name='movies'
                            sx={{ backgroundColor: formData['movies'] ? '#E4423F' : '#ffffff', color: '#000000',
                                maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                        >
                            Movies
                        </Button>
                        <Button variant='contained' onClick={handleButtonBoolean} name='surpiseMe'
                            sx={{ backgroundColor: formData['surpiseMe'] ? '#E4423F' : '#ffffff', color: '#000000',
                                maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                        >
                            Surpise Me
                        </Button>
                </form>
                <Typography sx={{fontSize:'18px', marginTop:"10px"}}>When Are You Available?</Typography>
                <Typography sx={{fontSize:'14px', lineHeight:"15px", mb:"10px"}}>These availability slots are crucial to help you and potential matches make date faster.
                    <br /><br />These slots will directly correspond to other users slots, and will allow you both to plan a date within time frames that you both are available for.
                    <br /><br />If you leave the below section blank, meet me up will assume you are always available.
                </Typography>
                <Grid container>
                    <Grid size={4}>
                        <Typography sx={{fontSize:"18px"}}>Day</Typography>
                    </Grid>
                    <Grid size={8} container justifyContent="flex-start">
                        <Typography sx={{fontSize:"18px"}}>Times</Typography>
                    </Grid>
                </Grid>
                <Grid container size={12} justifyContent="center" >
                    <DateAdd></DateAdd>
                </Grid>
                <NextButton next={'/location'}/>
            </Container>
        </Grid>
    );
}
 
export default AccountSetup6Available;
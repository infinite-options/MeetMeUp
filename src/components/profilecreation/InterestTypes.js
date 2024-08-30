import Grid from "@mui/material/Grid2";
import Type from "./Type";

const InterestTypes = () => {
    return (
        <Grid container size={10} sx={{marginTop:"10px", width:"10"}}>
            <Grid size={4}>
                <Type type="Eating Out" />
            </Grid>
            <Grid size={4} container>
                <Type type="Bike Rides" />
            </Grid>
            <Grid size={4}>
                <Type type="Drinking" />
            </Grid>
            <Grid size={4} sx={{marginTop:"10px"}}>
                <Type type="Dancing" />
            </Grid>
            <Grid size={4} sx={{marginTop:"10px"}}>
                <Type type="Cooking" />
            </Grid>
            <Grid size={4} sx={{marginTop:"10px"}}>
                <Type type="Baking" />
            </Grid>
            <Grid size={4} sx={{marginTop:"10px"}}>
                <Type type="Crafting" />
            </Grid>
            <Grid size={4} sx={{marginTop:"10px"}}>
                <Type type="Painting" />
            </Grid>
            <Grid size={4} sx={{marginTop:"10px"}}>
                <Type type="Surfing" />
            </Grid>
            <Grid size={4} sx={{marginTop:"10px"}}>
                <Type type="Travelling" />
            </Grid>
            <Grid size={4}>
                <img src="add.png" />
            </Grid>
        </Grid>
    );
}
 
export default InterestTypes;
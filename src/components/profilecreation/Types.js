import Grid from "@mui/material/Grid2";
import Type from "./Type";

const Types = () => {
    return (
        <Grid container size={8} sx={{marginTop:"10px", width:"10"}}>
            <Grid size={4}>
                <Type type="Straight" />
            </Grid>
            <Grid size={4} container>
                <Type type="Bi-Sexual" />
            </Grid>
            <Grid size={4}>
                <Type type="Trans-gender" />
            </Grid>
            <Grid size={4} sx={{marginTop:"10px"}}>
                <Type type="LGBTQ" />
            </Grid>
            <Grid size={4} sx={{marginTop:"10px"}}>
                <Type type="Homosexual" />
            </Grid>
        </Grid>
    );
}
 
export default Types;
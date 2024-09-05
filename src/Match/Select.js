import { useState } from 'react';
import { Container, Slider, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';

const Select = ({ preference, measurement, start, min, max }) => {
    const [value, setValue] = useState(start);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const displayValue = (start) => {
        if (Array.isArray(start)) {
            return `${value[0]}-${value[1]}`;
        }
        return value
    }

    return (
        <Grid container>
            <Grid item size={6}>
                <Typography sx={{fontSize:"18px"}}>{preference}</Typography>
            </Grid>
            <Grid item size={6} container justifyContent="flex-end">
                <Typography>{displayValue(start)} {measurement}</Typography>
            </Grid>
            <Grid item size={12}>
                <Slider
                    value={value}
                    onChange={handleChange}
                    min={min}
                    max={max}
                    sx={{color:"#E4423F",
                        height:"1px",
                        '& .MuiSlider-thumb': {
                            color:"white",
                            boxShadow:"2px 5px 5px 2px rgba(0,0,0,.1)",
                          },
                          '& .MuiSlider-rail': {
                            color: "#CECECE",
                        },
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default Select;

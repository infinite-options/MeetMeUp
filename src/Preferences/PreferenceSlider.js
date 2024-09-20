import { useEffect, useState } from 'react';
import { Container, Slider, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import axios from 'axios';

const PreferenceSlider = ({ preference, measurement, start, min, max }) => {
    const [value, setValue] = useState(() => {
        const savedValue = localStorage.getItem(`preference_${preference}`);
        return savedValue ? JSON.parse(savedValue) : start;
    });
    const [debouncedValue, setDebouncedValue] = useState(value);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        localStorage.setItem(`preference_${preference}`, JSON.stringify(newValue));
    };

    const displayValue = (value) => {
        if (Array.isArray(value)) {
            return `${value[0]}-${value[1]}`;
        }
        return value;
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    const userId = localStorage.getItem('user_uid');
    const userEmail = localStorage.getItem("user_email_id");

    useEffect(() => {
        console.log("Slider value changed:", debouncedValue);
        const formData = new FormData();
        formData.append('user_uid', userId);
        formData.append('user_email_id', userEmail);
        if (preference === "Height in centimetres") {
            formData.append('user_prefer_height_min', debouncedValue);
        }
        else if (preference === "Maximum distance") {
            formData.append('user_prefer_distance', debouncedValue);
        }
        else if (preference === "Age range") {
            formData.append('user_prefer_age_min', debouncedValue[0]);
            formData.append('user_prefer_age_max', debouncedValue[1]);
        }
        axios.put("https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo", formData);
    }, [debouncedValue]);

    return (
        <Grid container>
            <Grid item size={6}>
                <Typography sx={{fontSize:"18px"}}>{preference}</Typography>
            </Grid>
            <Grid item size={6} container justifyContent="flex-end">
                <Typography>{displayValue(value)} {measurement}</Typography>
            </Grid>
            <Grid item size={12}>
                <Slider
                    value={value}
                    onChange={handleChange}
                    min={min}
                    max={max}
                    sx={{
                        color:"#E4423F",
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

export default PreferenceSlider;
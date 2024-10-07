import "../App.css";
import HelperTextBox from "../Assets/Components/helperTextBox";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid2, MenuItem, TextField } from "@mui/material";
import { Autocomplete, GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import Progress from "../Assets/Components/Progress";
import NextButton from "../Assets/Components/NextButton";
import Dates from "../Assets/Components/Dates";
import axios from "axios";
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const placesLibrary = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "450px",
  marginTop: "10px",
  marginLeft: "auto",
  marginRight: "auto",
};

export default function AccountSetup3Create() {
  // set the formData to the current existing data
  const [userData, setUserData] = useState({});
  const [savedAddress, setSavedAddress] = useState("");
  const userId = localStorage.getItem("user_uid");
  const [center, setCenter] = useState({ lat: -32.015001263602, lng: 115.83650856893345 });
  const [searchResult, setSearchResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [defaultAddress, setDefaultAddress] = useState("");
  const [defaultGender, setDefaultGender] = useState("");
  const [defaultBio, setDefaultBio] = useState("");
  const [isChanged, setIsChanged] = useState(false); // if any of the info has been changed then PUT
  const [noId, setNoId] = useState(false); // if any of the info has been changed then PUT
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    profileBio: "",
    suburb: "",
    country: "",
    sexuality: "",
    openTo: [],
  });
  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }
  // console.log("openTo formData: ", formData.openTo);   // need to figure out where data is coming from
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/${userId}`);
        const fetchedData = response.data.result[0];
        console.log("fetched openTo: ", fetchedData.user_open_to);
        console.log("fetchedData: ", fetchedData);

        //const openToArray = fetchedData.user_open_to ? fetchedData.user_open_to.split(",") : [];
        const openToArray = JSON.parse(fetchedData.user_open_to);
        console.log("openToArray after parsing: ", openToArray);
      
        //console.log(fetchedData.user_latitude);
        //console.log(fetchedData.user_longitude);
        if (fetchedData.user_latitude && fetchedData.user_longitude) {
          setCenter({ lat: Number(fetchedData.user_latitude), lng: Number(fetchedData.user_longitude) });
          await handleAddress(fetchedData.user_latitude, fetchedData.user_longitude);
        } else {
          setCenter({ lat: -32.015001263602, lng: 115.83650856893345 });
        }
        console.log(fetchedData.user_latitude);
        console.log(fetchedData.user_longitude);
        // TODO: might fix to go under handleAddress
        setUserData(fetchedData);
        setDefaultAddress(savedAddress);
        setLoading(false);
        // setSearchResult(savedAddress);
        console.log("fetchedData Center: ", center);
        await setDefaultGender(fetchedData.user_gender);
        await setDefaultBio(fetchedData.user_profile_bio);
        setFormData({
          ...formData,
          name: fetchedData.user_first_name && fetchedData.user_last_name ? `${fetchedData.user_first_name} ${fetchedData.user_last_name}` : "",
          age: fetchedData.user_age || "",
          gender: fetchedData.user_gender || "",
          profileBio: fetchedData.user_profile_bio || "",
          suburb: fetchedData.user_suburb || "",
          // country: '',
          sexuality: fetchedData.user_sexuality || "",
          openTo: openToArray || [],
        });
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    if (userId) {
      fetchUserData();
    } else {
      setLoading(false);
      setNoId(true);
    }
  }, [userId, savedAddress]);

  const handleAddress = async (lat, lang) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lang}&key=${GOOGLE_API_KEY}`, {
        method: "GET",
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        if (result.results.length > 0) {
          const address = result.results[0].formatted_address;
          setSavedAddress(address);
          console.log("Fetched Address: ", address);
        } else {
          console.error("No address found for the given coordinates");
        }
      } else {
        console.error("Response Err:", response.statusText);
      }
    } catch (err) {
      console.log("Try Catch Err:", err);
    }
  };

  //console.log("userData: ", userData);
  //console.log("userData Age: ", userData.user_age);

  const genders = ["Male", "Female", "Nonbinary"];

  const sexuality = ["Straight", "Bi-sexual", "Transgender", "LGBTQ", "Homosexual"];

  const openTo = ["Straight", "Bi-sexual", "Transgender", "LGBTQ", "Homosexual","Manu"];

  console.log("openTo", openTo)

  function onPlaceChanged() {
    if (searchResult !== "") {
      const place = searchResult.getPlace();
      console.log("place full: ", place.address_components);
      for (var i = 0; i < place.address_components.length; i++) {
        console.log("place: ", place.address_components[i]["long_name"]);
        if (place.address_components[i]["types"].includes("country")) {
          formData["country"] = place.address_components[i]["long_name"];
        }
      }
      setCenter({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
      console.log("onPlaceCenter: ", center);
    } else {
      alert("Enter in a new location");
    }
  }
  const handleChange = (e) => {
    setIsChanged(true);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddressChange = (e) => {
    setIsChanged(true);
    // setSavedAddress(e.target.value); // TODO: CAUSING RERENDER
  };

  const handleButton = (id, type) => {
    setIsChanged(true);
    if (formData[type].includes(id)) {
      const index = formData[type].indexOf(id);
      formData[type].splice(index, 1);
    } else {
      formData[type].push(id);
    }
  };

  const handleButtonSexuality = (id, type) => {
    setIsChanged(true);
    if (formData[type] === id) {
      setFormData({
        ...formData,
        [type]: "",
      });
    } else {
      setFormData({
        ...formData,
        [type]: id,
      });
    }
  };

  console.log("original gender: ", defaultGender);
  useEffect(() => {
    console.log("new gender: ", defaultGender);
  }, [formData]);

  // Checking bio
  // console.log('original Bio: ', defaultBio);
  // useEffect(() => {
  //     console.log('new Bio: ', defaultBio)
  // }, [formData])

  const handleNext = async () => {
    const url = "https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo";
    
    // Split the name into first and last names
    const nameArray = formData["name"] ? formData["name"].split(" ") : [];
    const firstName = nameArray[0] || "";
    const lastName = nameArray.length > 1 ? nameArray[nameArray.length - 1] : "";
  
    // Create an object with the updated data
    const updatedData = {
      user_uid: localStorage.getItem("user_uid"),
      user_email_id: localStorage.getItem("user_email_id"),
      user_first_name: firstName,
      user_last_name: lastName,
      user_age: formData["age"],
      user_gender: formData["gender"],
      user_suburb: formData["suburb"],
      user_profile_bio: formData["profileBio"],
      user_country: formData["country"],
      user_latitude: center["lat"],
      user_longitude: center["lng"],
      user_sexuality: formData["sexuality"],
      user_open_to: JSON.stringify(formData["openTo"]),
    };
  
    // Create FormData and append fields in one step
    const fd = new FormData();
    Object.entries(updatedData).forEach(([key, value]) => fd.append(key, value));
  
    // Send the data using axios
    try {
      const response = await axios.put(url, fd); // Changed to PUT as per your original context
      console.log("Successfully submitted data:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries: placesLibrary,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  if (loading) {
    return <div>Loading location</div>;
  }
  if (noId) {
    // window.alert('No User Found');
    // return <div>No User Found</div>;
    navigate('/accountSetup1Login')
  }
  return (
    <div className='App'>
      <form className='form-container' onSubmit={handleNext}>
        <Box sx={{ marginLeft: "15%", marginRight: "15%" }}>
          <Progress percent='40%' prev='/accountSetup2Create' />
          <div className='pc-header-text'>About You</div>
          <div className='pc-sub-header-text'>These details are about you and will be public to potential matches on meet me up.</div>
          <Grid2 container sx={{ "& > :not(style)": { marginTop: 1.5, width: 1 } }}>
            <TextField
              onChange={handleChange}
              required
              sx={{ "& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: "#E4423F" } } }}
              InputLabelProps={{ style: { color: "#E4423F" } }}
              name='name'
              label='Full Name'
              type='text'
              variant='outlined'
              value={formData["name"]}
            />
            <Grid2 container>
              <Grid2 size={6}>
                <TextField
                  onChange={handleChange}
                  sx={{ width: "98%", "& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: "#E4423F" } } }}
                  InputLabelProps={{ style: { color: "#E4423F" } }}
                  name='age'
                  label='Age'
                  type='number'
                  variant='outlined'
                  value={formData["age"]}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  onChange={handleChange}
                  sx={{ "& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: "#E4423F" } }, width: 1 }}
                  InputLabelProps={{ style: { color: "#E4423F" } }}
                  name='gender'
                  label='Gender'
                  variant='outlined'
                  select
                  defaultValue={defaultGender}
                  value={formData["gender"]}
                >
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {gender}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid2>
            </Grid2>
            <TextField
              onChange={handleChange}
              sx={{ "& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: "#E4423F" } } }}
              InputLabelProps={{ style: { color: "#E4423F" } }}
              name='suburb'
              label='Suburb'
              type='text'
              variant='outlined'
              value={formData["suburb"]}
            />
            <TextField
              onChange={handleChange}
              sx={{ "& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: "#E4423F" } } }}
              InputLabelProps={{ style: { color: "#E4423F" } }}
              name='profileBio'
              label='Profile Bio'
              type='text'
              variant='outlined'
              multiline
              rows={4}
              defaultValue={defaultBio}
            />
          </Grid2>
          <div className='pc-header-text'>Location</div>
          <div className='pc-sub-header-text'>Your location helps us pin point where you are to provide better matches to you.</div>
          <Grid2 container sx={{ "& > :not(style)": { marginTop: 1.5, width: 1 } }}>
            <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
              <TextField
                className='autocomplete-text'
                onChange={handleAddressChange}
                sx={{ "& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: "#E4423F" } } }}
                InputLabelProps={{ style: { color: "#E4423F" } }}
                variant='outlined'
                fullWidth
                name='location'
                label='Location'
                type='text'
                defaultValue={`${savedAddress}`}
              />
            </Autocomplete>
          </Grid2>

          <GoogleMap mapContainerStyle={mapContainerStyle} zoom={15} center={center} mapId='map_id'>
            <MarkerF position={center} />
          </GoogleMap>
          <HelperTextBox text='Why do we need your location?' title={'Why Location?'} subtitle={'By sharing your location on the Meet Me up app, you can discover matches within your preferred distance and tailor your date locations based on your preferences.'} />
          <div className='pc-header-text'>Your Sexuality</div>
          <div className='pc-sub-header-text'>Select the fields that best describe your sexuality</div>
          <Grid2 container spacing={1} sx={{ marginTop: 3 }}>
            {sexuality.map((index) => (
              <Grid2 key={index}>
                <Dates id={index} handleButton={handleButtonSexuality} array={formData["sexuality"]} type={"sexuality"} />
              </Grid2>
            ))}
          </Grid2>
          <div className='pc-header-text'>Open To...</div>
          <div className='pc-sub-header-text'>Select the fields that best describe what you are open to in a partner</div>
          <Grid2 container spacing={1} sx={{ marginTop: 3 }}>
            {/* display list of options */}
            {openTo.map((index) => (
              <Grid2 key={index}>
                <Dates id={index} handleButton={handleButton} array={formData["openTo"]} type={"openTo"} />
              </Grid2>
            ))}
          </Grid2>
          <HelperTextBox text='Why do we need this information?' title={'Your Open To'} subtitle={'Specifying your identity and expressing your openness creates connections with individuals who share similar perspectives and values.'} />
          <div className='form-button-container'>
            <NextButton onClick={handleNext} next={"/accountSetup4Create"}></NextButton>
          </div>
        </Box>
      </form>
    </div>
  );
}

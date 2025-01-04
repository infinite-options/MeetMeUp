import React, { useState, useRef, useCallback, useEffect } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
// import { ClassNames } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
const libraries = ["places"];
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const AddressAutocompleteInput = ({ onAddressSelect, defaultValue, isRequired }) => {
    const autocomplete = useRef(null);
    const [address, setAddress] = useState(defaultValue || "");
  
    useEffect(() => {
      setAddress(defaultValue || "");
    }, [defaultValue]);
  
    const onPlaceChanged = () => {
      if (autocomplete.current) {
        const place = autocomplete.current.getPlace();
        if (place && place.address_components) {
          onAddressSelect(place.formatted_address);
        }
      }
    };
  
    const { isLoaded, loadError } = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
      libraries: ["places"],
    });
  
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
  
    return (
      <Autocomplete
        onLoad={(auto) => {
          autocomplete.current = auto;
        }}
        onPlaceChanged={onPlaceChanged}
      ><div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Search your location..."
          style={{
            width: "90%",
            height: "20px",
            borderRadius: "50px",
            border: (isRequired && !address ? "1px solid red" : "1px solid #e0e0e0"),
            padding: "10px 16px",
            fontSize: "14px",
            backgroundColor: "#f5f5f5",
          }}
        />
        <SearchIcon
          style={{
            position: "absolute",
            right: "12px", // Adjust this for icon alignment
            color: "#757575",
            pointerEvents: "none", // Prevent the icon from blocking input clicks
          }}
        />
        </div>
      </Autocomplete>
    );
  };
  
export default AddressAutocompleteInput;
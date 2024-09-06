import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './SelectPlace.css';

export default function SelectPlace() {
    const location = useLocation();
    const { user } = location.state || {};
    console.log("Select Place", user);

    
    const [selectedButton, setSelectedButton] = useState("");

   
    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    };

    const navigate = useNavigate();
    const handleNextButton = (user) => {
        navigate('/nextLocation', { state: { user } });

    }

    return (
        <div className='simulate-mobile'>
            <div className='title' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
                <img className='userImg' src={user.src} alt='userImg' style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                <h2 className='userName' style={{ fontSize: '15px', marginTop: '35px', fontFamily: 'Lexend' }}>{user.name}</h2>
            </div>
            <div>
                <h3 className='titleText' style={{ textAlign: 'center', marginTop: '70px', fontFamily: 'Lexend' }}>Let's meet up on<br /> <span style={{ color: '#E4423F' }}>Saturday 7:30</span>, and go to <span style={{ color: '#E4423F' }}>_</span></h3>
                <p className='paraText' style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', fontFamily: 'Lexend', fontWeight: 'lighter' }}>Select a pre-filled date idea or suggest your own</p>
            </div>
            <div className="dateIdeaButtons">
                <div style={{ marginBottom: '15px' }}>
                    <button onClick={() => handleButtonClick("Dinner")} style={{ marginRight: '10px', backgroundColor: selectedButton === "Dinner" ? '#E4423F' : '#FFFFFF', stroke: 'CECECE', width: '90px', padding: '20px', borderRadius: '20px', fontFamily: 'Lexend', fontSize: '15px', boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)', border: 'none', cursor: 'pointer', color: selectedButton === "Dinner" ? '#FFFFFF' : '#000000' }}>Dinner</button>
                    <button onClick={() => handleButtonClick("Drinks")} style={{ backgroundColor: selectedButton === "Drinks" ? '#E4423F' : '#FFFFFF', stroke: 'CECECE', width: '90px', padding: '20px', borderRadius: '20px', fontFamily: 'Lexend', fontSize: '15px', boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)', border: 'none', cursor: 'pointer', color: selectedButton === "Drinks" ? '#FFFFFF' : '#000000' }}>Drinks</button>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <button onClick={() => handleButtonClick("Coffee")} style={{ marginRight: '10px', backgroundColor: selectedButton === "Coffee" ? '#E4423F' : '#FFFFFF', stroke: 'CECECE', width: '90px', padding: '20px', borderRadius: '20px', fontFamily: 'Lexend', fontSize: '15px', boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)', border: 'none', cursor: 'pointer', color: selectedButton === "Coffee" ? '#FFFFFF' : '#000000' }}>Coffee</button>
                    <button onClick={() => handleButtonClick("Lunch")} style={{ backgroundColor: selectedButton === "Lunch" ? '#E4423F' : '#FFFFFF', stroke: 'CECECE', width: '90px', padding: '20px', borderRadius: '20px', fontFamily: 'Lexend', fontSize: '15px', boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)', border: 'none', cursor: 'pointer', color: selectedButton === "Lunch" ? '#FFFFFF' : '#000000' }}>Lunch</button>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <button onClick={() => handleButtonClick("Movies")} style={{ marginRight: '10px', backgroundColor: selectedButton === "Movies" ? '#E4423F' : '#FFFFFF', stroke: 'CECECE', width: '90px', padding: '20px', borderRadius: '20px', fontFamily: 'Lexend', fontSize: '15px', boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)', border: 'none', cursor: 'pointer', color: selectedButton === "Movies" ? '#FFFFFF' : '#000000' }}>Movies</button>
                    <button onClick={() => handleButtonClick("Custom")} style={{ backgroundColor: selectedButton === "Custom" ? '#E4423F' : '#FFFFFF', stroke: 'CECECE', width: '90px', padding: '20px', borderRadius: '20px', fontFamily: 'Lexend', fontSize: '15px', boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)', border: 'none', cursor: 'pointer', color: selectedButton === "Custom" ? '#FFFFFF' : '#000000' }}>Custom</button>
                </div>
                <div>
                    <button onClick={() => handleButtonClick("Ask date to suggest")} style={{ marginLeft: '15px', backgroundColor: selectedButton === "Ask date to suggest" ? '#E4423F' : '#FFFFFF', stroke: 'CECECE', width: '150px', padding: '15px', borderRadius: '20px', fontFamily: 'Lexend', fontSize: '15px', boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)', border: 'none', cursor: 'pointer', color: selectedButton === "Ask date to suggest" ? '#FFFFFF' : '#000000' }}>Ask date to suggest</button>
                </div>
            </div>

            <div>
                <button className='nextButton' onClick={() => handleNextButton(user)}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: '#E4423F',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '18px',
                        width: '100px',
                        cursor: 'pointer',
                        marginTop: '56px',
                        marginLeft: '140px',
                        color: 'white',
                        fontFamily: 'Lexend',

                    }}>Next</button>
            </div>

        </div>
    );
}

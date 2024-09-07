import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './SelectPlace.css';

export default function SelectPlace() {
    const location = useLocation();
    const { user, selectedDay, selectedTime, AccountUser = [] } = location.state || {};
    const navigate = useNavigate();

    const [selectedButton, setSelectedButton] = useState("");

    // Define the date ideas array
    const dateIdeas = [
        "Dinner", "Drinks", "Coffee", "Lunch", "Movies", "Custom", "Ask date to suggest"
    ];

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    };

    const handleNextButton = () => {
        navigate('/nextLocation', {
            state: {
                user,
                selectedDay,
                selectedTime,
                selectedDateIdea: selectedButton,
                AccountUser
            }
        });
    }

    const renderDateIdeaButtons = () => {
        return dateIdeas.map((idea, index) => (
            <button
                key={index}
                onClick={() => handleButtonClick(idea)}
                style={{
                    backgroundColor: selectedButton === idea ? '#E4423F' : '#FFFFFF',
                    color: selectedButton === idea ? '#FFFFFF' : '#000000',
                    stroke: 'CECECE',
                    width: idea === "Ask date to suggest" ? '150px' : '90px',
                    padding: idea === "Ask date to suggest" ? '15px' : '20px',
                    borderRadius: '20px',
                    fontFamily: 'Lexend',
                    fontSize: '15px',
                    boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    margin: '5px'
                }}
            >
                {idea}
            </button>
        ));
    }

    return (
        <div className='simulate-mobile'>
            <div className='title' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <img
                        src={AccountUser[0]?.src}
                        alt='Account User'
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid white',
                            position: 'relative',
                            zIndex: 1
                        }}
                    />
                    <img
                        src={user.src}
                        alt='Matched User'
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid white',
                            position: 'relative',
                            marginLeft: '-15px', // Overlap the images
                            zIndex: 0
                        }}
                    />
                </div>
                <h2 className='userName' style={{ fontSize: '15px', marginTop: '35px', fontFamily: 'Lexend' }}>{user.name}</h2>
            </div>
            <div>
                <h3 className='titleText' style={{ textAlign: 'center', marginTop: '70px', fontFamily: 'Lexend' }}>Let's meet up on<br /> <span style={{ color: '#E4423F' }}>{selectedDay} {selectedTime}</span>, and go to <span style={{ color: '#E4423F' }}> _</span></h3>
                <p className='paraText' style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', fontFamily: 'Lexend', fontWeight: 'lighter' }}>Select a pre-filled date idea or suggest your own</p>
            </div>
            <div className="dateIdeaButtons" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px 10px', marginTop: '25px', marginLeft: '50px' }}>
                {renderDateIdeaButtons()}
            </div>
            <div>
                <button
                    className='nextButton'
                    onClick={handleNextButton}
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
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
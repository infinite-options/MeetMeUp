import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useLocation } from 'react-router-dom';
import './UserDetails.css';
import MatchPopUp from './MatchPopUp';

const MatchDetails = () => {
    const location = useLocation();
    const { user, source } = location.state || {};

    console.log("User:", user);
    console.log("Source:", source);

    const [isRightHeartFilled, setIsRightHeartFilled] = useState(source === 'usersWhoYouSelected');
    const [showPopup, setShowPopup] = useState(false); 

    const popupRef = useRef(null);

    const isLeftHeartVisible = source === 'usersWhoSelectedYou';

    const handleRightHeartClick = () => {
        const newHeartState = !isRightHeartFilled;
        setIsRightHeartFilled(newHeartState);

        
        if (isLeftHeartVisible && newHeartState) {
            setShowPopup(true);
        } else {
            setShowPopup(false); 
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false); 
    };

    const navigate = useNavigate();

    const handleEditPreferences = () => {
        navigate('/matchPreferences');
      }

    const handleBackClick = () => {
        window.history.back(); 
    };

    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                handleClosePopup();
            }
        };   
        if (showPopup) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPopup]);

    return (
        <div className='simulate-mobile'>
          
            {isLeftHeartVisible && isRightHeartFilled && showPopup && (
                <div className='popup'>
                    <div className='popup-content' ref={popupRef}>
                        <MatchPopUp user={user}/>
                    </div>
                </div>
            )}

            <div className='userDetails'>
                <div className='userImg'>
                    {isLeftHeartVisible && (
                        <div
                            className='heartIcon left-heart'
                            style={{ cursor: 'default', fontSize: '24px', position: 'absolute', left: '10px', top: '10px' }}
                        >
                            <FontAwesomeIcon icon={solidHeart} color='#E4423F' />
                        </div>
                    )}

                    <div
                        className='heartIcon right-heart'
                        onClick={handleRightHeartClick}
                        style={{ cursor: 'pointer', fontSize: '24px', position: 'absolute', left: '335px', top: '10px' }}
                    >
                        <FontAwesomeIcon
                            icon={isRightHeartFilled ? solidHeart : regularHeart}
                            color={isRightHeartFilled ? '#E4423F' : '#E4423F'}
                        />
                    </div>

                    <img src={user.src} alt='img' height={440} />
                    <div className='detailsOnImg'>
                        <p style={{ justifyContent: 'center' }}>{user.name}</p>
                        <p style={{ marginTop: '-10px', display: 'flex', justifyContent: 'center' }}>{user.age}-{user.gender}</p>
                    </div>
                </div>

                <h4 className='tap'>Tap to see profile</h4>
            </div>
            <div className='userButtons'>
                <button className='backButton' onClick={handleBackClick}>Back</button>
                <button className='preferenceButton' onClick={() => { handleEditPreferences()}}>Preferences</button>
                <button className='logoutButton'>Logout</button>
            </div>
        </div>
    );
};

export default MatchDetails;

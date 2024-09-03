import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useLocation } from 'react-router-dom';
import './UserDetails.css';

const UserDetails = () => {
    const location = useLocation();
    const { user } = location.state;

    const [isFilled, setIsFilled] = useState(false);

    const handleHeartClick = () => {
        setIsFilled(!isFilled); // Toggle the filled state
    };

    return (
        <div className='simulate-mobile'>
            <div className='userDetails'>
                <div className='userImg'>
                    <img src={user.src} alt='img' height={440} />
                    <div className='detailsOnImg'>
                        <p style={{justifyContent:'center'}}>{user.name}</p>
                        <p style={{marginTop:'-10px', display:'flex',justifyContent:'center'}}>{user.age}-{user.gender}</p>
                    </div>
                    <div className='heartIcon' onClick={handleHeartClick} style={{ cursor: 'pointer', fontSize: '24px', marginLeft: '290px' }}>
                        <FontAwesomeIcon icon={isFilled ? solidHeart : regularHeart} color={isFilled ? '#14181B' : 'black'} />
                    </div>
                </div>

                <h4 className='tap'>Tap to see profile</h4>
            </div>
            <div className='userButtons'>
                <button className='backButton'>Back</button>
                <button className='preferenceButton'>Preferences</button>
                <button className='logoutButton'>Logout</button>
            </div>


            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
        </div>
    );
};

export default UserDetails;
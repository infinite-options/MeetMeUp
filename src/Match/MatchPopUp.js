import React from 'react';
import { useNavigate } from 'react-router-dom';






export default function MatchPopUp({ user, AccountUser }) {
    const navigate = useNavigate();

    //console.log("account user img:", AccountUser[0].src)
    //console.log("user img:", user)

    const handleBegin = (user) => {
        navigate('/begin', { state: { user, AccountUser } });
    }

    console.log("matchpopup:", user)
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '-10px' }}>
                <img
                    src={AccountUser[0].src}
                    alt='Account User '
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid white',
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
                        marginLeft: '-15px', 
                        zIndex: 0
                    }}
                />
            </div>
            <h3 className='matchText' style={{ color: '#E4423F' }}>It's A Match!</h3>
            <p>Let's start by creating a date with <br />{user.name} and you </p>
            <button className='beginButton' onClick={() => handleBegin(user)}
                style={{
                    color: 'white',
                    backgroundColor: '#E4423F',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '18px',
                    width: '100px',
                    fontSize: '15px',
                    cursor: 'pointer'
                }}>Begin!</button>
            <p style={{ color: '#E4423F' }}>Keep matching</p>
        </div>
    )
}
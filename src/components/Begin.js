import React from 'react';
import { useLocation } from 'react-router-dom';
import './Begin.css';

export default function Begin() {
  const location = useLocation();
  const { user } = location.state || {}; 

  console.log("Begin:", user);

  return (
    <div className='simulate-mobile'>
      <div className='title' style={{display: 'flex', flexDirection:'row', justifyContent:'center', gap:'15px', marginTop:'20px' }}>
        <img className='userImg' src={user.src} alt='userImg'style={{width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}/>
        <h2 className='userName'style={{fontSize:'15px', marginTop:'35px'}}>{user.name}</h2>
      </div>
      <div>
        <h1 className='titleText'style={{textAlign:'center', marginTop:'70px'}}>Let's meet up on <span style={{color:'#E4423F'}}>___</span> </h1>
        <p className='paraText'style={{textAlign:'center', marginTop:'40px', fontSize:'15px'}}><span style={{fontWeight:'bold'}}>Pick your dates</span> and see which ones align with your match. <span style={{fontWeight:'bold'}}>Show </span> your <span style={{fontWeight:'bold'}}>match </span> all your <span style={{fontWeight:'bold'}}>date availability</span> by selecting <span style={{fontWeight:'bold'}}>multiple date</span> and <span style={{fontWeight:'bold'}}>times</span> and <span style={{fontWeight:'bold'}}>fast track</span> the scheduling for your <span style={{fontWeight:'bold'}}>match</span> and your <span style={{fontWeight:'bold'}}>date.</span></p>
      </div>
      <div>
        <button className='nextButton' 
        style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#E4423F',
            border: 'none',
            padding: '10px',
            borderRadius: '18px',
            width: '100px',
            cursor: 'pointer',
            marginTop: '280px',
            marginLeft: '140px',
            color: 'white',
            fontFamily: 'Lexend',

        }}>Next</button>
      </div>
    </div>
  );
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectionResults.css'; 
import HawkImg from '../images/Hawk.jpg'
import TiffanyImg from '../images/Tiffany.jpeg'
import ButterflyImg from '../images/Butterfly.jpg'
import CherryImg from '../images/Cherry.jpg'
import BobImg from '../images/Bob.jpg'

const matchedResults =[
    
];

const usersWhoSelectedYou = [
  { name: 'Hawk Tuah Tey', age: 40, gender: 'female', src: HawkImg  },
];

const usersWhoYouSelected = [
  { name: 'Tiffany', age: 31, gender: 'female', src: TiffanyImg },
  { name: 'Bob Hawk', age: 43, gender: 'male', src: BobImg },
  { name: 'Esmeralda Butterfly', age: 29, gender: 'female', src: ButterflyImg },
  { name: 'cherrywood', age: 23, gender: 'female', src: CherryImg},
];

const SelectionResults = () => {
  const navigate = useNavigate();

  const handleUserClick = (user) => {
    const userName = encodeURIComponent(user.name);
    navigate(`/user-details/${userName}`, { state: { user } });
  };

  return (
    <div className='simulate-mobile'>
    <div className="selection-results-container">
      <h2>Selection Results</h2>
      <div className="section">
        <h4 style={{color:'grey'}}>Matched Results</h4>
        {matchedResults.map((user, index) => (
          <div key={index} className="user-card" >
            <img src={user.src} alt={user.name} className="user-avatar" />
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-age-gender">{user.age} {user.gender}</span>
            </div>
            <button className="navigate-button" onClick={() => handleUserClick(user)}>➔</button>
          </div>
        ))}
      </div>
      <div className="section">
        <h4 style={{color:'grey'}}>People who selected you</h4>
        {usersWhoSelectedYou.map((user, index) => (
          <div key={index} className="user-card" >
            <img src={user.src} alt={user.name} className="user-avatar" />
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-age-gender">{user.age} {user.gender}</span>
            </div>
            <button className="navigate-button" onClick={() => handleUserClick(user)}>➔</button>
          </div>
        ))}
      </div>
      <div className="section">
        <h4 style={{color:'grey'}}>People who you selected</h4>
        {usersWhoYouSelected.map((user, index) => (
          <div key={index} className="user-card" >
            <img src={user.src} alt={user.name} className="user-avatar" />
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-age-gender">{user.age} {user.gender}</span>
            </div>
            <button className="navigate-button" onClick={() => handleUserClick(user)}>➔</button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default SelectionResults;

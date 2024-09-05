import React from 'react';
import { useNavigate } from 'react-router-dom';






export default function MatchPopUp({user}){
    const navigate = useNavigate();

    const handleBegin=(user)=>{
        navigate('/begin', { state: { user } }); 
    }

    console.log("matchpopup:", user)
    return(
        <div>
            <img src={user.src} alt='MatcheduserImg'
            style={{
                width: '50px',   
                height: '50px',  
                borderRadius: '50%', 
                objectFit: 'cover',  
                display: 'block',    
                margin: '0 auto'    
            }}/>
            <h3 className='matchText' style={{color:'#E4423F'}}>It's A Match!</h3>
            <p>Let's start by creating a date with <br/>{user.name} and you </p>
            <button className='beginButton' onClick={()=>handleBegin(user)}
            style={{
                color:'white',
                backgroundColor:'#E4423F', 
                border:'none', 
                padding:'10px', 
                borderRadius:'18px', 
                width:'100px', 
                fontSize:'15px', 
                cursor:'pointer'
                }}>Begin!</button>
            <p style={{color:'#E4423F'}}>Keep matching</p>
        </div>
    )
}
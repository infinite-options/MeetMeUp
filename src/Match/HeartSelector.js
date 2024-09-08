import { Button, Stack } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
// TODO: also make the img mui so that its vectors, pngs is making the content blurry  - store inside an iconbutton for transition :)
// TODO: make a heart selector so that heart selection will be handled in one component and so that a popup will show up
// needed because this shows up in multiple pages
// isLiked is if someone likes you, liked means that you liked them (i want to make the variable names smaller)
export default function HeartSelector({ user, AccountUser, isLiked }) {
    const navigate = useNavigate();
    return (
        <div>
            {isLiked && liked && showPopup && (
            <div className='popup'>
                <div className='popup-content' ref={popupRef}>
                    <MatchPopUp user={user} AccountUser={AccountUser}/>
                        </div>
                    </div>
                )}
            <img src={liked ? like : likedImg} style={{position:"absolute", right:"2%", top:"1%"}}></img>
        </div>
    )
}
import { Box, Button, Grid, Grid2, TextField, Typography, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopTitle from "../Assets/Components/TopTitle";

const Message = () => {
    const location = useLocation();
    const { user } = location.state || {};

    const userId = localStorage.getItem('user_uid')
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("");
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/selectionResults")
    }

    useEffect(() => {
        axios.get('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/messages', {
            params: {
                sender_id: userId,
                receiver_id: user.user_uid,
            },
        })
            .then(res => {
                console.log(res.data.result)
                setMessages(res.data.result)
            })
    }, [])

    // const handleSendMessage = () => {
    //     if (newMessage.trim() === "") return;

    //     axios.post('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/messages', {
    //         sender_id: userId,
    //         receiver_id: user.user_uid,
    //         message_content: newMessage,
    //     }, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then(res => {
    //             console.log("Message sent:", res.data);
    //             setMessages(prev => Array.isArray(prev) ? [...prev, { message_content: newMessage, message_sender_user_id: userId }] : [{ message_content: newMessage, message_sender_user_id: userId }]);
    //             setNewMessage("");
    //         })
    //         .catch(error => {
    //             console.error("Error sending message:", error);
    //         });
    // };

    const handleSendMessage = () => {
        if (newMessage.trim() === "") return;

        axios.post('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/messages', {
            sender_id: userId,
            receiver_id: user.user_uid,
            message_content: newMessage,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                console.log("Message sent:", res.data);
                setMessages(prev => Array.isArray(prev) ? [...prev, { message_content: newMessage, message_sender_user_id: userId }] : [{ message_content: newMessage, message_sender_user_id: userId }]);
                setNewMessage("");
            })
            .catch(error => {
                console.error("Error sending message:", error);
            });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log("ENTERED")
            handleSendMessage();
        }
    };

    return (
        <Box sx={{ marginLeft: "15%", marginRight: "15%", height: "100vh", display: "flex", flexDirection: "column" }}>
            <TopTitle title={user.user_first_name + ' ' + user.user_last_name} />
            <Box sx={{
                height: "calc(100vh - 200px)", 
                overflowY: "auto",
                marginBottom: "20px",
                padding: "20px",
                borderRadius: "10px",
                //backgroundColor: "#f5f5f5", 
                //boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)" 
            }}>
                {messages && messages.map((message, index) => (
                    <Box key={index} sx={{
                        display: "flex",
                        justifyContent: message.message_sender_user_id === userId ? 'flex-end' : 'flex-start',
                        marginBottom: "10px"
                    }}>
                        <Typography sx={{
                            backgroundColor: message.message_sender_user_id === userId ? '#EDEDED' : '#E4423F',
                            color: message.message_sender_user_id === userId ? 'black' : 'white',
                            padding: "15px",
                            borderRadius: "20px",
                            fontSize: '15px',
                            maxWidth: "70%", 
                            wordWrap: "break-word" 
                        }}>
                            {message.message_content}
                        </Typography>
                    </Box>
                ))}
            </Box>
            <Box sx={{ position: "fixed", bottom: 100, left: "15%", width: "70%", display: "flex", alignItems: "center" }}>
                <TextField
                    value={newMessage}
                    autoComplete="off"
                    placeholder="Type your message"
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    sx={{ flex: 1, marginRight: "10px" }}
                />
                <IconButton onClick={handleSendMessage}  >
                    <SendIcon style={{color:"#E4423F"}} />
                </IconButton>
            </Box>
            <Grid2 container justifyContent="center">
                <Button onClick={handleNavigate} sx={{ position: "fixed", bottom: 20, width: "150px", backgroundColor: "#E4423F", borderRadius: "25px", height: "45px", color: "white", mb: "20px", textTransform: "none", fontFamily: "Segoe UI", fontSize: "18px", fontWeight: "regular" }}>
                    My Matches
                </Button>
            </Grid2>
        </Box>
    );
}

export default Message;
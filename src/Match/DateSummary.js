import React from "react";
import { useLocation } from 'react-router-dom';
import EditIcon from "../Assets/Images/EditIcon.png";

export default function DateSummary() {

    const location = useLocation();
    const { user, selectedDay, selectedTime, selectedDateIdea } = location.state || {};

    
    const EditableItem = ({ label, value }) => {
        return (
            <div style={styles.itemContainer}>
                <span style={styles.label}>{label}</span>
                <div style={styles.valueContainer}>
                    <span style={styles.value}>{value}</span>
                    <span style={styles.icon}><img src={EditIcon}/></span>
                </div>
            </div>
        );
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '290px',
            marginLeft:'50px',
        },
        itemContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f8f8f8',
            borderRadius: '20px',
            padding: '10px 15px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        label: {
            fontFamily:'Lexend',
            fontSize: '14px',
        },
        valueContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
        },
        value: {
            fontFamily:'Lexend',
            fontSize: '14px',
            color: '#555',
        },
        icon: {
            cursor: 'pointer',
            fontSize: '14px',
        },
    };


    return (
        <div>
            <div>
                <h3 style={{ fontWeight: "lighter", fontFamily: 'Lexend', textAlign: 'center' }}>{user.name}</h3>
            </div>
            <div>
                <p style={{ padding: '25px', fontFamily: 'Lexend', fontSize: '23px', textAlign: 'center', marginTop: '160px' }}>Let's meet up on <span style={{ color: '#E4423F' }}>{selectedDay} {selectedTime},</span> and go to <span style={{ color: '#E4423F' }}>{selectedDateIdea}</span> at the <span style={{ color: '#E4423F' }}>Vapiano's </span></p>
            </div>
            <div style={styles.container}>
                <EditableItem label="Date & Time" value= {`${selectedDay} ${selectedTime}`} />
                <EditableItem label="Date Theme" value= {selectedDateIdea} />
                <EditableItem label="Location" value="Vapiano's" />
            </div>
        </div>
    )
}
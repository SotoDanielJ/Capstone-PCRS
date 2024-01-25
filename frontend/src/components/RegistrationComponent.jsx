/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Login from "./LoginComponent";

const Registration = () => {

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    };

    const registrationContainer = {
        display: 'flex',
        flexDirection: 'column',
    };

    const registrationBox = {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        border: '2px solid white',
        background: 'linear-gradient(to top, #da1b60 , gold)',
        boxShadow: '0 0 4vh rgb(34,255,255)',
        width: "30.3vw",
        height: "75vh",
        borderRadius: '15px',
        marginBottom: '3vh',
        paddingLeft: '1vh'
    };

    const registrationInfo = {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        marginBottom: '2vh',
        width: '10vw',
        marginLeft: '1vw'
    };
    const infoStyle = {
        width: '13vw',
    }
    const promptStyle = {
        width: '15vw',
        textAlign: 'left',
        color: 'white',
        marginTop: '0.5vh',
        marginBottom: '0.5vh', 
    }
    
    const buttonHolder = {
        display:'flex',
        justifyContent:'space-between',
        padding:'0 2vw'
    }

    const buttonStyle = {
        backgroundColor: '#00C3FF', 
        width: '6vw', 
        borderRadius: '10px', 
        border: '2px solid white', 
        fontWeight: 'bold', 
        fontSize: '20px'
    }
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [setupDescription, setSetupDescription] = useState('');
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);

    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };
    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleSubmit = async () => {
        const userData = { firstName, lastName, dob, email, username, password, bio, setupDescription };

        try {
            const response = await fetch('http://localhost:8080/api/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
                
            })
            

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            console.log(result);
            setShowLogin(true);
            setIsOpen(false);

            
        } catch (error) {
            console.error('Error during user registration:', error);
        }
    };


    

    return (
        <div>
            {isOpen && (
                <div style={overlayStyle}>
                    <div style={registrationContainer}>
                            <p style={{ fontWeight: 'bold', fontSize: '1.5em', marginBottom: '1vh', color: 'white' }}>Please create an account to continue.</p>
                        <div style={registrationBox}>
                            <div style={registrationInfo}>
                               

                                    <p style={promptStyle}>Enter Your First Name<span style={{ color: 'red' }}>* Required</span></p>
                                    <input type="text" placeholder="first name" required style={infoStyle} onChange={handleInputChange(setFirstName)}/>
                                    <p style={promptStyle}>Enter Your Last Name<span style={{ color: 'red', alignItems: 'right' }}>* Required</span></p>
                                    <input type="text" placeholder="last name" required style={infoStyle} onChange={handleInputChange(setLastName)}/>
                                    <p style={promptStyle}>Enter Your Date of Birth<span style={{ color: 'red' }}>* Required</span></p>
                                    <input type="date" placeholder="dob" required style={infoStyle} onChange={handleInputChange(setDob)}/>
                                    <p style={promptStyle}>Enter Your Email Address<span style={{ color: 'red' }}>* Required</span></p>
                                    <input type="email" placeholder="email" required style={infoStyle} onChange={handleInputChange(setEmail)} />
                                    <p style={promptStyle}>Create a Username<span style={{ color: 'red' }}>* Required</span></p>
                                    <input type="text" placeholder="username" required style={infoStyle} onChange={handleInputChange(setUsername)} />
                                    <p style={promptStyle}>Create a Password<span style={{ color: 'red' }}>* Required</span></p>
                                    <input type="password" placeholder="password" required style={infoStyle} onChange={handleInputChange(setPassword)} />

                                    <p style={{ ...promptStyle, width: '27vw' }}>Enter a Bio... Let The Community Get to Know You!</p>
                                    <textarea id="message" name="message" style={{ maxWidth: '27vw', minWidth:'27vw', minHeight: '100px', maxHeight:'100px' }} onChange={handleInputChange(setBio)}></textarea>
                                    <p style={{ ...promptStyle, width: '27vw' }}>Tell Us About Your Set-Up... Let The Community Know What You're Working With!</p>
                                    <textarea id="message" name="message" style={{ maxWidth: '27vw', minWidth:'27vw', minHeight: '100px', maxHeight:'100px' }} onChange={handleInputChange(setSetupDescription)}></textarea>
                                

                            </div>

                        </div>
                        <div>

                        </div>
                        <div style={buttonHolder}>
                            <button style={buttonStyle} onClick={handleSubmit}>Create</button>
                            
                            <button style={{...buttonStyle, backgroundColor:'#D300AE'}} onClick={handleClose}>Close</button>
                        </div>
                        
                    </div>
                </div>
            )}
            {showLogin && <Login />}
        </div>
    );
};

export default Registration
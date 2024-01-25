/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { getCookie } from "../../context/cookieUtils";
import axios from "axios";

const UpdateComponent = () => {

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
        height: "70vh",
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
        width: '10vw',
    }
    const promptStyle = {
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
    const [email, setEmail] = useState('')
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [setupDescription, setSetupDescription] = useState('');
    const userDataString = getCookie('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const username = userData ? userData.username : null
    

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/${username}`, {
                withCredentials: true 
            });
    
            const userData = response.data; 
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setPassword(userData.password)
            setEmail(userData.email)
            setBio(userData.bio)
            setSetupDescription(userData.setupDescription)
            
        } catch (error) {
            console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        }
    };
    useEffect(() => {
        fetchUserData();
    }, []); 

    const handleSubmit = () => {
        const apiUrl = `http://localhost:8080/api/users/update/personal/${username}`;
        const payload = { firstName, lastName, dob, password, email, bio, setupDescription };
        console.log(payload)
        console.log(username)
        
    
        axios.put(apiUrl, payload, { withCredentials: true })
            .then(response => {
                console.log('Information updated successfully', response.data);
            
            
            })
            .catch(error => {
                console.error('Error updating info:', error);
            });
            setIsOpen(false);
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            {isOpen && (
                <div style={overlayStyle}>
                    <div style={registrationContainer}>
                            
                        <div style={registrationBox}>
                            <div style={registrationInfo}>
                                

                                    <p style={promptStyle}>First Name</p>
                                    <input type="text" value={firstName} onChange={handleInputChange(setFirstName)} placeholder="First Name" style={infoStyle} />
                                    <p style={promptStyle}>Last Name</p>
                                    <input type="text" value={lastName} placeholder="last name" required style={infoStyle} onChange={handleInputChange(setLastName)}/>
                                    <p style={promptStyle}>Date of Birth</p>
                                    <input type="date" value={dob} placeholder="dob" required style={infoStyle} onChange={handleInputChange(setDob)}/>
                                    <p style={promptStyle}>Email Address</p>
                                    <input type="email" value={email} placeholder="email" required style={infoStyle} onChange={handleInputChange(setEmail)} />
                                    <p style={promptStyle}>User Bio: </p>
                                    <textarea id="message" value={bio} name="message" style={{ width: '27vw', height: '100px' }} onChange={handleInputChange(setBio)}></textarea>
                                    <p style={promptStyle}>Setup Description: </p>
                                    <textarea id="message" value={setupDescription} name="message" style={{ width: '27vw', height: '100px' }} onChange={handleInputChange(setSetupDescription)}></textarea>
                               

                            </div>

                        </div>
                        <div>

                        </div>
                        <div style={buttonHolder}>
                            
                        <button style={{...buttonStyle, backgroundColor:'#00C3FF'}} onClick={handleSubmit}>Update</button>
                            <button style={{...buttonStyle, backgroundColor:'#D300AE'}} onClick={handleClose}>Close</button>
                        </div>
                        
                    </div>
                </div>
            )}
           
        </div>
    );
};
export default UpdateComponent
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { setCookie } from '../context/cookieUtils';

const Login = () => {
    const navigate = useNavigate();
    const [localUsername, setLocalUsername] = useState(''); 
    const [password, setPassword] = useState('');

    const {setUsername: setContextUsername } = useContext(AuthContext)
    const {setIsLoggedIn: setContextLoggedIn} = useContext(AuthContext)

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/login', { username: localUsername, password });
            const userData = response.data;
            setCookie('userData', JSON.stringify(userData));
            setContextLoggedIn(true);
            setContextUsername(userData.username); 
            

            navigate(`/profile/${userData.username}`);
        } catch (error) {
            console.error("Login failed: ", error);
        }
    };

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

    const loginContainer = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const loginBox = {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to top, #da1b60 , gold)',
        width: "30vw",
        height: "35vh",
        borderRadius: '15px',
        marginBottom: '2vh',
    };

    const loginCred = {
        display: 'flex',
        flexDirection: 'column',
        gap: '2vh',
        marginBottom: '2vh',
        width: '15vw',
    };


    const [showLoginOption, setLoginOption] = useState(false);

    const handleLoginViewButtonClick = () => {
        setLoginOption(!showLoginOption);
    };

    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            {isOpen && (
                <div style={overlayStyle}>
                    <div style={loginContainer}>
                        <div style={loginBox}>
                            <p style={{ fontWeight: 'bold', fontSize: '30px', marginBottom: '20px' }}>WELCOME</p>
                            <div style={loginCred}>
                                <input style={{borderRadius:'10px', height:'2vh', border:'1px solid white', padding:'2px'}} type="text" placeholder="Username" onChange={e => setLocalUsername(e.target.value)} />
                                <input style={{borderRadius:'10px', height:'2vh', border:'1px solid white', padding:'2px'}}type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                            </div>
                            <button onClick={handleLogin} style={{ backgroundColor: '#00C3FF', width: '6vw', borderRadius: '10px', border: '2px solid white', fontWeight:'bold', fontSize:'20px' }}>Login</button>
                        </div>
                        <div>

                        </div>
                        <div>
                                <button style={{backgroundColor: '#D300AE', width: '4vw', borderRadius: '10px', border: '2px solid white', display:'flex', justifyContent:'center'}} onClick={handleClose}>
                                    Close
                                </button>
                            </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
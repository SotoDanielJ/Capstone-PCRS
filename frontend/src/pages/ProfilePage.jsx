// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

import UserRecComponent from '../components/profileComponents/UserRecComponent';
import { getCookie } from '../context/cookieUtils';
import ThemeSelector from '../components/profileComponents/ThemeSelector';
import ThemeColors from '../components/profileComponents/ThemeColors'
import axios from 'axios';
import Avatar from '../components/profileComponents/avatar.png'
import PostComponent from '../components/profileComponents/PostComponent'


const ProfilePage = () => {

    const [userData, setUserData] = useState({
        username: '',
        bio: '',
        setupDescription: '',
        followerCount: 0,
        followingCount: 0,
        themeColorPref: 1,
    });
    const [boxShadowColor, setBoxShadowColor] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [showThemeSelector, setShowThemeSelector] = useState(false);
    
    const fetchUserData = async () => {
        try {
            const userDataString = getCookie('userData');
            if (userDataString) {
                const parsedUserData = JSON.parse(userDataString);
                const response = await axios.get(`http://localhost:8080/api/users/${parsedUserData.username}`, { withCredentials: true });
                setUserData(response.data);
                setSelectedColor(ThemeColors[response.data.themeColorPref].code);
                setBoxShadowColor(ThemeColors[response.data.themeColorPref].code);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUpdatedThemeData = async () => {
        try {
            const userDataString = getCookie('userData');
            if (userDataString) {
                const parsedUserData = JSON.parse(userDataString);
                const apiUrl = `http://localhost:8080/api/users/${parsedUserData.username}`;

                const response = await axios.get(apiUrl, { withCredentials: true });
                const updatedUserData = response.data;


                if (updatedUserData.themeColorPref >= 0 && updatedUserData.themeColorPref < ThemeColors.length) {
                    setSelectedColor(ThemeColors[updatedUserData.themeColorPref].code);
                } else {
                    console.warn('Invalid themeColorPref:', updatedUserData.themeColorPref);
                }
            }
        } catch (error) {
            console.error('Error fetching updated user data:', error);
        }
    };

    const updateThemeColor = async (colorIndex, username) => {
        try {
            const userDataString = getCookie('userData');

            if (userDataString) {

                const parsedUserData = JSON.parse(userDataString);
                const apiUrl = `http://localhost:8080/api/users/update/theme/${parsedUserData.username}`;
                const payload = { themeColorPref: colorIndex };

                await axios.put(apiUrl, payload, { withCredentials: true });

            }
            await fetchUpdatedThemeData(username);
        } catch (error) {
            console.error('Error updating theme color:', error);
        }
    };

    useEffect(() => {
        fetchUpdatedThemeData();
    }, []);

    useEffect(() => {
        setBoxShadowColor(selectedColor);
    }, [selectedColor]);


    const handleThemeColorSelect = (color) => {
        setSelectedColor(color);
        const colorIndex = ThemeColors.findIndex(themeColor => themeColor.code === color);
        updateThemeColor(colorIndex);
    };

    const profileStyle = {
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: 'row',
        textAlign: "center",
        backgroundColor: 'black',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
    }

    const leftBox = {
        display: "flex",
        flexDirection: 'column',
        paddingTop: '10vh',
        alignItems: 'center',
        height: "100vh",
        width: "25vw",

    }

    const pfpHolder = {
        display: "flex",
        backgroundColor:`${boxShadowColor}`,
        height: '25vh',
        width: '25vh',
        borderRadius: '50%',
        border: 'solid 7px white',
        marginBottom: '4.5vh',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        backgroundImage: `url(${Avatar})`, 
        backgroundSize:'75%'
    }

    
    const middleBox = {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: `0 0 10px 1px ${boxShadowColor}`,
        padding: '0 1vw',
        height: "100vh",
        width: "50vw",
    }
    const rightBox = {
        display: "flex",
        flexDirection: 'column',
        paddingTop: '8vh',
        alignItems: 'center',
        height: "100vh",
        width: "25vw",
    }
    const followBlockContainer = {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        height: "35vh",
        width: "50vw",
    }
    const followDisplay = {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: "17vh",
        width: "25vw",
        fontFamily:'arial'
    }
    const followDisplayButtons = {
        display: "flex",
        backgroundColor: 'white',
        boxShadow: 'inset 10px 7px 6px #C8C8C8, inset -10px -7px  6px #C8C8C8',
        borderRadius: '7px',
        height: "5vh",
        width: "15vw",
        color: 'black',
        fontSize: '1em',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5vh'
    }
    const setupDesc = {
        display: 'flex',
        boxShadow: `0 0 10px 1px ${boxShadowColor}`,
        justifyContent: 'center',
        height: '36vh',
        width: '20vw',
        borderRadius: '1vw',
        textAlign:'left',
        marginBottom: '2vh',
        
    }
    const recHolder = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '48vh',
        width: '20vw',
        borderRadius: '1vw',
        boxShadow: `0 0 10px 1px ${boxShadowColor}`,
        marginBottom: '4vh',
    }

    const infoContainer = {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: '7vh',
        height: "31vh",
        width: "47vw",
    }
    const usernameDisplay = {
        display: 'flex',
        width: '50vw',
        height: '6vh',
        marginTop: '1vh',
        alignItems: 'center',
        color: 'white',
    }

    const bioDisplay = {
        display: 'flex',
        width: '50vw',
        height: '10vh',
        padding: '0 1.5vw',
        color: 'white',
        alignItems: 'center',
        textAlign: 'left',
    }

    return (
        <div style={profileStyle}>

            <div style={leftBox}>
                <div style={pfpHolder}></div>
                <div style={followBlockContainer}>
                    <div style={followDisplay}>
                        <div style={followDisplayButtons}><span style={{marginRight:'0.8vw', fontWeight:'bold'}}>FOLLOWING</span>{userData.followingCount}</div>
                        <div style={followDisplayButtons}><span style={{marginRight:'0.8vw', fontWeight:'bold'}}>FOLLOWERS</span>{userData.followerCount}</div>
                        <button style={{ ...followDisplayButtons, color:'white',marginTop: '2vh', width: '8vw', height: '2.5vh', borderRadius: '20px',backgroundColor: 'grey', boxShadow:'none',border:' 2px solid white' }} onClick={() => setShowThemeSelector(true)}>CUSTOM</button>
                        {showThemeSelector && <ThemeSelector
                            onSelectColor={handleThemeColorSelect}
                            onClose={() => setShowThemeSelector(false)}
                            themeColors={ThemeColors}
                        />}
                    </div>

                </div>
            </div>

            <div style={middleBox}>
                <div style={infoContainer}>

                    <div style={usernameDisplay}><p style={{fontSize:'2em'}}>{userData.username ? <p> {userData.username}</p> : <p>Loading Username</p>}</p></div>
                    <div style={bioDisplay}><p style={{ lineHeight: '2.5vh', fontFamily:'arial' }}>{userData.bio ? <p>{userData.bio}</p> : <p>Loading bio...</p>}</p></div>

                </div>
                
                <PostComponent />
                
            </div>

            <div style={rightBox}>
                <div style={setupDesc}><p style={{ color: 'white', margin: '0.7vw', overflow:'auto', fontFamily:'arial', fontSize:'0.8em', lineHeight:'2.3vh' }}>{userData.setupDescription ? <p> {userData.setupDescription} </p> : <p>Loading Setup description...</p>}</p></div>
                <div style={recHolder}>
                    <UserRecComponent />
                </div>
            </div>
        </div>


    )
}
export default ProfilePage
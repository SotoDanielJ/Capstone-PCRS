// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useCallback, useContext } from 'react';
import SearchedUserPostComponent from '../components/searchedUserPostComponent';
import UserRecComponent from '../components/profileComponents/UserRecComponent';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ThemeColors from '../components/profileComponents/ThemeColors'
import Avatar from '../components/profileComponents/avatar.png'



const SearchedProfilePage = (props) => {


    const location = useLocation();
    const { searchedUser } = location.state || {};
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { username } = useContext(AuthContext);
    const themeColor = searchedUser?.themeColorPref || '5';
    const [selectedColor, setSelectedColor] = useState('');

    const getColorFromIndex = (index) => {
        if (index >= 0 && index < ThemeColors.length) {
            return ThemeColors[index].code;
        }
        return 'defaultColor';
    };

    useEffect(() => {
        if (themeColor >= 0 && themeColor < ThemeColors.length) {
            setSelectedColor(ThemeColors[themeColor].code);
        }
    }, [themeColor]);


    const checkFollowStatus = useCallback(async () => {
        const followerName = username;
        const followeeName = searchedUser?.username;

        try {
            const response = await fetch(`http://localhost:8080/api/users/${followerName}/follows/${followeeName}`, {
                method: 'GET',
                headers: {
                }
            });
            if (response.ok) {
                const isUserFollowing = await response.json();
                setIsFollowing(isUserFollowing);
                console.log(response)
                console.log('successfully tracked follow status')
            } else {
                console.error("Failed to track the user");
                console.log(response)
            }
        } catch (error) {
            console.error("Error during the follow request:", error);
        }
    }, [username, searchedUser]);

    useEffect(() => {
        checkFollowStatus();
    }, [checkFollowStatus]);

    const handleFollowButtonClick = async () => {
        setIsLoading(true);
        const followerUsername = username
        const followeeUsername = searchedUser?.username;
        try {
            const response = await fetch(`http://localhost:8080/api/users/${followerUsername}/follow/${followeeUsername}`, {
                method: 'POST',
                headers: {
                }
            });
            if (response.ok) {
                console.log("Successfully followed the user");
                setIsFollowing(true);
                setIsLoading(false);
            } else {
                console.error("Failed to follow the user");
                console.log(response)
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error during the follow request:", error);
            setIsLoading(false);
        }
    };

    const handleUnfollowButtonClick = async () => {
        setIsLoading(true);
        const followerUsername = username
        const followeeUsername = searchedUser?.username;

        try {
            const response = await fetch(`http://localhost:8080/api/users/${followerUsername}/unfollow/${followeeUsername}`, {
                method: 'PUT',
                headers: {
                }
            });
            if (response.ok) {
                console.log("Successfully unfollowed the user");
                setIsFollowing(false);
            }
            else {
                console.error("Failed to unfollow the user");
                console.log(response)
            }
        } catch (error) {
            console.error("Error during the unfollow request:", error);
        }
        setIsLoading(false);
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
        backgroundColor: `${getColorFromIndex(themeColor)}`,
        height: '25vh',
        width: '25vh',
        borderRadius: '50%',
        border: 'solid 7px white',
        marginBottom: '4.5vh',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        backgroundImage: `url(${Avatar})`,
        backgroundSize: '75%'
    }
    const setupDesc = {
        display: 'flex',
        boxShadow: `0 0 10px 1px ${getColorFromIndex(themeColor)}`,
        justifyContent: 'center',
        height: '36vh',
        width: '20vw',
        borderRadius: '1vw',
        textAlign: 'left',
        marginBottom: '2vh',
    }
    const middleBox = {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: `0 0 10px 1px ${getColorFromIndex(themeColor)}`,
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

    const followMessageDisplay = {
        display: "flex",
        flexDirection: 'row',
        marginBottom: '0.6vw',
    }
    const followMessageButtons = {
        display: "flex",
        backgroundColor: '#00C3FF',
        boxShadow: 'inset 3px 3px 6px #BFF5FF, inset -3px -3px  6px #BFF5FF',
        borderRadius: '7px',
        height: "5vh",
        width: "6vw",
        margin: '0.2vh 1.5vw',
        color: 'black',
        fontSize: '1em',
        alignItems: 'center',
        justifyContent: 'center'
    }
    
    const recHolder = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '48vh',
        width: '20vw',
        borderRadius: '1vw',
        boxShadow: `0 0 10px 1px ${getColorFromIndex(themeColor)}`,
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
                <div style={{ ...pfpHolder }} ></div>

                <div style={followBlockContainer}>

                    <div style={followMessageDisplay}>
                        <button style={{ ...followMessageButtons, backgroundColor: isFollowing ? 'rgb(213,57,255)' : '#00C3FF', }} onClick={isFollowing ? handleUnfollowButtonClick : handleFollowButtonClick}
                            disabled={isLoading}>
                            {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
                        </button>
                        

                    </div>

                </div>

            </div>

            <div style={middleBox}>
                <div style={infoContainer}>

                    <div style={usernameDisplay}><p style={{ fontSize: '2em' }}>{searchedUser?.username || 'Username'}</p></div>
                    <div style={bioDisplay}><p style={{ lineHeight: '2.5vh', fontFamily:'arial' }}>{searchedUser?.bio || 'No bio available.'}</p></div>
                </div>

                <SearchedUserPostComponent searchedUser={searchedUser} />

            </div>

            <div style={rightBox}>
                <div style={setupDesc}><p style={{ color: 'white', margin: '0.7vw', overflow:'auto', fontFamily:'arial', fontSize:'0.8em', lineHeight:'2.3vh' }}>{searchedUser?.setupDescription || 'Setup Description'}</p></div>
                <div style={recHolder}>
                    <UserRecComponent />
                </div>
            </div>
        </div>

    )
}
export default SearchedProfilePage
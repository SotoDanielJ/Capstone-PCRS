// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'
import AllPostsComponent from '../components/forumComponents/AllPostsComponent';
import GamingPostsComponent from '../components/forumComponents/GamingPostsComponent';
import HardwarePostsComponent from '../components/forumComponents/HardwarePostsComponent';
import SoftwarePostsComponent from '../components/forumComponents/SoftwarePostsComponent';
import InnovationPostsComponent from '../components/forumComponents/InnovationPostsComponent';
import CommunityPostsComponent from '../components/forumComponents/CommunityPostsComponent';
import MiscellaneousPostsComponent from '../components/forumComponents/MiscellaneousPostsComponent';
import FeatureBtns from '../components/forumComponents/FeatureBtns';
import "../style/FeatureBtnFix.css";

const ForumPage = () => {
    const { isLoggedIn, username } = useContext(AuthContext);
    const [showAllPosts, setShowAllPosts] = useState(true);
    const [showGamingPosts, setShowGamingPosts] = useState(false);
    const [showHardwarePosts, setShowHardwarePosts] = useState(false);
    const [showSoftwarePosts, setShowSoftwarePosts] = useState(false);
    const [showInnovationPosts, setShowInnovationPosts] = useState(false);
    const [showCommunityPosts, setShowCommunityPosts] = useState(false);
    const [showMiscellaneousPosts, setShowMiscellaneousPosts] = useState(false);
    const [showBoxShadowColor, setBoxShadowColor] = useState(
        'rgba(67, 190, 255, 0.7)'
    );

    const handleViewAllButtonClick = () => {
        setShowAllPosts(true);
        setShowGamingPosts(false)
        setShowHardwarePosts(false)
        setShowSoftwarePosts(false)
        setShowInnovationPosts(false)
        setShowCommunityPosts(false)
        setShowMiscellaneousPosts(false)
        setBoxShadowColor('rgba(67, 190, 255, 0.7)')
    };
    const handleViewGamingButtonClick = () => {
        setShowGamingPosts(true)
        setShowAllPosts(false)
        setShowHardwarePosts(false)
        setShowSoftwarePosts(false)
        setShowInnovationPosts(false)
        setShowCommunityPosts(false)
        setShowMiscellaneousPosts(false)
        setBoxShadowColor('#fc5c7d')
    };
    const handleViewHardwareButtonClick = () => {
        setShowGamingPosts(false)
        setShowAllPosts(false)
        setShowHardwarePosts(true)
        setShowSoftwarePosts(false)
        setShowInnovationPosts(false)
        setShowCommunityPosts(false)
        setShowMiscellaneousPosts(false)
        setBoxShadowColor('#00b09b')
    };
    const handleViewSoftwareButtonClick = () => {
        setShowGamingPosts(false)
        setShowAllPosts(false)
        setShowHardwarePosts(false)
        setShowSoftwarePosts(true)
        setShowInnovationPosts(false)
        setShowCommunityPosts(false)
        setShowMiscellaneousPosts(false)
        setBoxShadowColor('#ff512f')
    };
    const handleViewInnovationButtonClick = () => {
        setShowGamingPosts(false);
        setShowAllPosts(false);
        setShowHardwarePosts(false);
        setShowSoftwarePosts(false);
        setShowInnovationPosts(true);
        setShowCommunityPosts(false);
        setShowMiscellaneousPosts(false);
        setBoxShadowColor("#ff80c0");
    };
    const handleViewCommunityButtonClick = () => {
        setShowGamingPosts(false)
        setShowAllPosts(false)
        setShowHardwarePosts(false)
        setShowSoftwarePosts(false)
        setShowInnovationPosts(false)
        setShowCommunityPosts(true)
        setShowMiscellaneousPosts(false)
        setBoxShadowColor('#FF8E53')
    };
    const handleViewMiscellaneousButtonClick = () => {
        setShowGamingPosts(false)
        setShowAllPosts(false)
        setShowHardwarePosts(false)
        setShowSoftwarePosts(false)
        setShowInnovationPosts(false)
        setShowCommunityPosts(false)
        setShowMiscellaneousPosts(true)
        setBoxShadowColor('black')
    };
    const profileStyle = {
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "row",
        textAlign: "center",
        backgroundImage: 'linear-gradient(to right, #141e30, #243b55)',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
    };

    const leftBox = {
        display: "flex",
        flexDirection: "column",
        paddingTop: "10vh",
        alignItems: "center",
        height: "100vh",
        width: "25vw",
    };

    const middleBox = {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: `0 0 95px 1px ${showBoxShadowColor}`,
        padding: '0 1vw',
        height: "100vh",
        width: "50vw",
    };
    const rightBox = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        width: "25vw",
    };
    const followBlockContainer = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "35vh",
        width: "50vw",
    };
    const followDisplay = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "17vh",
        width: "25vw",
        fontFamily: "arial",
    };
    const categoryButtons = {
        display: "flex",
        backgroundImage: 'linear-gradient(to right, #ff512f, #f09819)',
        boxShadow: ' 0 2px 4px 1px #FFCE76',
        borderRadius: '7px',
        height: "5vh",
        width: "15vw",
        color: 'black',
        fontSize: '1em',

        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5vh'
    }
    
    const infoContainer = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingTop: "27vh",
        height: "31vh",
        width: "47vw",
    };
    const usernameDisplay = {
        display: "flex",
        width: "50vw",
        height: "6vh",
        marginTop: "1vh",
        alignItems: "center",
        color: "white",
    };

    const bioDisplay = {
        display: "flex",
        width: "50vw",
        height: "10vh",
        padding: "0 1.5vw",
        color: "white",
        alignItems: "center",
        textAlign: "left",
    };


    return (
        <div style={profileStyle}>
            <div style={leftBox}>
                <div style={followBlockContainer}>
                    <div style={followDisplay}>
                        <button style={categoryButtons}>
                            <span
                                style={{ marginRight: "0.8vw", fontWeight: "bold" }}
                                onClick={handleViewAllButtonClick}
                            >
                                All
                            </span>
                        </button>
                        <button style={categoryButtons}>
                            <span
                                style={{ marginRight: "0.8vw", fontWeight: "bold" }}
                                onClick={handleViewGamingButtonClick}
                            >
                                Gaming
                            </span>
                        </button>
                        <button style={categoryButtons}>
                            <span
                                style={{ marginRight: "0.8vw", fontWeight: "bold" }}
                                onClick={handleViewHardwareButtonClick}
                            >
                                Hardware
                            </span>
                        </button>
                        <button style={categoryButtons}
                            onClick={handleViewSoftwareButtonClick}
                        >
                            <span style={{ marginRight: "0.8vw", fontWeight: "bold" }}>
                                Software
                            </span>
                        </button>
                        <button style={categoryButtons}>
                            <span
                                style={{ marginRight: "0.8vw", fontWeight: "bold" }}
                                onClick={handleViewInnovationButtonClick}
                            >
                                Innovation
                            </span>
                        </button>
                        <button style={categoryButtons}>
                            <span
                                style={{ marginRight: "0.8vw", fontWeight: "bold" }}
                                onClick={handleViewCommunityButtonClick}
                            >
                                Community
                            </span>
                        </button>
                        <button style={categoryButtons}
                            onClick={handleViewMiscellaneousButtonClick}
                        >
                            <span style={{ marginRight: "0.8vw", fontWeight: "bold" }}>
                                Miscellaneous
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <div style={middleBox}>
               
                <div style={infoContainer}>
                    <div style={usernameDisplay}>
                        {showAllPosts && <AllPostsComponent />}
                        {showGamingPosts && <GamingPostsComponent />}
                        {showHardwarePosts && <HardwarePostsComponent />}
                        {showSoftwarePosts && <SoftwarePostsComponent />}
                        {showInnovationPosts && <InnovationPostsComponent />}
                        {showCommunityPosts && <CommunityPostsComponent />}
                        {showMiscellaneousPosts && <MiscellaneousPostsComponent />}
                    </div>
                    <div style={bioDisplay}>
                        <p style={{ lineHeight: "2.5vh", fontFamily: "arial" }}></p>
                    </div>
                </div>
            </div>

            <div style={rightBox}>
               <FeatureBtns/>
            </div>
        </div>
    );
};
export default ForumPage;

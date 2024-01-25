import React, { useState } from 'react';

const FollowComponent = () => {
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

    const boxStyle = {
        width: '50vw',
        height: '50vh',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '1vw',
    };

    const followContainer = {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(to top, #da1b60 , #43BEFF)',
        
        paddingTop: '0.5vh',
        width: "48vw",
        height: "45.5vh",
        borderRadius: '15px',
    }

    const followVerification = {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '2vh',
        width: "55%",
    }
    const pfpHolder = {
        display: "flex",
        border: '2px solid white',
        marginBottom: '1vh',
        height: '20vh',
        width: '20vh',
        borderRadius: '50%',
    }

    const closeButtonContainer = {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'right',
        paddingRight: '15px',
        width: '49vw',
        marginBottom:'0.5vh',
    }

    const closeButton = {
        border: '1px solid white',
        display: 'flex',
        height: '3vh',
        width: '8vw',
        borderRadius: '10px',
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    }
    const buttonHolder = {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        padding: '3vh',
        width: '30vw',
        gap:'1vw',
        
    }
    const buttonStyle = {
        display: 'flex',
        height: '6vh',
        width: '6vw',
        borderRadius: '10px',
        background: 'linear-gradient(to bottom, rgba(255, 255, 255), rgba(255, 255, 255))',
        color: 'black',
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center'

    }

    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            {isOpen && (
                <div style={overlayStyle}>
                    <div style={boxStyle}>
                        <div style={followContainer}>
                            <div style={followVerification}>
                                <p style={{ fontWeight: 'bold', fontSize: '1.3em' }}> Are you sure you want to follow</p>
                            </div>
                            <div style={pfpHolder}></div>
                            <div><p style={{ fontWeight: 'bold', fontSize: '2em' }}>BrianOrtiz_1995</p></div>

                            <div style={buttonHolder}>
                                <button style={buttonStyle}>YES</button>
                                <button style={buttonStyle}>NO</button>
                            </div>



                            <div style={closeButtonContainer}>
                                <button style={closeButton} onClick={handleClose}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default FollowComponent;
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';



const CreatePostComponent = ({ onPostCreated }) => {
    const { username } = useContext(AuthContext);

    const categoryIndices = {
        'Gaming': 0,
        'Hardware': 1,
        'Software': 2,
        'Innovation': 3,
        'Community': 4,
        'Miscellaneous': 5
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

    const boxStyle = {
        width: '50vw',
        maxHeight: '60vh',
        minHeight: '50vh',
        backgroundColor: 'white',
        borderRadius: '15px',
    };

    const postContainer = {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #505050 20%, black)',
        boxShadow: '0px 0px 10px 3px rgba(255,212,0, 0.7)',
        paddingTop: '1vh',
        width: "50vw",
        maxHeight: '56vh',
        minHeight: '50vh',
        borderRadius: '15px',
       
    }

    const postTitle = {
        display: "flex",
        justifyContent: 'center',
        marginBottom:'1vh',
        width: "45.5vw",
        maxHeight: '20vh',
        padding: '0 0 0.5% 0',
        flexDirection:'column',
        
    }
    const postDesc = {
        display: "flex",
        marginBottom: '1vh',
        width: "45.5vw",
        minHeight: "20vh",
        maxHeight: "20vh",
        flexDirection:'column',
        
    }
    const postButtonContainer = {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'right',
        width: '46vw',
        marginTop:'8vh'

    }
    const postButtons = {
        border: '2px solid white',
        display: 'flex',
        height: '3vh',
        width: '10vw',
        borderRadius: '10px',
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
        marginBottom: '0.8vh',
        marginLeft: '1vw',
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const accountMenuContainer = {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        alignItems: 'center'
    }

    const dropDownMenuContainer = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: 'absolute',
        top: '100%',
        width: '7vw',
        height: '20vh',
        marginRight: '17vw',
        padding: '0 0.2vw',
        
    }

    const buttonStyle = {
        display: 'flex',
        justifyContent: 'center',
        listStyleType: 'none',
        marginBottom: '0.6vh',
        border: '1px solid black',
        backgroundColor: 'white',
        padding: '0.5vh 0.5vw',
        color: 'black',
    }

    const toggleDropdown = () => {
        console.log('toggleDropdown function is called');
        setToggleIsOpen(!toggleIsOpen);
    };

    const [isOpen, setIsOpen] = useState(true);
    const [toggleIsOpen, setToggleIsOpen] = useState(false);
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState({ name: '', index: null });
   

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = () => {
        if (category.index === null) {
            alert("Please select a category");
            return;
        }
    
        const apiUrl = `http://localhost:8080/api/users/create/post/${username}`;
        const payload = { content, title, username, categoryIndex: category.index };
        console.log(payload);
    
        console.log(username)


        axios.post(apiUrl, payload, { withCredentials: true })
            .then(response => {
                console.log('Post Created successfully', response.data);
                if (onPostCreated) {
                    
                    onPostCreated(response.data);
                }

            })
            .catch(error => {
                console.error('Error creating post:', error);
            });
        setIsOpen(false);
    };


    const handleInput = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleCategorySelect = (categoryName) => {
        setCategory({ name: categoryName, index: categoryIndices[categoryName] });
        toggleDropdown();
    };


    return (
        <div>
            {isOpen && (
                <div style={overlayStyle}>
                    <div style={boxStyle}>

                        <div style={postContainer}>
                            <p style={{fontSize:'1.5em', fontWeight:'bold', color:'white'}}>{username}</p>
                            
                            <div style={postTitle}>
                                <textarea name="message" cols="100" value={title} placeHolder='Give your post a catchy title!' onChange={handleInput(setTitle)} style={{ fontSize: '1rem', borderRadius: '15px', padding: '10px', height: '4vh' }}></textarea>
                            </div>
                            <div style={postDesc}>

                                <textarea name="message" cols="100" placeHolder='Whats your post about?' onChange={handleInput(setContent)} value={content} style={{ fontSize: '1rem', borderRadius: '15px', padding: '10px', height: '17vh' }}></textarea>
                            </div>

                            <div style={postButtonContainer}>
                            <div style={accountMenuContainer}>
                            
                                <button onClick={toggleDropdown} style={{display:'flex', alignItems:'center',color: 'black', fontFamily: 'arial', textDecoration: 'none', fontSize: '1.3em', borderRadius: '10px', backgroundColor: 'grey', border:'1px solid white', marginRight:'17vw' , height:'3vh'}}>Category</button>
                                
                                {toggleIsOpen && (
                                    <div style={dropDownMenuContainer}>

                                        <button style={buttonStyle} onClick={() => handleCategorySelect('Gaming')}>Gaming</button>
                                        <button style={buttonStyle} onClick={() => handleCategorySelect('Hardware')}>Hardware</button>
                                        <button style={buttonStyle} onClick={() => handleCategorySelect('Software')}>Software</button>
                                        <button style={buttonStyle} onClick={() => handleCategorySelect('Innovation')}>Innovation</button>
                                        <button style={buttonStyle} onClick={() => handleCategorySelect('Community')}>Community</button>
                                        <button style={buttonStyle} onClick={() => handleCategorySelect('Miscellaneous')}>Miscellaneous</button>
                                        <button style={{ ...buttonStyle, marginBottom: '0', backgroundColor: '#FFBE2D' }} onClick={toggleDropdown}>Close</button>
                                    </div>
                                )}
                            </div>
                                <button style={postButtons} onClick={handleSubmit}>
                                    Post
                                </button>
                                <button style={postButtons} onClick={handleClose}>
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



export default CreatePostComponent;
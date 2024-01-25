// eslint-disable-next-line no-unused-vars
import ViewContentComponent from './ViewContentComponent';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import CreatePostComponent from './CreatePostComponent';


const PostComponent = () => {
    const [showViewContent, setShowViewContent] = useState(false);
    const { isLoggedIn, username } = useContext(AuthContext);
    const [postData, setPostData] = useState([]);
    const [postIndex, setPostIndex] = useState(0);
    const [selectedPost, setSelectedPost] = useState(null);
    const [postColor, setPostColor] = useState('linear-gradient(to bottom, #505050 20%, black)');

    const postChunkSize = 3;

    const fetchUserPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/posts/${username}`, { withCredentials: true });
            setPostData(response.data);
            console.log(username);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        if (username) {
            fetchUserPosts();
        }
    }, [username]);

    useEffect(() => {
        console.log("Updated postData:", postData);
    }, [postData]);

    const handleLoadMoreClick = () => {
        setPostIndex(prevIndex => {
            const nextIndex = prevIndex + postChunkSize;
            if (nextIndex >= postData.length) {
                return 0;
            } else {
                return nextIndex;
            }
        });
    };


    const handleViewButtonClick = (post) => {
        setShowViewContent(!showViewContent);
        setSelectedPost(post);
        console.log(username);
        console.log(isLoggedIn);
    };

    const handleViewCloseButtonClick = () => {
        setShowViewContent(false);
    };

    const feedContainer = {
        display: "flex",
        flexDirection: 'column',
        maxHeight: '59vh',
        minHeight: '59vh',

    }
    const postContainer = {
        position: 'relative',
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        background: postColor,
        boxShadow: '0 4px 5px 1px rgba(100,100,100, 0.7)',
        border: '1px solid white',
        width: "50vw",
        height: "16vh",
        borderRadius: '15px',
        marginBottom: '2.5vh'
    }
    const postTitle = {
        display: "flex",
        justifyContent: 'center',
        width: "46vw",
        maxHeight: "8vh",
        overflow: 'hidden',
        paddingTop: '5px',
        
    }
    const postDesc = {
        display: "flex",
        width: "46vw",
        minHeight: "4vh",
        maxHeight: "6vh",
        justifyContent: 'center',
        overflow: 'hidden',
    }

    const vcButtonContainer = {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'left',
        marginLeft: '1vw',
        position: 'absolute',
        bottom: 10,
        left: 19
    }

    const vcButton = {
        display: 'flex',
        height: '3vh',
        width: '10vw',
        borderRadius: '10px',
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgb(255, 255, 255))',
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid white'
    }

    const filterContainer = {
        display: "flex",
        flexDirection: 'row',
        gap: '1%',
        alignItems: 'center',
        height: '8vh',
    }

    const filterButtons = {
        display: 'flex',
        width: '5vw',
        cursor: 'pointer',
        height: '3vh',
        borderRadius: '10px',
        backgroundColor: 'white',
        color: 'black',
        background: 'radial-gradient(circle, white 70%, gray)',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const currentPosts = postData.slice(postIndex, postIndex + postChunkSize);

    const [showCreateContent, setCreateContent] = useState(false);

    const handleCreateButtonClick = () => {
        setCreateContent(!showCreateContent);
    }
    const handlePostCreated = (newPost) => {
        setPostData([newPost, ...postData]); // Add the new post at the beginning of the array
    };
    
    return (
        <div>
            <div style={filterContainer}>
                
                <button style={{...filterButtons, fontWeight:'bold',background: 'gold', border:'3px solid white'}} onClick={handleCreateButtonClick}>CREATE</button>
                {showCreateContent && <CreatePostComponent onPostCreated={handlePostCreated} />}

            </div>
            <div style={feedContainer}>

                {currentPosts.map((post, index) => (
                    <div style={postContainer} key={index}>
                        <div style={postTitle}>
                            <p style={{ fontWeight: 'bold', fontSize: '1.2em', color: 'white', margin: '0' }}>
                                {post.title}
                            </p>
                        </div>
                        <div style={postDesc}>
                            <p style={{color:'white'}}>{post.content}</p>
                        </div>
                        <div style={vcButtonContainer}>
                            <button style={vcButton} onClick={() => handleViewButtonClick(post)}>View Content</button>
                            {showViewContent && <ViewContentComponent post={selectedPost} postColor={postColor} onClick={handleViewCloseButtonClick} />}
                        </div>
                    </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '10vw', height: '3.5vh', borderRadius: '10px', fontSize: '1em',  backgroundImage: 'linear-gradient(to bottom, #434343 0%, black 100%)', border: '1px solid white' }}
                        onClick={handleLoadMoreClick}
                    >
                        View More
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PostComponent
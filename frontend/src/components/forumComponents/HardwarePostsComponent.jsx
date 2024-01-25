// eslint-disable-next-line no-unused-vars
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import ViewContentComponent from '../profileComponents/ViewContentComponent';

const HardwarePostsComponent = () => {
    const [showViewContent, setShowViewContent] = useState(false);
    const { isLoggedIn, username } = useContext(AuthContext);
    const [postIndex, setPostIndex] = useState(0);
    const [selectedPost, setSelectedPost] = useState(null);
    const [postColor, setPostColor] = useState('linear-gradient(to bottom, #9796f0, #FF8E53)');


    const postChunkSize = 5;

    const [allPostData, setAllPostData] = useState([]);

    const fetchAllPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/posts/category/1`, { withCredentials: true });
            setAllPostData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching all posts:', error);
        }
    };
    useEffect(() => {
        if (isLoggedIn) {
            fetchAllPosts();
        }
    }, [isLoggedIn]);


    const handleLoadMoreClick = () => {
        setPostIndex(prevIndex => {
            const nextIndex = prevIndex + postChunkSize;
            if (nextIndex >= allPostData.length) {
                return 0;
            } else {
                return nextIndex;
            }
        });
    };

    const handleViewButtonClick = (post) => {
        setShowViewContent(!showViewContent);
        setSelectedPost(post);
        console.log(isLoggedIn);
    };
    const handleViewCloseButtonClick = () => {
        setShowViewContent(false);
    };

    const currentPosts = allPostData.slice(postIndex, postIndex + postChunkSize);

    const pageLayout = {
        display: "flex",
        width: "50vw",
        height: "100vh",
        flexDirection: "column",
        paddingTop: "20vh",
        alignItems: "center",
        justifyContent: "center",
    };

    const feedContainer = {
        display: "flex",
        flexDirection: 'column',
    }

    const postContainer = {
        position: 'relative',
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        backgroundImage: postColor,
        boxShadow: '0 4px 5px 1px rgba(100,100,100, 0.7)',
        border: '1px solid white',
        width: "50vw",
        height: "16vh",
        borderRadius: '15px',
        marginBottom: '1.2vh'
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




    return (
        <div style={pageLayout}>

            <div style={feedContainer}>

                {currentPosts.map((post, index) => (
                    <div style={postContainer} key={index}>
                        <div style={postTitle}>
                            <p style={{ fontWeight: 'bold', fontSize: '1.2em', color: 'white', margin: '0' }}>
                                {post.title}
                            </p>
                        </div>
                        <div style={postDesc}>
                            <p style={{ color: 'white' }}>{post.content}</p>
                        </div>
                        <div style={vcButtonContainer}>
                            <button style={vcButton} onClick={() => handleViewButtonClick(post)}>View Content</button>
                            {showViewContent && <ViewContentComponent post={selectedPost} postColor={postColor} onClick={handleViewCloseButtonClick} />}

                        </div>
                    </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '10vw', height: '3.5vh', borderRadius: '10px', fontSize: '1.3em', backgroundImage: 'linear-gradient(to bottom, #8360c3, #2ebf91)', border: '1px solid white' }}
                        onClick={handleLoadMoreClick}
                    >
                        View More
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HardwarePostsComponent
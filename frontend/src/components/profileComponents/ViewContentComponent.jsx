import React from 'react';



const ViewContentComponent = ({ post, onClick, postColor }) => {
    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    };

    const boxStyle = {
        width: '50vw',
        maxHeight:'60vh',
        minHeight:'60vh',
        borderRadius: '10px',
        padding: '1vw',
        
        marginLeft:'2vw'
    };

    const postContainer = {
      position: 'relative',
      display: "flex",
      flexDirection: 'column',
      alignItems: 'center',
      backgroundImage: postColor,

      boxShadow: '0px 0px 10px 3px rgba(255,255,255, 0.7)',
      width: "50vw",
      height: "60vh",
      borderRadius: '15px',
      marginBottom: '2.5vh',
  }

    const postTitle = {
      display: "flex",
      justifyContent: 'center',
      width: "46vw",
      maxHeight: "13vh",
      overflow: 'hidden',
      paddingTop: '5px',
     
}

  const postDesc = {
    display: "flex",
    width: "46vw",
    maxHeight: "33vh",
    justifyContent: 'center',
    overflow: 'hidden',
}
const postButtonContainer = {
  position: 'absolute',
  bottom: '10px',
  right: '10px',
}

const userButtonContainer = {
   
    display:'flex',
    backgroundColor:'rgba(0,0,0,0.5)',
    border:'2px solid black',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:'40px',
    marginTop:'2vh',
    width:'15vw'
  }
const postButtons = {
  border: '2px solid white',
  display: 'flex',
  height: '3vh',
  width: '10vw',
  borderRadius: '10px',
  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
  color: 'black',
  alignItems: 'center',
  justifyContent: 'center'
}
   


        

        return (
          <div style={overlayStyle}>
              <div style={boxStyle}>
                  <div style={postContainer}>
                  <div style={userButtonContainer}><h1 style={{color:'gold'}} >{post.username}</h1> </div>
                  
                      <div style={postTitle}>
                          <p style={{ fontWeight: 'bold', fontSize: '1.3em', color: 'white' }}>
                              {post.title}
                          </p>
                      </div>
                      <div style={postDesc}>
                          <p style={{ fontSize: '1.2em', color: 'white' }}>
                              {post.content}
                          </p>
                      </div>
                      
                      <div style={postButtonContainer}>
                          <button style={postButtons} onClick={onClick}>
                              Close
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      );
  };
        


export default ViewContentComponent;

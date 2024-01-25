// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'
import Login from '../components/LoginComponent'
import Bgimage2 from '../context/images/bgimage2.jpg'
import script3 from '../context/images/script3.png'
import Registration from '../components/RegistrationComponent'


const HomePage = () => {

  const homepageStyle = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: 'column',
    textAlign: "center",
    marginTop: "0vh",
    backgroundImage: `url(${Bgimage2})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    backgroundRepeat: 'no-repeat',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
  }

  const scriptLogo = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundImage: 'linear-gradient(to right, #434343 0%, black 100%)',
    width: '40vw',
    height: '20vh',
    border: '2px solid rgb(255,231,178)',
    marginTop: '20vh',
    marginBottom: '3vh'
  }

  const welcomeContainer = {
    display: 'flex',
    flexDirection: 'column',
    width: '72vw',
    height: '10vh',
    color: 'white',
    justifyContent: 'center'
  };

  const buttonContainer = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }

  const buttonStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: '10vw',
    height: '8vh',
    margin: '4vh',
    borderRadius: '10vw',
    backgroundImage: 'linear-gradient(to right, #2c3e50, #4ca1af)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }


  const [showLoginOption, setLoginOption] = useState(false);

  const handleLoginViewButtonClick = () => {
    setLoginOption(!showLoginOption);
  };

  const [showRegistrationOption, setRegistrationOption] = useState(false);

  const handleRegistrationButtonClick = () => {
    console.log('registration attempted')
    setRegistrationOption(!showRegistrationOption);
  };

  return (

    <div style={homepageStyle}>
      <div style={scriptLogo}><img src={script3} alt="" />
        <p style={{ color: 'gold', fontFamily: 'arial' }}>Smart Computer Recommendations & Information Platform of Technology.</p></div>
      <div style={welcomeContainer}>
        <p style={{ fontSize: '1em', lineHeight: '2vh', fontFamily: 'arial' }}> Welcome to SCRIPT: Where AI meets innovation and recommendation, whilst tech aficionados meet each other, fostering a community of collective intrigue and inspired dialogue.</p>
        <p style={{ fontSize: '1em', lineHeight: '1vh', fontFamily: 'arial' }}> Join the SCRIPT community - sign in or register to start connecting and collaborating with fellow tech enthusiasts</p> 
      </div>
      <div style={buttonContainer}>
        <button style={buttonStyle} onClick={handleLoginViewButtonClick}><p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>LOGIN</p></button>
        {showLoginOption && <Login />}
        <button style={buttonStyle} onClick={handleRegistrationButtonClick}><p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>REGISTER</p></button>
        {showRegistrationOption && <Registration />}
      </div>
      <div>
      </div>
    </div>

  )
}
export default HomePage
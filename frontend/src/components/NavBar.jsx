import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from '../context/AuthContext'
import { setCookie } from '../context/cookieUtils';
import UpdateInfoComponent from './profileComponents/UpdateInfoComponent';
import script1 from '../context/images/script1.png'


const NavBar = () => {

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedUsername, setSearchedUsername] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, username, setIsLoggedIn } = useContext(AuthContext);
  const [themeColor, setThemeColor] = useState('5');



  const handleAccountClick = () => {
    if (isLoggedIn && username) {

      navigate(`/profile/${username}`);
    } else {

    };
  }

  const toggleDropdown = () => {
    console.log('toggleDropdown function is called');
    setIsOpen(!isOpen);
  };

  const handleSearchSubmit = async () => {
    if (!searchTerm) {
      alert("Please enter a username");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8080/api/users/search/${searchTerm}`, { withCredentials: true });

      if (response.status === 200) {
        const searchedUser = response.data;
        setSearchedUsername(searchedUser);
        const userThemeColor = searchedUser.themeColorPref || '5';
        console.log(userThemeColor)
        setThemeColor(userThemeColor);
        console.log(response)
        navigate(`/search/profile/${searchTerm}`, { state: { searchedUser, themeColor: userThemeColor } });

      } else {

        alert(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("User not found");
      } else {
        console.error("Search error:", error);
        alert("An error occurred while searching");
      }
    }
  }


  const logout = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/logout')
      console.log(response.data)
      setCookie('userToken', null);
      setIsLoggedIn(false);
      console.log('logout successful')
      navigate('/')
      setIsOpen(false)

    } catch (error) {
      console.error('Logout failed: ', error)
    }
  }

  const navContainer = {
    display: "flex",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "3vh",
    background: "linear-gradient(180deg, #000000 0%, #000000 99%)",
    padding: "10px",
    zIndex: 1000,
  };

  const linkContainer = {
    display: 'flex',
    marginRight: '10px',
    width: '30%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: '5px',
    marginLeft: 'auto',
  }

  const linkStyle = {
    color: 'white',
    fontFamily: 'arial',
    textDecoration: 'none',
    fontSize: '1.3em'
  }

  const searchBarStyle = {
    padding: '5px 8px',
    fontSize: '0.8em',
    borderRadius: '5px',
    marginRight: '5px',
    width:'20vw'
  };

  const searchButtonStyle = {
    padding: '5px 15px',
    fontSize: '1em',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#43BEFF',
    color: 'white',
    cursor: 'pointer',
  };

  const searchContainer = {
    display: 'flex',
    width: '20%',
    alignItems: 'center',
    gap: '5px',
    marginLeft: '26vw'

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
    border: '3px solid gray',
    position: 'absolute',
    top: '100%',
    width: '7vw',
    height: 'fit',
    marginTop: '2vh',
    marginRight:'0.5vw',
    padding: '0 0.2vw',
    borderRadius: '15px'
  }

  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    listStyleType: 'none',
    marginBottom: '1vh',
    border: '1px solid black',
    backgroundColor: 'white',
    padding: '0.5vh 0.5vw',
    borderRadius: '15px',
    color: 'black',
  }

  const [showUpdateOption, setUpdateOption] = useState(false);

    const handleUpdateButtonClick = () => {
        setUpdateOption(!showUpdateOption);
      };

  return (

    <div style={navContainer}>
    <div style={{display:'flex', marginLeft:'9.5vw' }}><img src={script1} alt="" style={{height:'4vh'}}/></div>
     {isLoggedIn && ( <div style={searchContainer}>
        <input
          type="text"
          placeholder="Search..."
          style={searchBarStyle}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
        />
        <button style={searchButtonStyle} onClick={handleSearchSubmit}>
          Search
        </button>
      </div> )}
     {isLoggedIn && ( <div style={linkContainer}>
        <Link to="/forum" style={linkStyle}>Forum</Link>
        <Link to="/ChatPage" style={linkStyle}>
          AI Assistant
        </Link>
      
        <Link to="/Selection" style={linkStyle}>
          Questionnaire
        </Link>
       
        <div style={accountMenuContainer}>
          <button onClick={toggleDropdown} style={{ color: 'white', fontFamily: 'arial', textDecoration: 'none', fontSize: '1.3em', borderRadius: '10px', backgroundColor: 'rgba(0,0,0,0)' }}>Account</button>
          {isOpen && (
            <div style={dropDownMenuContainer}>
              <button style={buttonStyle} onClick={handleAccountClick}>Profile</button>
              <button style={buttonStyle} onClick={handleUpdateButtonClick}>Update Info</button>{showUpdateOption && <UpdateInfoComponent />} 
              
              <button style={buttonStyle} onClick={logout}>Logout</button>
              <button style={{ ...buttonStyle, marginBottom: '0', backgroundColor: '#FFBE2D' }} onClick={toggleDropdown}>Close</button>
            </div>
          )}
        </div>
      </div> )}
    </div>
  );

}
export default NavBar

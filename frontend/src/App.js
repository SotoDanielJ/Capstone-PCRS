import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatPage from "./bot/pages/ChatPage";
import { AuthProvider } from './context/AuthContext'
import QuestionnairePage from "./bot/pages/QuestionnairePage"
import HomePage from './pages/Homepage'
import ProfilePage from './pages/ProfilePage'
import SearchedProfilePage from './pages/SearchedProfilePage'
import { UserProvider } from "./context/UserProvider";
import ForumPage from "./pages/ForumPage";

const App = () => {
  

  return (
    <Router>
    <AuthProvider>
    <UserProvider>
      <NavBar />
      <Routes>
        <Route path="/ChatPage" element={<ChatPage />} />
        <Route path="/Selection" element={<QuestionnairePage/>}/>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:username" element={<ProfilePage  />} />
        <Route path="/search/profile/:username" element={<SearchedProfilePage />} />
        <Route path="/forum" element ={<ForumPage />}/>
      </Routes>
      </UserProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
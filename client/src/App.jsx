import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import LogIn from "./pages/LogIn.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import EditorPage from "./pages/EditorPage.jsx";
import { useState, createContext } from 'react';

export const AppContext = createContext();

function App() {
  //user state is a global state used in many other components so instead of passing it as a prop useContext hook is used for this purpose. 
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <AppContext.Provider value={{ user, setUser }}>
        <Router>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/editor/:username/:roomId" element={<EditorPage/>}/>
              <Route path="/dashboard" element={<DashBoard/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/login" element={<LogIn/>}/>
            </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;

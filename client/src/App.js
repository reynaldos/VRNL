import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import {BottomNavbar} from "./components/BottomNavbar";
import { darkTheme, lightTheme } from "./util/theme";
import darkBG from './imgs/darkmode.png';
import lightBG from './imgs/lightmode.png';
// import {IconContext} from 'react-icons';

import Cookies from 'js-cookie'

import {
  Route,
  // Link,
  BrowserRouter,
  Routes,
  Navigate
} from "react-router-dom";

import { useSelector } from 'react-redux';


import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

function App() {

  const { currentUser } = useSelector(state=>state.user);
  const [darkMode, setDarkMode] = useState(Cookies.get('darkMode') === 'true' ? true : false);


  const toggleDarkMode = () => {

    if (darkMode){
      setDarkMode(false);
      Cookies.set('darkMode', 'false')
    } else {
      setDarkMode(true);
      Cookies.set('darkMode', 'true')

    }

  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container  style={{ backgroundImage: `url(${darkMode ? darkBG : lightBG})`}}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
                  <Route index element={currentUser ? <Home/> : <Navigate to="/signin" />}/>
                <Route path="signin" element={<SignIn/>}/>
                <Route path="signup" element={<SignIn/>}/>
                <Route path="forgot" element={<SignIn/>}/>

               {currentUser &&<>
                  <Route path="myvournals/*" element={<Dashboard type={'myvournals'}/>}/>
                  <Route path="subscribers/*" element={<Dashboard type={'subscribers'}/>}/>
                  <Route path="settings" element={<Settings/>}/>
                </>}
                
                <Route path="*" element={<>Error</>}/>

            </Route>
          </Routes>

        {currentUser && <BottomNavbar isDarkMode={darkMode} 
                                      setDarkMode={toggleDarkMode}/>}

        </BrowserRouter>
      </Container>
    </ThemeProvider>

  );
}

export default App;

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  color: ${({theme})=>theme.text};

  background-size: cover;
  overflow: auto;
  background-repeat: repeat-y;
  background-position: center;
`
import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import {BottomNavbar} from "./components/BottomNavbar";
import { darkTheme, lightTheme } from "./util/theme";
import darkBG from './imgs/darkmode.png';
import lightBG from './imgs/lightmode.png';


import {
  Route,
  // Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";

import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

function App() {


   const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      
      <Container  style={{ backgroundImage: `url(${darkMode ? darkBG : lightBG})`}}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
                <Route index element={<Home/>}/>
                <Route path="myvournals" element={<Dashboard type={'myvournals'}/>}/>
                <Route path="subscribers" element={<Dashboard type={'subscribers'}/>}/>
                <Route path="settings" element={<Settings/>}/>
                <Route path="signin" element={<SignIn/>}/>
            </Route>
          </Routes>

        <BottomNavbar isDarkMode={darkMode} setDarkMode={setDarkMode}/>

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
 background-repeat: no-repeat;
 background-position: center;
`
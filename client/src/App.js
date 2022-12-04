import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import {BottomNavbar} from "./components/BottomNavbar";
import { darkTheme, lightTheme } from "./util/theme";

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
      
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/">
                <Route index element={<Home/>}/>
                {/* <Route path="private" element={<Dashboard type={'private'}/>}/> */}
                <Route path="dash" element={<Dashboard type={'friends'}/>}/>
                <Route path="settings" element={<Settings/>}/>
                <Route path="signin" element={<SignIn/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Container>

      <BottomNavbar isDarkMode={darkMode} setDarkMode={setDarkMode}/>
    </ThemeProvider>

  );
}

export default App;

const Container = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.bg};
  height: 100vh;
  width: 100vw;
  color: ${({theme})=>theme.text};
`
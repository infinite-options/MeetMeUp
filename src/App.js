import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material';
import Interests from './components/profilecreation/Interests';
import Recording from './components/profilecreation/Recording';
import Available from './components/profilecreation/Available';
import Preferences from './components/matches/Preferences';
import Match from './components/matches/Match';
import Profile from './components/matches/Profile';
import About from './components/profilecreation/About'

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Segoe UI',
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="about" element={<About />} />
          <Route path="interests" element={<Interests />} />
          <Route path="recording" element={<Recording />} />
          <Route path="available" element={<Available />} />
          <Route path="preferences" element={<Preferences />} />
          <Route path="match" element={<Match />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

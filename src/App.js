import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/profilecreation/About';
import { createTheme, ThemeProvider } from '@mui/material';
import Interests from './components/profilecreation/Interests';
import Recording from './components/profilecreation/Recording';
import Available from './components/profilecreation/Available';

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
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SelectionResults from './components/SelectionResults';
import UserDetails from './components/UserDetails';
import Begin from './components/Begin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectionResults />} />
        <Route path="/user-details/:name" element={<UserDetails />} />
        <Route path="/begin" element={<Begin />} />
      </Routes>
    </Router>
  );
};

export default App;
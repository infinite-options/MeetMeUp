import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SelectionResults from './components/SelectionResults';
import UserDetails from './components/UserDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectionResults />} />
        <Route path="/user-details/:name" element={<UserDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
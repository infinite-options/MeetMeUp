import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Intro/LandingPage'; 
import LandingPage2 from './Intro/LandingPage2'; 
import LandingPage3 from './Intro/LandingPage3'; 
import LandingPage4 from './Intro/LandingPage4'; 
import LocationPage from './Profile/LocationPage'; 
import LocationPage2 from './Profile/LocationPage2'; 
import AccountDetails from './Account/AccountDetails'; 
import AccountDetails2 from './Account/AccountDetails2'; 
import AccountDetails3 from './Account/AccountDetails3';
import AccountDetails4 from './Account/AccountDetails4';
import AccountDetails5 from './Account/AccountDetails5';
import Start from './Intro/Start';
import TrialAccount from './Intro/TrialAccount';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page-2" element={<LandingPage2 />} />
        <Route path="/landing-page-3" element={<LandingPage3 />} />
        <Route path="/landing-page-4" element={<LandingPage4 />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/location2" element={<LocationPage2 />} />
        <Route path="/account" element={<AccountDetails />} />
        <Route path="/account2" element={<AccountDetails2 />} />
        <Route path="/account3" element={<AccountDetails3 />} />
        <Route path="/account4" element={<AccountDetails4 />} />
        <Route path="/account5" element={<AccountDetails5 />} />
        <Route path="/start" element={<Start />} />
        <Route path="/trial" element={<TrialAccount />} />

      </Routes>
    </Router>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccountSetup1Login from './pages/AccountSetup1Login.js';
import AccountSetup2Create from './pages/AccountSetup2Create.js';
import AccountSetup3Create from './pages/AccountSetup3Create.js';
import AccountSetup4Create from './pages/AccountSetup4Create.js';
import AccountSetup5Create from './pages/AccountSetup5Create.js';
import ShowTermsAndConditions from './pages/showTermsAndConditions.js';
import ShowPrivacyPolicy from './pages/showPrivacyPolicy.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AccountSetup1Login/>}/>
        <Route path="/accountSetup2Create" element={<AccountSetup2Create/>}/>
        <Route path="/accountSetup3Create" element={<AccountSetup3Create/>}/>
        <Route path="/AccountSetup4Create" element={<AccountSetup4Create/>}/>
        <Route path="/AccountSetup5Create" element={<AccountSetup5Create/>}/>
        <Route path="/termsandconditions" element={<ShowTermsAndConditions/>}/>
        <Route path="/privacypolicy" element={<ShowPrivacyPolicy/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

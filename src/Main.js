import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import LandingPage from './Intro/LandingPage'; 
import LandingPage2 from './Intro/LandingPage2'; 
import LandingPage3 from './Intro/LandingPage3'; 
import LandingPage4 from './Intro/LandingPage4'; 
import LocationPage from './ProfileNotifications/LocationPage'; 
import LocationPage2 from './ProfileNotifications/LocationPage2'; 
import AccountDetails from './AccountDetails/AccountDetails'; 
import AccountDetails2 from './AccountDetails/AccountDetails2';
import AccountDetails3 from './AccountDetails/AccountDetails3';
import AccountDetails4 from './AccountDetails/AccountDetails4';
import AccountDetails5 from './AccountDetails/AccountDetails5';
import Start from './Intro/Start';
import TrialAccount from './Intro/TrialAccount';
import { createTheme, ThemeProvider } from '@mui/material';

import AccountSetup1Login from './AccountSetup/AccountSetup1Login';
import AccountSetup2Create from './AccountSetup/AccountSetup2Create';
import GoogleSignup from './AccountSetup/GoogleSignUp';
import AccountSetup3Create from './AccountSetup/AccountSetup3Create';
import AccountSetup4Create from './AccountSetup/AccountSetup4Create';
import AccountSetup5Create from './AccountSetup/AccountSetup5Create';
import AccountSummary from './AccountSetup/AccountSummary';
import AccountSetup6Available from './AccountSetup/AccountSetup6Available';
import Preferences from './Preferences/Preferences';
import Match from './Match/Match';
import GridLayout from './Match/GridLayout';
import SelectionResults from './Match/SelectionResults';
import UserDetails from './Match/MatchDetails';
import MatchBegin from './Match/MatchBegin';
import SelectPlace from './Match/SelectPlace';
import SelectLocation from './Match/SelectLocation';
import DateSummary from './Match/DateSummary';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShowTermsAndConditions from './Policies/showTermsAndConditions';
import ShowPrivacyPolicy from './Policies/showPrivacyPolicy';
import AccountContext from './AccountSetup/AccountContext';
function Main() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Segoe UI',
    }
  });
  const [details, setDetails] = useState('');
  const [selections, setSelections] = useState('');

  return (
    <ThemeProvider theme={theme}>
    <AccountContext.Provider value={{details, setDetails, selections, setSelections}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start></Start>} />
        <Route path="/landing-page-1" element={<LandingPage />} />
        <Route path="/landing-page-2" element={<LandingPage2 />} />
        <Route path="/landing-page-3" element={<LandingPage3 />} />
        <Route path="/landing-page-4" element={<LandingPage4 />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/location2" element={<LocationPage2 />} />
        <Route path="/settings" element={<AccountDetails />} />
        <Route path="/account2" element={<AccountDetails2 />} />
        <Route path="/account3" element={<AccountDetails3 />} />
        <Route path="/account4" element={<AccountDetails4 />} />
        
        <Route path="/account5" element={<AccountDetails5 />} />
        <Route path="/start" element={<Start />} />
        <Route path="/trial" element={<TrialAccount />} />
        
        <Route path="/accountSetup1Login" element={<AccountSetup1Login/>}/>
        <Route path="/accountSetup2Create" element={<AccountSetup2Create/>}/>
        <Route path="/googleSignUp" element={<GoogleSignup/>}/>
        <Route path="/accountSetup3Create" element={<AccountSetup3Create/>}/>
        <Route path="/accountSetup4Create" element={<AccountSetup4Create/>}/>
        <Route path="/accountSetup5Create" element={<AccountSetup5Create/>}/>
        <Route path="/accountSetup6Availability" element={<AccountSetup6Available/>}/>

        <Route path="/accountSetup7Summary" element={<AccountSummary/>}/>
        
        <Route path="/matching1PreferencesPage" element={<Preferences/>}/>
        <Route path="/match" element={<Match/>}/>
        <Route path="/grid" element={<GridLayout/>}/>
        <Route path="/selectionResults" element={<SelectionResults/>}/>
        <Route path="/user-details/:name" element={<UserDetails />} />
        <Route path="/begin" element={<MatchBegin />} />
        <Route path="/nextPlace" element={<SelectPlace/>}/>
        <Route path='/nextLocation' element={<SelectLocation/>}/>
        <Route path='/nextSummary' element={<DateSummary/>}/>
        <Route path='/matchPreferences' element={<Preferences/>}/>
        <Route path="/termsandconditions" element={<ShowTermsAndConditions/>}/>
        <Route path="/privacypolicy" element={<ShowPrivacyPolicy/>}/>
      </Routes>
    </BrowserRouter>
    </AccountContext.Provider>

    </ThemeProvider>
  );
}

export default Main;

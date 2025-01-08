import React from 'react';
import Main from './Main';
import { DataProvider } from './ListContext';
import { UserProvider } from './UserContext';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <UserProvider>
          <Main />
        </UserProvider>
      </DataProvider>
    </div>
  );
}

export default App;


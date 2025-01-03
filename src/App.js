import Main from "./Main";
import { DataProvider } from '../src/ListContext';

function App() {
  return (
    <div className="App">
      <DataProvider><Main></Main></DataProvider>
        
    </div>
  );
}
export default App;

import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./AppRouter";
import { UserProvider } from './context/UserContext';


function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;



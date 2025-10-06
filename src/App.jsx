import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./AppRouter";
import { UserProvider } from './context/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <AppRouter />
        </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;



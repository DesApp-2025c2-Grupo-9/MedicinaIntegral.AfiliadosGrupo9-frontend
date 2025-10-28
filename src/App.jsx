import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./AppRouter";
import { UserProvider } from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Suspense fallback={<p>Ups... algo se rompio</p>}>
            <AppRouter />
          </Suspense>
        </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;

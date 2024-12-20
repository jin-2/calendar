import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Global } from "@emotion/react";
import Recruit from "./pages/Recruit/Recruit.tsx";
import globalStyles from "./styles/globalStyles.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 3,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={globalStyles} />
      <Recruit />
    </QueryClientProvider>
  );
}

export default App;

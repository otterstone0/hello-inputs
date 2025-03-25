
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="w-full h-full">
      <Index />
    </div>
  </QueryClientProvider>
);

export default App;

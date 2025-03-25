
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import { useEffect } from "react";
import { setupMessageListener } from "./utils/embedHelper";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Set up the message listener for parent window communication
    setupMessageListener(() => {
      // Return whatever form data is relevant from your application
      return window.HydrogenFormData.getFormData();
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-full">
        <Index />
      </div>
    </QueryClientProvider>
  );
};

export default App;

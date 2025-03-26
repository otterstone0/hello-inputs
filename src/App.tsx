
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import { useEffect } from "react";
import { setupMessageListener, saveFormDataForEmbed } from "./utils/embedHelper";
import { getStoredSubmissions } from "./utils/submissionHelper";

// Define the global HydrogenFormData interface
declare global {
  interface Window {
    HydrogenFormData: {
      getFormData: () => unknown;
      getSubmissions: () => unknown;
    };
  }
}

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize window object with form data access methods
    window.HydrogenFormData = {
      getFormData: () => {
        // This will be dynamically updated by the form component
        const formDataElement = document.getElementById('hydrogen-form-data');
        return formDataElement ? JSON.parse(formDataElement.textContent || '{}') : {};
      },
      getSubmissions: () => {
        // Return all stored submissions
        return getStoredSubmissions();
      }
    };
    
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

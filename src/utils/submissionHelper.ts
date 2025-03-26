
interface FormData {
  location: {
    country: string;
    usState: string;
  };
  preferences: Record<string, any>;
  storageDevices: Array<Record<string, any>>;
  fuelingEquipments: Array<Record<string, any>>;
  timestamp: string;
}

/**
 * Save form submission to GitHub file
 * @param data The form data to save
 */
export const saveSubmissionToGitHub = async (data: FormData): Promise<void> => {
  try {
    // Convert form data to JSON format with proper formatting
    const formattedSubmission = JSON.stringify(data, null, 2);
    
    // Store the submission in localStorage as a backup
    const previousSubmissions = localStorage.getItem('hydrogenFormSubmissions');
    const submissions = previousSubmissions ? JSON.parse(previousSubmissions) : [];
    
    submissions.push({
      ...data,
      id: `submission-${submissions.length + 1}`
    });
    
    localStorage.setItem('hydrogenFormSubmissions', JSON.stringify(submissions));
    
    // Send a message to parent window if embedded
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'FORM_SUBMISSION',
        data
      }, '*');
    }
    
    console.log('Submission data saved:', formattedSubmission);
  } catch (error) {
    console.error('Failed to save submission:', error);
    throw error;
  }
};

/**
 * Retrieve all stored submissions from localStorage
 * @returns Array of form submissions
 */
export const getStoredSubmissions = (): Array<FormData & { id: string }> => {
  const submissions = localStorage.getItem('hydrogenFormSubmissions');
  return submissions ? JSON.parse(submissions) : [];
};


/**
 * Helper functions for managing form submissions
 */

interface FormData {
  preferences: Record<string, any>;
  storageDevices: Array<Record<string, any>>;
  fuelingEquipments: Array<Record<string, any>>;
  timestamp: string;
}

/**
 * Save form submission to a file that can be easily accessed
 * @param data The form data to save
 */
export const saveSubmissionToFile = (data: FormData): void => {
  try {
    // Convert form data to CSV string
    const csvContent = convertToCSV(data);
    
    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create a download link
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    // Set link properties
    link.setAttribute('href', url);
    link.setAttribute('download', `hydrogen-form-submission-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.csv`);
    
    // Append to body, trigger click, and remove
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);
    
    // Also store in localStorage for backup access
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
  } catch (error) {
    console.error('Failed to save submission to file:', error);
  }
};

/**
 * Convert form data to CSV format
 * @param data The form data to convert
 * @returns CSV formatted string
 */
const convertToCSV = (data: FormData): string => {
  // Create CSV header
  let csv = 'Timestamp,Approach,MobileFeatures,UndergroundType,FuelingCapacity,FuelCells,H2Production,Combustion,SpecialAtmospheres,MetalHydrideStorage,StorageDevicesCount,FuelingEquipmentsCount\n';
  
  // Add main row
  csv += `"${data.timestamp}",`;
  csv += `"${data.preferences.approach}",`;
  csv += `"${data.preferences.mobileFeatures}",`;
  csv += `"${data.preferences.undergroundType}",`;
  csv += `"${data.preferences.fuelingCapacity}",`;
  csv += `"${data.preferences.fuelCells}",`;
  csv += `"${data.preferences.h2Production}",`;
  csv += `"${data.preferences.combustion}",`;
  csv += `"${data.preferences.specialAtmospheres}",`;
  csv += `"${data.preferences.metalHydrideStorage}",`;
  csv += `"${data.storageDevices.length}",`;
  csv += `"${data.fuelingEquipments.length}"\n`;
  
  // Add separator for storage devices
  csv += '\nStorage Devices:\n';
  
  if (data.storageDevices.length > 0) {
    // Add header for storage devices
    csv += 'Name,Type,Location,Sprinklers,ExhaustedEnclosure,Quantity,MaxPressure,MaxDiameter\n';
    
    // Add rows for each storage device
    data.storageDevices.forEach(device => {
      csv += `"${device.name}",`;
      csv += `"${device.type}",`;
      csv += `"${device.location}",`;
      csv += `"${device.sprinklers || false}",`;
      csv += `"${device.exhaustedEnclosure || false}",`;
      csv += `"${device.quantity}",`;
      csv += `"${device.maxPressure}",`;
      csv += `"${device.maxDiameter}"\n`;
    });
  }
  
  // Add separator for fueling equipment
  csv += '\nFueling Equipment:\n';
  
  if (data.fuelingEquipments.length > 0) {
    // Add header for fueling equipment
    csv += 'Name,Location,DispensedAs,PublicAccess\n';
    
    // Add rows for each fueling equipment
    data.fuelingEquipments.forEach(equipment => {
      csv += `"${equipment.name}",`;
      csv += `"${equipment.location}",`;
      csv += `"${equipment.dispensedAs}",`;
      csv += `"${equipment.publicAccess}"\n`;
    });
  }
  
  return csv;
};

/**
 * Retrieve all stored submissions from localStorage
 * @returns Array of form submissions
 */
export const getStoredSubmissions = (): Array<FormData & { id: string }> => {
  const submissions = localStorage.getItem('hydrogenFormSubmissions');
  return submissions ? JSON.parse(submissions) : [];
};

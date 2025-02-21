import axiosInstance from '../../../../helpers/backend_helper';

const updateReasonsToUse = async (title, text, subText, reasons) => {
  try {
    // Create the payload for the PATCH request
    const payload = {
      title,
      text,
      subText,
      reasons
    };

    // Make the PATCH request to update Reasons to Use
    const response = await axiosInstance.patch('/api/v1/contents/updateReasonsToUse/1', payload);

    console.log('Reasons to Use updated successfully:', response.data);
    return response.data.data.reasonsToUse; // Return the updated reasonsToUse object
  } catch (error) {
    console.error('Error updating Reasons to Use:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default updateReasonsToUse;

import axiosInstance from '../../../../helpers/backend_helper';

const getReasonsToUseById = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/contents/getReasonsToUseById/1');
    console.log('Reasons to Use details fetched successfully:', response.data);
    return response.data.data.reasonsToUse; // Returns the reasonsToUse object
  } catch (error) {
    console.error('Error fetching Reasons to Use details:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default getReasonsToUseById;

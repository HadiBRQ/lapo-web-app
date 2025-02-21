import axiosInstance from '../../../helpers/backend_helper';

const getNigeriaState = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/users/getNigeriaState');
    console.log('Nigeria states fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching Nigeria states:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default getNigeriaState;

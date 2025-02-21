import axiosInstance from '../../../helpers/backend_helper';

const getNigeriaLGAbyStateName = async (stateName) => {
  try {
    const response = await axiosInstance.post('/api/v1/users/getNigeriaLGAbyStateName', {
      stateName: stateName 
    });
    console.log('Nigeria LGAs fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching Nigeria LGAs:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default getNigeriaLGAbyStateName;

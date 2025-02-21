import axiosInstance from '../../../helpers/backend_helper';

const getAllDomesticCategories = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/domesticCategories');
    console.log('Domestic categories fetched successfully:', response.data);
    return response.data.data.categories; // Adjusted to access the categories array directly
  } catch (error) {
    console.error('Error fetching domestic categories:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default getAllDomesticCategories;

import axiosInstance from '../../../../helpers/backend_helper';

const getHowToGetStartedById = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/contents/getHowToGetStartedById/3');
    console.log('How to Get Started details fetched successfully:', response.data);
    return response.data.data.howToGetStarted; // Returns the howToGetStarted object
  } catch (error) {
    console.error('Error fetching How to Get Started details:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default getHowToGetStartedById;

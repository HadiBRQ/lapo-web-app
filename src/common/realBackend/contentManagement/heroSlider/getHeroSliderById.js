import axiosInstance from '../../../../helpers/backend_helper';

const getHeroSliderById = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/contents/getHeroSliderById/6');
    console.log('Hero slider fetched successfully:', response.data);
    return response.data.data.heroSlider; // Returns the heroSlider object
  } catch (error) {
    console.error('Error fetching hero slider:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default getHeroSliderById;

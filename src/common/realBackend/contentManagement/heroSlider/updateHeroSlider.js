import axiosInstance from '../../../../helpers/backend_helper';

const updateHeroSlider = async (backgroundImage, headerText, subText) => {
  try {
    // Create a new FormData instance to hold the form data
    const formData = new FormData();
    if (backgroundImage) {
      formData.append('backgroundImage', backgroundImage); // Append the file
    }
    formData.append('headerText', headerText); // Append the headerText
    formData.append('subText', subText); // Append the subText

    // Make the PATCH request to update the hero slider
    const response = await axiosInstance.patch('/api/v1/contents/updateHeroSlider/6', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type for file upload
      },
    });

    console.log('Hero slider updated successfully:', response.data);
    return response.data.data.heroSlider; // Return the updated heroSlider object
  } catch (error) {
    console.error('Error updating hero slider:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default updateHeroSlider;

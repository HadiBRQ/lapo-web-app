import axiosInstance from '../../../../helpers/backend_helper';

const updateHowToGetStarted = async (id, formData) => {
  try {
    const response = await axiosInstance.patch(`/api/v1/contents/updateHowToGetStarted/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Get started updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating How to Get Started:', error);
    throw error;
  }
};

export default updateHowToGetStarted;

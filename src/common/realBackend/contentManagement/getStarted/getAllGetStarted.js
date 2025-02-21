import axiosInstance from "helpers/backend_helper";

const getAllGetStarted = async () => {
  try {
    const response = await axiosInstance.get('api/v1/contents/getAllHowToGetStarteds');
    return response.data;
  } catch (error) {
    console.error('Error fetching all getstarted:', error);
    throw error;
  }
};

export default getAllGetStarted;

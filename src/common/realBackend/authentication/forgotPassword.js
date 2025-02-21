import axiosInstance from '../../../helpers/backend_helper';

const forgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post('api/v1/users/forgotPassword', {
      email: email,
    });
    return response.data;
  } catch (error) {
    console.error('Error requesting password reset:', error);
    throw error;
  }
};

export default forgotPassword;

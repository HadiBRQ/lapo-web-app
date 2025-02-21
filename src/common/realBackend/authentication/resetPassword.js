import axiosInstance from '../../../helpers/backend_helper';

const resetPassword = async (token, password) => {
  try {
    const response = await axiosInstance.patch('api/v1/users/resetPassword', {
      token: token,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

export default resetPassword;

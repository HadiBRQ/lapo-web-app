import axiosInstance from '../../../helpers/backend_helper';

const signUp = async (userData) => {
  try {
    const response = await axiosInstance.post('api/v1/users/signup', {
      ...userData,
      role: "admin",
    });
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export default signUp;

import axiosInstance from '../../../helpers/backend_helper';

const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('api/v1/users/login', {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.message);
    throw error;
  }
};

export default login;

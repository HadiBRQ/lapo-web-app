import axiosInstance from '../../../helpers/backend_helper';

const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('api/v1/users/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export default getUserProfile;

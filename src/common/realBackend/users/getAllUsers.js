import axiosInstance from '../../../helpers/backend_helper';

const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get('api/v1/admins/getAllUsers');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Re-throwing the error to be handled in the component
  }
};

export default getAllUsers;

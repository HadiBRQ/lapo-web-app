import axiosInstance from '../../../helpers/backend_helper';

const updateUser = async (id, userData) => {
  try {
    const response = await axiosInstance.patch(`api/v1/admins/updateUser/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

export default updateUser;

import axiosInstance from '../../../helpers/backend_helper';

const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`api/v1/admins/deleteUser/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
};

export default deleteUser;

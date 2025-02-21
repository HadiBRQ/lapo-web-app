import axiosInstance from '../../../helpers/backend_helper';

const getUser = async (id) => {
  try {
    const response = await axiosInstance.get(`api/v1/admins/getUser/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

export default getUser;

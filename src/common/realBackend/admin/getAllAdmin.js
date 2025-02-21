import axiosInstance from '../../../helpers/backend_helper';

const getAllAdmins = async () => {
  try {
    const response = await axiosInstance.get('api/v1/admins/getAllAdmins');
    return response.data;
  } catch (error) {
    console.error('Error fetching all admins:', error);
    throw error;
  }
};

export default getAllAdmins;

import axiosInstance from '../../../helpers/backend_helper';

const deleteBlacklistedCandidate = async (id) => {
  try {
    const response = await axiosInstance.delete(`api/v1/candidates/deleteBlacklistedCandidate/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting blacklisted candidate with ID ${id}:`, error);
    throw error;
  }
};

export default deleteBlacklistedCandidate;

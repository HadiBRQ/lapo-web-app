import axiosInstance from '../../../helpers/backend_helper';

const getBlacklistedCandidateById = async (id) => {
  try {
    const response = await axiosInstance.get(`api/v1/candidates/getBlacklistedCandidateById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blacklisted candidate with ID ${id}:`, error);
    throw error;
  }
};

export default getBlacklistedCandidateById;

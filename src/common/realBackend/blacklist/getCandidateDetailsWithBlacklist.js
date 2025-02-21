import axiosInstance from '../../../helpers/backend_helper';

const getCandidateDetailsWithBlacklist = async (id) => {
  try {
    const response = await axiosInstance.get(`api/v1/candidates/getCandidateDetailsWithBlacklistThreshold/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching candidate details with blacklist threshold for ID ${id}:`, error);
    throw error;
  }
};

export default getCandidateDetailsWithBlacklist;

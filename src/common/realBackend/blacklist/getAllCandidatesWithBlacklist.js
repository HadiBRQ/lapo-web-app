import axiosInstance from '../../../helpers/backend_helper';

const getAllCandidatesWithBlacklist = async () => {
  try {
    const response = await axiosInstance.get('api/v1/candidates/getAllCandidatesWithBlacklistThreshold');
    return response.data;
  } catch (error) {
    console.error('Error fetching candidates with blacklist threshold:', error);
    throw error;
  }
};

export default getAllCandidatesWithBlacklist;

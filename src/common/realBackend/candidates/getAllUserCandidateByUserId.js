import axiosInstance from '../../../helpers/backend_helper';

const getAllUserCandidatesByUserId = async (userId) => {
  try {
    const response = await axiosInstance.get(`api/v1/candidates/getAllUserCandidatesByUserId/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user candidates by userId:', error);
    throw error;
  }
};

export default getAllUserCandidatesByUserId;

import axiosInstance from '../../../helpers/backend_helper';

const getAllCandidates = async () => {
  try {
    const response = await axiosInstance.get('api/v1/candidates/getAllCandidates');
    return response.data;
  } catch (error) {
    console.error('Error fetching all candidates:', error);
    throw error;
  }
};

export default getAllCandidates;

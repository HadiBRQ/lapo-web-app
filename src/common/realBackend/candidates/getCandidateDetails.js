import axiosInstance from '../../../helpers/backend_helper';

const getCandidateDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`api/v1/candidates/getCandidateDetails/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for candidate with ID ${id}:`, error);
    throw error;
  }
};

export default getCandidateDetails;

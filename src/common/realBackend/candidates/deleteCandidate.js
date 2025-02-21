import axiosInstance from '../../../helpers/backend_helper';

const deleteCandidate = async (id) => {
  try {
    const response = await axiosInstance.delete(`api/v1/candidates/deleteCandidate/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting candidate with ID ${id}:`, error);
    throw error;
  }
};

export default deleteCandidate;

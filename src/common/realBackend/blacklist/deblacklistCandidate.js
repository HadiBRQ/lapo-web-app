import axiosInstance from '../../../helpers/backend_helper';

const deblacklistCandidate = async (candidateId) => {
  try {
    const response = await axiosInstance.post('api/v1/candidates/deblacklistCandidate', {
      candidateId: candidateId,
    });
    return response.data;
  } catch (error) {
    console.error('Error de-blacklisting candidate:', error);
    throw error;
  }
};

export default deblacklistCandidate;

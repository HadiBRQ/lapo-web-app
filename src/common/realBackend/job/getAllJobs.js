import axiosInstance from '../../../helpers/backend_helper';

const getAllJobs = async () => {
  try {
    const response = await axiosInstance.get('api/v1/jobs');
    return response.data;
  } catch (error) {
    console.error('Error fetching all jobs:', error);
    throw error;
  }
};

export default getAllJobs;

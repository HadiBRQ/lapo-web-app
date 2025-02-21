import axiosInstance from '../../../../helpers/backend_helper';

const getBlacklistById = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/contents/getBlacklistById/1');
    console.log('Blacklist details fetched successfully:', response.data);
    return response.data.data.blacklist; // Returns the blacklist object
  } catch (error) {
    console.error('Error fetching blacklist details:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default getBlacklistById;

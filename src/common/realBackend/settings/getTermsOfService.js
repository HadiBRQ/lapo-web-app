import axiosInstance from '../../../helpers/backend_helper';

const getTermsOfService = async () => {
  try {
    const response = await axiosInstance.get('api/v1/settings/getSettingById/9');
    return response.data;
  } catch (error) {
    console.error('Error fetching terms of service:', error);
    throw error;
  }
};

export default getTermsOfService;

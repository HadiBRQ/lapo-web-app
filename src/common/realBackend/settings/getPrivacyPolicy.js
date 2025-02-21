import axiosInstance from '../../../helpers/backend_helper';

const getPrivacyPolicy = async () => {
  try {
    const response = await axiosInstance.get('api/v1/settings/getSettingById/10');
    return response.data;
  } catch (error) {
    console.error('Error fetching privacy policy:', error);
    throw error;
  }
};

export default getPrivacyPolicy;

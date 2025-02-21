import axiosInstance from '../../../helpers/backend_helper';

const getBlacklistThresholdValue = async () => {
  try {
    const response = await axiosInstance.get('api/v1/settings/getSettingById/1');
    return response.data;
  } catch (error) {
    console.error('Error fetching blacklist threshold value:', error);
    throw error;
  }
};

export default getBlacklistThresholdValue;

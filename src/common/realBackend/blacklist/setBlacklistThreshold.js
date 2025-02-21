import axiosInstance from '../../../helpers/backend_helper';

const setBlacklistThreshold = async (value) => {
  try {
    const response = await axiosInstance.patch('api/v1/settings/updateSetting/1', {
      key: "blacklistThreshold",
      value: value,
    });
    return response.data;
  } catch (error) {
    console.error('Error setting blacklist threshold value:', error);
    throw error;
  }
};

export default setBlacklistThreshold;

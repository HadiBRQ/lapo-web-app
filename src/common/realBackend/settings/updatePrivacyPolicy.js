import axiosInstance from '../../../helpers/backend_helper';

const updatePrivacyPolicy = async (value) => {
  try {
    const response = await axiosInstance.patch('api/v1/settings/updateSetting/10', {
      key: "privacyPolicy",
      value: value,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating privacy policy:', error);
    throw error;
  }
};

export default updatePrivacyPolicy;

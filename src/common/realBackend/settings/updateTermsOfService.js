import axiosInstance from '../../../helpers/backend_helper';

const updateTermsOfService = async (value) => {
  try {
    const response = await axiosInstance.patch('api/v1/settings/updateSetting/9', {
      key: "termsOfService",
      value: value,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating terms of service:', error);
    throw error;
  }
};

export default updateTermsOfService;

import axiosInstance from "helpers/backend_helper";

const getAllBlacklists = async () => {
  try {
    const response = await axiosInstance.get('api/v1/contents/getAllBlacklists');
    return response.data;
  } catch (error) {
    console.error('Error fetching blacklist contents:', error);
    throw error;
  }
};

export default getAllBlacklists;

import axiosInstance from '../../../helpers/backend_helper';

const updateUserAcceptanceStatus = async (id, acceptanceStatus) => {
  try {
    const response = await axiosInstance.patch(`api/v1/admins/updateUserAcceptanceStatus/${id}`, {
      acceptanceStatus,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating user acceptance status for ID ${id}:`, error);
    throw error;
  }
};

export default updateUserAcceptanceStatus;

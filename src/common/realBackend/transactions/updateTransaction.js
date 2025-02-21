import axiosInstance from '../../../helpers/backend_helper';

const updateTransaction = async (id, status) => {
  try {
    const response = await axiosInstance.patch(`api/v1/paystackTransaction/updateTransaction/${id}`, {
      status: status,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating transaction with ID ${id}:`, error);
    throw error;
  }
};

export default updateTransaction;

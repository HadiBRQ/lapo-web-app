import axiosInstance from '../../../helpers/backend_helper';

const deleteTransaction = async (id) => {
  try {
    const response = await axiosInstance.delete(`api/v1/paystackTransaction/deleteTransaction/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting transaction with ID ${id}:`, error);
    throw error;
  }
};

export default deleteTransaction;

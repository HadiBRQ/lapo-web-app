import axiosInstance from '../../../helpers/backend_helper';

const getTransactionById = async (id) => {
  try {
    const response = await axiosInstance.get(`api/v1/paystackTransaction/getTransactionById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching transaction with ID ${id}:`, error);
    throw error;
  }
};

export default getTransactionById;

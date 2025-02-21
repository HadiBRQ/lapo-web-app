import axiosInstance from '../../../helpers/backend_helper';

const getAllTransactions = async () => {
  try {
    const response = await axiosInstance.get('api/v1/paystackTransaction/getAllTransactions');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export default getAllTransactions;
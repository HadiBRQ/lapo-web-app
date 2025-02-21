import axiosInstance from '../../../helpers/backend_helper';

const deleteSubscriptionPlan = async (id) => {
  try {
    const response = await axiosInstance.delete(`api/v1/subscriptionPlans/deleteSubscriptionPlan/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting subscription plan:', error);
    throw error;
  }
};

export default deleteSubscriptionPlan;

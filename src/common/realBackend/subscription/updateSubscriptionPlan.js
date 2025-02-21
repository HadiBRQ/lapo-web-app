import axiosInstance from '../../../helpers/backend_helper';

const updateSubscriptionPlan = async (id, planData) => {
  try {
    const response = await axiosInstance.patch(`api/v1/subscriptionPlans/updateSubscriptionPlan/${id}`, planData);
    return response.data;
  } catch (error) {
    console.error('Error updating subscription plan:', error);
    throw error;
  }
};

export default updateSubscriptionPlan;

import axiosInstance from '../../../helpers/backend_helper';

const createSubscriptionPlan = async (planData) => {
  try {
    const response = await axiosInstance.post('api/v1/subscriptionPlans/createSubscriptionPlan', planData);
    return response.data;
  } catch (error) {
    console.error('Error creating subscription plan:', error);
    throw error;
  }
};

export default createSubscriptionPlan;

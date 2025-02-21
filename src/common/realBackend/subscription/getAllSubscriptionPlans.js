import axiosInstance from '../../../helpers/backend_helper';

const getSubscriptionPlans = async () => {
  try {
    const response = await axiosInstance.get('api/v1/subscriptionPlans/getAllSubscriptionPlans');
    return response.data.data.subscriptionPlans;
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    throw error;
  }
};

export default getSubscriptionPlans;

import axiosInstance from '../../../helpers/backend_helper';

const getSubscriptionPlanById = async (id) => {
  try {
    const response = await axiosInstance.get(`api/v1/subscriptionPlans/getSubscriptionPlanById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for subscription plan with ID ${id}:`, error);
    throw error;
  }
};

export default getSubscriptionPlanById;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from 'reactstrap'; // Adjust according to your library
import getSubscriptionPlans from 'common/realBackend/subscription/getAllSubscriptionPlans';

const SubscriptionDropdown = ({ subscriptionPlans = [], onSelectPlan, values = [] }) => {
  // Handle the change event
  const handleChange = (event) => {
    const selectedPlanId = event.target.value;
    onSelectPlan(selectedPlanId); // Call the parent function with the selected ID
  };

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plansData = await getSubscriptionPlans();
        setPlans(plansData);
      } catch (error) {
        console.error('Error fetching subscription plans:', error);
      }
    };

    // Fetch plans if not provided via props
    if (!subscriptionPlans || subscriptionPlans.length === 0) {
      fetchPlans();
    } else {
      setPlans(subscriptionPlans);
    }
  }, [subscriptionPlans]);

  return (
    <div className="mb-3">
      <Label className="form-label">Subscription Plan</Label>
      <Input
        type="select"
        name="subscriptionPlanId"
        value={values.subscriptionPlanId || ''} // Use values from props
        onChange={handleChange}
        aria-label="Select subscription plan"
      >
        <option value="" disabled>
          Select a plan
        </option>
        {plans.map((plan) => (
          <option key={plan.id} value={plan.id}>
            {plan.name} ({plan.price})
          </option>
        ))}
      </Input>
    </div>
  );
};

SubscriptionDropdown.propTypes = {
  subscriptionPlans: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  values: PropTypes.shape({
    subscriptionPlanId: PropTypes.number,
  }).isRequired,
  onSelectPlan: PropTypes.func.isRequired,
};

export default SubscriptionDropdown;

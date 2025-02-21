import React, {useEffect} from 'react';
import { Row, Col, Label, Input, FormFeedback } from 'reactstrap';
import { Formik, Field, Form } from 'formik';
import SubscriptionDropdown from './SubscriptionPlanDropDown';

const UserProfileForm = ({
  initialValues,
  onSubmit,
  onClose,
  isEdit,
  userId,
  initialSubscriptionPlanName,
  subscriptionPlans,
  handleChange,
  formik,
  handleSelectPlan
}) => {
  // useEffect(() => {
  //   formik.resetForm({ values: initialValues });
  // }, [initialValues, isEdit]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize 
    >
      {({ values, handleChange, touched, errors, resetForm }) => (
      <Form>
        <Row>
          <Col xs={12}>
            <div className="mb-3">
              <Label className="form-label">First Name</Label>
              <Field
                name="firstName"
                type="text"
                as={Input}
                placeholder="Insert First Name"
                invalid={touched.firstName && !!errors.firstName}
              />
              {touched.firstName && errors.firstName ? (
                <FormFeedback>{errors.firstName}</FormFeedback>
              ) : null}
            </div>

            <div className="mb-3">
              <Label className="form-label">Last Name</Label>
              <Field
                name="lastName"
                type="text"
                as={Input}
                placeholder="Insert Last Name"
                invalid={touched.lastName && !!errors.lastName}
              />
              {touched.lastName && errors.lastName ? (
                <FormFeedback>{errors.lastName}</FormFeedback>
              ) : null}
            </div>

            <div className="mb-3">
              <Label className="form-label">Email</Label>
              <Field
                name="email"
                type="email"
                as={Input}
                placeholder="Insert Email"
                invalid={touched.email && !!errors.email}
              />
              {touched.email && errors.email ? (
                <FormFeedback>{errors.email}</FormFeedback>
              ) : null}
            </div>

            <div className="mb-3">
              <Label className="form-label">Password</Label>
              <Field
                name="password"
                type="password"
                as={Input}
                placeholder="Insert Password (Leave blank to keep current)"
                invalid={touched.password && !!errors.password}
              />
              {touched.password && errors.password ? (
                <FormFeedback>{errors.password}</FormFeedback>
              ) : null}
            </div>

            <div className="mb-3">
              <Label className="form-label">Phone Number</Label>
              <Field
                name="phoneNumber"
                type="text"
                as={Input}
                placeholder="Insert Phone Number"
                invalid={touched.phoneNumber && !!errors.phoneNumber}
              />
              {touched.phoneNumber && errors.phoneNumber ? (
                <FormFeedback>{errors.phoneNumber}</FormFeedback>
              ) : null}
            </div>

            <div className="mb-3">
              <Label className="form-label">Address</Label>
              <Field
                name="address"
                type="text"
                as={Input}
                placeholder="Insert Address"
                invalid={touched.address && !!errors.address}
              />
              {touched.address && errors.address ? (
                <FormFeedback>{errors.address}</FormFeedback>
              ) : null}
            </div>

            <div className="mb-3">
              <Label className="form-label">Role</Label>
              <Field
                name="role"
                as={Input}
                type="select"
                invalid={touched.role && !!errors.role}
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Field>
              {touched.role && errors.role ? (
                <FormFeedback>{errors.role}</FormFeedback>
              ) : null}
            </div>
            <div className="mb-3">
                <SubscriptionDropdown
                values={values}
                handleChange={handleChange} // Pass handleChange to the dropdown
                subscriptionPlans={subscriptionPlans}
                onSelectPlan={handleSelectPlan}// Pass subscription plans to dropdown
              />
      </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-end">
            <button
              type="submit"
              className="btn btn-success"
            >
              {!!isEdit ? "Save Changes" : "Create"}
            </button>
            </div>
          </Col>
        </Row>
      </Form>
    )}
  </Formik>
);

};

export default UserProfileForm;

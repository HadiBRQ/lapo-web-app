import React from "react";
import { Formik, Field, Form } from "formik";
import { Button, FormGroup, Label, Row, Col } from "reactstrap";
import signUp from "../../../helpers/backend_helper";
import TokenModal from "./TokenModal";

const CreateAdmin = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleCreate = async (adminData) => {
    try {
      const response = await signUp(adminData);
      console.log("Sign up response:", response.data); // Log the response
      setModalOpen(true);
    } catch (error) {
      console.error("Error creating admin:", error);
      // Handle error (e.g., show a notification)
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          address: "",
          password: ""
        }}
        onSubmit={(values, { resetForm }) => {
          const adminData = {
            ...values,
            role: "admin"
          };
          handleCreate(adminData);
          resetForm();
        }}
      >
        {() => (
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Field
                    name="firstName"
                    type="text"
                    className="form-control"
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="lastName">Last Name</Label>
                  <Field
                    name="lastName"
                    type="text"
                    className="form-control"
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Field
                    name="email"
                    type="email"
                    className="form-control"
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="phoneNumber">Phone Number</Label>
                  <Field
                    name="phoneNumber"
                    type="text"
                    className="form-control"
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="address">Address</Label>
                  <Field
                    name="address"
                    type="text"
                    className="form-control"
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button type="submit" color="primary">Create Admin</Button>
          </Form>
        )}
      </Formik>
      <TokenModal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} />
    </>
  );
};

export default CreateAdmin;

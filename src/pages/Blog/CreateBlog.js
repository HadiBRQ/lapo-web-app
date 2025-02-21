import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, CardTitle, Col, Container, FormGroup, Label, Row } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// Import API functions
import createBlog from "common/realBackend/blog/createBlog";

// Validation schema
const BlogSchema = Yup.object().shape({
  backgroundImage: Yup.mixed().required("Background Image is required"),
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
});

const BlogForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [initialValues, setInitialValues] = useState({
    backgroundImage: null,
    title: "",
    content: "",
  });

  // Handle form submission to create a blog post
  const handleSubmit = async (values) => {
    try {
      const createdBlog = await createBlog(
        values.backgroundImage,
        values.title,
        values.content
      );
      console.log("Created Blog Data:", createdBlog);

      // Optionally, reset the form after submission
      setInitialValues({
        backgroundImage: null,
        title: "",
        content: "",
      });

      // Reset image preview
      setImagePreview(null);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  // Meta title
  document.title = "Create Blog | LAPO Web App";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Blog" breadcrumbItem="Create New" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Create Blog</CardTitle>
                  <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={BlogSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ setFieldValue, errors, touched }) => (
                      <Form>
                        <FormGroup className="mb-4" row>
                          <Label className="col-form-label col-lg-2">
                            Background Image
                          </Label>
                          <Col lg="10">
                            <input
                              name="backgroundImage"
                              type="file"
                              accept="image/*"
                              className={`form-control${errors.backgroundImage && touched.backgroundImage ? " is-invalid" : ""}`}
                              onChange={(event) => {
                                const file = event.currentTarget.files[0];
                                setFieldValue("backgroundImage", file);

                                // Create image preview
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setImagePreview(reader.result);
                                };
                                if (file) {
                                  reader.readAsDataURL(file);
                                } else {
                                  setImagePreview(null);
                                }
                              }}
                            />
                            {errors.backgroundImage && touched.backgroundImage ? (
                              <div className="invalid-feedback">{errors.backgroundImage}</div>
                            ) : null}
                            {imagePreview && (
                              <div className="mt-3">
                                <img src={imagePreview} alt="Image Preview" className="img-thumbnail" style={{ maxWidth: "100%", height: "auto", maxHeight: "200px", minHeight: "100px" }} />
                              </div>
                            )}
                          </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                          <Label className="col-form-label col-lg-2">
                            Title
                          </Label>
                          <Col lg="10">
                            <Field
                              name="title"
                              type="text"
                              className={`form-control${errors.title && touched.title ? " is-invalid" : ""}`}
                              placeholder="Enter the blog title"
                            />
                            {errors.title && touched.title ? (
                              <div className="invalid-feedback">{errors.title}</div>
                            ) : null}
                          </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                          <Label className="col-form-label col-lg-2">
                            Content
                          </Label>
                          <Col lg="10">
                            <Field
                              name="content"
                              as="textarea"
                              className={`form-control${errors.content && touched.content ? " is-invalid" : ""}`}
                              placeholder="Enter the blog content"
                              rows="5"
                            />
                            {errors.content && touched.content ? (
                              <div className="invalid-feedback">{errors.content}</div>
                            ) : null}
                          </Col>
                        </FormGroup>
                        <Row className="justify-content-end">
                          <Col lg="10">
                            <Button type="submit" color="primary">
                              Create Blog
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BlogForm;

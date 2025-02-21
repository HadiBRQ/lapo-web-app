import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, CardTitle, Col, Container, FormGroup, Label, Row } from "reactstrap";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import getAllGetStarted from "common/realBackend/contentManagement/getStarted/getAllGetStarted";
import updateHowToGetStarted from "common/realBackend/contentManagement/getStarted/updateHowToGetStarted";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Validation schema
const GetStartedSchema = Yup.object().shape({
  image1: Yup.mixed().required("Image 1 is required"),
  image2: Yup.mixed().required("Image 2 is required"),
  videoLink: Yup.string().url("Invalid URL").required("YouTube Video Link is required"),
  mainText: Yup.string().required("Main Text is required"),
  subText: Yup.string().required("Sub Text is required"),
  steps: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("Step Title is required"),
      subText: Yup.string().required("Step Sub Text is required"),
    })
  ).required("At least one step is required"),
});

const GetStartedForm = () => {
  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [latestId, setLatestId] = useState(null);
  const [initialImages, setInitialImages] = useState({ image1: null, image2: null });
  const [initialValues, setInitialValues] = useState({
    image1: null,
    image2: null,
    videoLink: "",
    mainText: "",
    subText: "",
    steps: [{ title: "", subText: "" }],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllGetStarted();
        const allData = response.data.howToGetStarteds;
        const latestData = allData[allData.length - 1]; // Get the last element

        setLatestId(latestData.id);

        if (latestData) {
          const images = latestData.images || [];
          setInitialImages({
            image1: images[0]?.imageUrl || null,
            image2: images[1]?.imageUrl || null,
          });

          setInitialValues({
            image1: null, // Reset initial values for new images
            image2: null,
            videoLink: latestData.youtubeLink || "",
            mainText: latestData.mainText || "",
            subText: latestData.subText || "",
            steps: latestData.steps.map(step => ({
              title: step.title || "",
              subText: step.subText || "",
            })) || [{ title: "", subText: "" }],
          });

          setImagePreview1(images[0]?.imageUrl || null);
          setImagePreview2(images[1]?.imageUrl || null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Append images: if new file is selected, use it; otherwise, use the initial image URL
      if (values.image1) {
        formData.append('images', values.image1);
      } else if (initialImages.image1) {
        formData.append('images', initialImages.image1);
      }

      if (values.image2) {
        formData.append('images', values.image2);
      } else if (initialImages.image2) {
        formData.append('images', initialImages.image2);
      }

      // Append other data
      formData.append("youtubeLink", values.videoLink);
      formData.append("mainText", values.mainText);
      formData.append("subText", values.subText);
      formData.append("steps", JSON.stringify(values.steps));
  
      // Log FormData contents
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      
      // Send data to API
      await updateHowToGetStarted(latestId, formData);
      toast.success("Get Started has been updated successfully");
    } catch (error) {
      console.error("Error updating Get Started:", error);
      toast.error("Error updating Get Started");
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };
  // meta title
  document.title = "Get Started | LAPO Web App";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Get Started" breadcrumbItem="Create New" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Create Get Started Section</CardTitle>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={GetStartedSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize={true} // Ensure Formik reinitializes when initialValues change
                  >
                    {({ setFieldValue, values, errors, touched }) => (
                      <Form>
                        <FormGroup className="mb-4" row>
                          <Label className="col-form-label col-lg-2">
                            Image 1
                          </Label>
                          <Col lg="10">
                          <input
                                name="image1"
                                type="file"
                                accept="image/*"
                                className={`form-control${errors.image1 && touched.image1 ? " is-invalid" : ""}`}
                                onChange={(event) => {
                                  const file = event.currentTarget.files[0];
                                  setFieldValue("image1", file);

                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => setImagePreview1(reader.result);
                                    reader.readAsDataURL(file);
                                  } else {
                                    setImagePreview1(initialImages.image1 || null);
                                  }
                                }}
                              />
                            {errors.image1 && touched.image1 ? (
                              <div className="invalid-feedback">{errors.image1}</div>
                            ) : null}
                            {imagePreview1 && (
                              <div className="mt-3">
                                <img src={imagePreview1} alt="Image 1 Preview" className="img-thumbnail" style={{ maxWidth: "150px", maxHeight: "150px" }} />
                              </div>
                            )}
                          </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                          <Label className="col-form-label col-lg-2">
                            Image 2
                          </Label>
                          <Col lg="10">
                          <input
                                  name="image2"
                                  type="file"
                                  accept="image/*"
                                  className={`form-control${errors.image2 && touched.image2 ? " is-invalid" : ""}`}
                                  onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    setFieldValue("image2", file);

                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => setImagePreview2(reader.result);
                                      reader.readAsDataURL(file);
                                    } else {
                                      setImagePreview2(initialImages.image2 || null);
                                    }
                                  }}
                                />
                            {errors.image2 && touched.image2 ? (
                              <div className="invalid-feedback">{errors.image2}</div>
                            ) : null}
                            {imagePreview2 && (
                              <div className="mt-3">
                                <img src={imagePreview2} alt="Image 2 Preview" className="img-thumbnail" style={{ maxWidth: "150px", maxHeight: "150px" }} />
                              </div>
                            )}
                          </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                          <Label className="col-form-label col-lg-2">
                            YouTube Video Link
                          </Label>
                          <Col lg="10">
                            <Field
                              name="videoLink"
                              type="text"
                              className={`form-control${errors.videoLink && touched.videoLink ? " is-invalid" : ""}`}
                              placeholder="Enter YouTube video link"
                            />
                            {errors.videoLink && touched.videoLink ? (
                              <div className="invalid-feedback">{errors.videoLink}</div>
                            ) : null}
                          </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                          <Label className="col-form-label col-lg-2">
                            Main Text
                          </Label>
                          <Col lg="10">
                            <Field
                              name="mainText"
                              type="text"
                              className={`form-control${errors.mainText && touched.mainText ? " is-invalid" : ""}`}
                              placeholder="Enter the main text"
                            />
                            {errors.mainText && touched.mainText ? (
                              <div className="invalid-feedback">{errors.mainText}</div>
                            ) : null}
                          </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                          <Label className="col-form-label col-lg-2">
                            Sub Text
                          </Label>
                          <Col lg="10">
                            <Field
                              name="subText"
                              as="textarea"
                              className={`form-control${errors.subText && touched.subText ? " is-invalid" : ""}`}
                              placeholder="Enter the subtext"
                              rows="3"
                            />
                            {errors.subText && touched.subText ? (
                              <div className="invalid-feedback">{errors.subText}</div>
                            ) : null}
                          </Col>
                        </FormGroup>

                        <FieldArray name="steps">
                          {({ push, remove }) => (
                            <>
                              {values.steps.map((_, index) => (
                                <div key={index}>
                                  <FormGroup className="mb-4" row>
                                    <Label className="col-form-label col-lg-2">
                                      Step {index + 1} Title
                                    </Label>
                                    <Col lg="10">
                                      <Field
                                        name={`steps[${index}].title`}
                                        type="text"
                                        className={`form-control${errors.steps?.[index]?.title && touched.steps?.[index]?.title ? " is-invalid" : ""}`}
                                        placeholder={`Enter title for step ${index + 1}`}
                                      />
                                      {errors.steps?.[index]?.title && touched.steps?.[index]?.title ? (
                                        <div className="invalid-feedback">{errors.steps[index].title}</div>
                                      ) : null}
                                    </Col>
                                  </FormGroup>

                                  <FormGroup className="mb-4" row>
                                    <Label className="col-form-label col-lg-2">
                                      Step {index + 1} Sub Text
                                    </Label>
                                    <Col lg="10">
                                      <Field
                                        name={`steps[${index}].subText`}
                                        as="textarea"
                                        className={`form-control${errors.steps?.[index]?.subText && touched.steps?.[index]?.subText ? " is-invalid" : ""}`}
                                        placeholder={`Enter sub text for step ${index + 1}`}
                                        rows="3"
                                      />
                                      {errors.steps?.[index]?.subText && touched.steps?.[index]?.subText ? (
                                        <div className="invalid-feedback">{errors.steps[index].subText}</div>
                                      ) : null}
                                    </Col>
                                  </FormGroup>

                                  {index > 0 && (
                                    <Row className="justify-content-end mb-4">
                                      <Col lg="10">
                                        <Button type="button" color="danger" onClick={() => remove(index)}>
                                          Remove Step
                                        </Button>
                                      </Col>
                                    </Row>
                                  )}
                                </div>
                              ))}
                              <Row className="justify-content-end">
                                <Col lg="10">
                                  <Button type="button" color="success" onClick={() => push({ title: "", subText: "" })}>
                                    Add Step
                                  </Button>
                                </Col>
                              </Row>
                            </>
                          )}
                        </FieldArray>

                        <Row className="justify-content-end">
                          <Col lg="10">
                            <Button type="submit" color="primary" disabled={isSubmitting}>
                            {isSubmitting ? "Updating..." : "Create Get Started Section"}
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
        <ToastContainer />
      </div>
    </React.Fragment>
  );
};

export default GetStartedForm;

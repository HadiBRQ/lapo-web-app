import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, CardTitle, Col, Container, FormGroup, Label, Row } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// Import API functions
import getHeroSliderById from "common/realBackend/contentManagement/heroSlider/getHeroSliderById";
import updateHeroSlider from "common/realBackend/contentManagement/heroSlider/updateHeroSlider";

// Validation schema
const HeroSliderSchema = Yup.object().shape({
  backgroundImage: Yup.mixed().required("Background Image is required"),
  headerText: Yup.string()
    .max(50, "Header Text cannot exceed 50 characters")
    .required("Header Text is required"),
  subText: Yup.string().required("Sub Text is required"),
});

const HeroSliderForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [initialValues, setInitialValues] = useState({
    backgroundImage: null,
    headerText: "",
    subText: "",
  });

  // Fetch hero slider data on component mount
  useEffect(() => {
    const fetchHeroSlider = async () => {
      try {
        const heroSlider = await getHeroSliderById();
        console.log("Fetched Hero Slider Data:", heroSlider);

        // Update initial values with fetched data
        setInitialValues({
          backgroundImage: heroSlider.backgroundImage[0].imageUrl,
          headerText: heroSlider.headerText,
          subText: heroSlider.subText,
        });

        // Set image preview
        setImagePreview(heroSlider.backgroundImage[0].imageUrl);
      } catch (error) {
        console.error("Error fetching hero slider:", error);
      }
    };

    fetchHeroSlider();
  }, []);

  // Handle form submission to update hero slider
  const handleSubmit = async (values) => {
    try {
      const updatedHeroSlider = await updateHeroSlider(
        values.backgroundImage,
        values.headerText,
        values.subText
      );
      console.log("Updated Hero Slider Data:", updatedHeroSlider);

      // Optionally, update the form with the new data
      setInitialValues({
        backgroundImage: updatedHeroSlider.backgroundImage[0].imageUrl,
        headerText: updatedHeroSlider.headerText,
        subText: updatedHeroSlider.subText,
      });

      // Update image preview
      setImagePreview(updatedHeroSlider.backgroundImage[0].imageUrl);
    } catch (error) {
      console.error("Error updating hero slider:", error);
    }
  };

  // Meta title
  document.title = "Hero Slider | LAPO Web App";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Hero Slider" breadcrumbItem="Create New" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Create Hero Slider</CardTitle>
                  <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={HeroSliderSchema}
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
                            Header Text
                          </Label>
                          <Col lg="10">
                            <Field
                              name="headerText"
                              type="text"
                              className={`form-control${errors.headerText && touched.headerText ? " is-invalid" : ""}`}
                              placeholder="Enter the header text"
                              maxLength="50"
                            />
                            {errors.headerText && touched.headerText ? (
                              <div className="invalid-feedback">{errors.headerText}</div>
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
                              rows="5"
                            />
                            {errors.subText && touched.subText ? (
                              <div className="invalid-feedback">{errors.subText}</div>
                            ) : null}
                          </Col>
                        </FormGroup>
                        <Row className="justify-content-end">
                          <Col lg="10">
                            <Button type="submit" color="primary">
                              Create Hero Slider
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

export default HeroSliderForm;

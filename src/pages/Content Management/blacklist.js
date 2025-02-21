import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, Col, Container, FormGroup, Label, Row } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import getBlacklistById from "common/realBackend/contentManagement/blacklist.js/getBlacklistById";
import updateBlacklist from "common/realBackend/contentManagement/blacklist.js/updateBlacklist";

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Validation schema
const BlacklistSchema = Yup.object().shape({
  image1: Yup.mixed().required("Image 1 is required"),
  image2: Yup.mixed().required("Image 2 is required"),
  videoLink: Yup.string().url("Invalid URL").required("YouTube Video Link is required"),
  titleText: Yup.string().required("Title Text is required"),
  subText: Yup.string().required("Sub Text is required"),
});

const BlacklistForm = () => {
  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialValues, setInitialValues] = useState({
    image1: null,
    image2: null,
    videoLink: "",
    titleText: "",
    subText: "",
  });

  //Fetch the Blacklist Contentents
  useEffect(() => {
    const fetchBlacklists = async () => {
      try {
        const blacklistsContent = await getBlacklistById();
        console.log("Fetched Blacklist contents:", blacklistsContent);

        //Update the Initial Values with the newly fetched Values from the API
        setInitialValues({
          image1: blacklistsContent.images[0].imageUrl,
          image2: blacklistsContent.images[1].imageUrl,
          videoLink: blacklistsContent.youtubeLink,
          titleText: blacklistsContent.titleText,
          subText: blacklistsContent.subText,
        });

        // Set image preview
        setImagePreview1(blacklistsContent.images[0].imageUrl);
        setImagePreview2(blacklistsContent.images[1].imageUrl);
      } catch (error) {
        console.log("Error Fetching Blacklist Contents:", error);
      }

    }

    fetchBlacklists();
  }, []);

  //Handle the Form submission to update the Blacklist Contents
  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      // Pass images as an array to the updateBlacklist function
      let blacklistsContent = await getBlacklistById();
      const images = [values.image1, values.image2].filter(img => img instanceof File);
      if (images.length === 0) { images.push(...blacklistsContent.images.map(img => img.imageUrl))};
      console.log("Values:", images);

      const updateBlacklists = await updateBlacklist(
        images, // Pass images as an array
        values.videoLink,
        values.titleText,
        values.subText
      );
      

      // On the side, update the form with the newly acquired Data of the Blacklist
      setInitialValues({
        image1: updateBlacklists.images[0].imageUrl,
        image2: updateBlacklists.images[1].imageUrl,
        videoLink: updateBlacklists.youtubeLink,
        titleText: updateBlacklists.titleText,
        subText: updateBlacklists.subText,
      }); 
  
      // And then finally, also update the Preview Images
      setImagePreview1(updateBlacklists.images[0].imageUrl);
      setImagePreview2(updateBlacklists.images[1].imageUrl);
      toast.success('Blacklist updated successfully!');
  
    } catch (error) {
      console.error("Error Updating Blacklist Contents:", error);
      toast.error('Error updating blacklist. Please try again.');
    } finally {
      setIsSubmitting(false); //Set the submitting to False
    }
  }


  // meta title
  document.title = "Blacklist Form | LAPO Web App";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Blacklist" breadcrumbItem="Create New" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Create Blacklist Entry</CardTitle>
                  <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={BlacklistSchema}
                    onSubmit={handleSubmit}
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

                                // Create image preview
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setImagePreview1(reader.result);
                                };
                                if (file) {
                                  reader.readAsDataURL(file);
                                } else {
                                  setImagePreview1(null);
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

                                // Create image preview
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setImagePreview2(reader.result);
                                };
                                if (file) {
                                  reader.readAsDataURL(file);
                                } else {
                                  setImagePreview2(null);
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
                            Title Text
                          </Label>
                          <Col lg="10">
                            <Field
                              name="titleText"
                              type="text"
                              className={`form-control${errors.titleText && touched.titleText ? " is-invalid" : ""}`}
                              placeholder="Enter the title text"
                            />
                            {errors.titleText && touched.titleText ? (
                              <div className="invalid-feedback">{errors.titleText}</div>
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
                              placeholder="Enter the sub text"
                              rows="3"
                            />
                            {errors.subText && touched.subText ? (
                              <div className="invalid-feedback">{errors.subText}</div>
                            ) : null}
                          </Col>
                        </FormGroup>

                        <Row className="justify-content-end">
                          <Col lg="10">
                            <Button type="submit" color="primary">
                            {isSubmitting ? "Updating..." : "Create Blacklist Entry"}
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

export default BlacklistForm;
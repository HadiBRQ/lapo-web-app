import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, CardTitle, Col, Container, FormGroup, Label, Row } from "reactstrap";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import getReasonsToUseById from "common/realBackend/contentManagement/reasonsToUse/getReasonsToUseById";
import updateReasonsToUse from "common/realBackend/contentManagement/reasonsToUse/updateReasonsToUse";

// Validation schema
const WhyYouLoveSchema = Yup.object().shape({
  titleText: Yup.string().required("Title Text is required"),
  subText: Yup.string().required("Sub Text is required"),
  reasons: Yup.array().of(
    Yup.object().shape({
      mainText: Yup.string().required("Main Text is required"),
      subText: Yup.string().required("Sub Text is required"),
    })
  ).min(1, "At least one reason is required"),
});

const WhyYouLoveForm = () => {
  // meta title
  document.title = "Why You Love Form | LAPO Web App";

  const [initialValues, setInitialValues] = useState({
    titleText: "",
    subText: "",
    reasons: [{ mainText: "", subText: "" }],
  });

  const fetchReasonsToUse = async () => {
    try {
      const reasonsToUse = await getReasonsToUseById();
      console.log("API Response:", reasonsToUse);

      if (Array.isArray(reasonsToUse)) {
        const mappedReasons = [];

        // Mapping the response array to the respective reasons fields
        if (reasonsToUse.length >= 6) {
          mappedReasons.push(
            { mainText: reasonsToUse[0]?.mainText || "", subText: reasonsToUse[0]?.subText || "" },
            { mainText: reasonsToUse[2]?.mainText || "", subText: reasonsToUse[2]?.subText || "" },
            { mainText: reasonsToUse[4]?.mainText || "", subText: reasonsToUse[4]?.subText || "" },
            { mainText: reasonsToUse[6]?.mainText || "", subText: reasonsToUse[6]?.subText || "" }
          );
        }

        setInitialValues({
          titleText: reasonsToUse[0]?.title || "",
          subText: reasonsToUse[0]?.subText || "",
          reasons: mappedReasons.length > 0 ? mappedReasons : [{ mainText: "", subText: "" }],
        });
      } else if (typeof reasonsToUse === "object" && reasonsToUse !== null) {
        // Handle the case where reasonsToUse is an object
        const reasonsArray = Object.keys(reasonsToUse.reasons || {}).map((key) => ({
          mainText: reasonsToUse.reasons[key].mainText || "",
          subText: reasonsToUse.reasons[key].subText || "",
        }));

        setInitialValues({
          titleText: reasonsToUse.title || "",
          subText: reasonsToUse.subText || "",
          reasons: reasonsArray.length > 0 ? reasonsArray : [{ mainText: "", subText: "" }],
        });
      } else {
        console.error("Unexpected API response structure:", reasonsToUse);
      }
    } catch (error) {
      console.error("Error fetching reasons to use:", error);
    }
  };

  useEffect(() => {
    fetchReasonsToUse();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const { titleText, subText, reasons } = values;
      const response = await updateReasonsToUse(titleText, "", subText, reasons); // Adjust payload as needed
      console.log("Update API Response:", response);
    } catch (error) {
      console.error("Error updating reasons to use:", error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Why You Love" breadcrumbItem="Create New" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Create "Why You Love" Entry</CardTitle>
                  <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={WhyYouLoveSchema}
                    onSubmit={handleSubmit} // Updated onSubmit handler
                  >
                    {({ errors, touched, values }) => (
                      <Form>
                        <FormGroup className="mb-4" row>
                          <Label className="col-form-label col-lg-2">Title Text</Label>
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
                          <Label className="col-form-label col-lg-2">Sub Text</Label>
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

                        <FieldArray name="reasons">
                          {({ insert, remove, push }) => (
                            <div>
                              {values.reasons.length > 0 &&
                                values.reasons.map((reason, index) => (
                                  <div key={index} className="mb-4">
                                    <FormGroup row>
                                      <Label className="col-form-label col-lg-2">
                                        Reason {index + 1} - Main Text
                                      </Label>
                                      <Col lg="10">
                                        <Field
                                          name={`reasons.${index}.mainText`}
                                          as="textarea"
                                          className={`form-control${errors.reasons?.[index]?.mainText && touched.reasons?.[index]?.mainText ? " is-invalid" : ""}`}
                                          placeholder="Enter the main text for reason"
                                          rows="3"
                                        />
                                        {errors.reasons?.[index]?.mainText && touched.reasons?.[index]?.mainText ? (
                                          <div className="invalid-feedback">{errors.reasons[index].mainText}</div>
                                        ) : null}
                                      </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                      <Label className="col-form-label col-lg-2">
                                        Reason {index + 1} - Sub Text
                                      </Label>
                                      <Col lg="10">
                                        <Field
                                          name={`reasons.${index}.subText`}
                                          as="textarea"
                                          className={`form-control${errors.reasons?.[index]?.subText && touched.reasons?.[index]?.subText ? " is-invalid" : ""}`}
                                          placeholder="Enter the sub text for reason"
                                          rows="3"
                                        />
                                        {errors.reasons?.[index]?.subText && touched.reasons?.[index]?.subText ? (
                                          <div className="invalid-feedback">{errors.reasons[index].subText}</div>
                                        ) : null}
                                      </Col>
                                    </FormGroup>

                                    <Button
                                      type="button"
                                      color="danger"
                                      onClick={() => remove(index)}
                                    >
                                      Remove Reason
                                    </Button>
                                  </div>
                                ))}

                              <Button
                                type="button"
                                color="primary"
                                onClick={() => push({ mainText: "", subText: "" })}
                              >
                                Add Reason
                              </Button>
                            </div>
                          )}
                        </FieldArray>

                        <Row className="justify-content-end mt-4">
                          <Col lg="10">
                            <Button type="submit" color="primary">
                              Create Entry
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

export default WhyYouLoveForm;

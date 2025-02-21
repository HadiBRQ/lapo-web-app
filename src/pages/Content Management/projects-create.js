import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardTitle, Col, Container, FormGroup, Label, Row, Alert } from "reactstrap";
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Formik, Form } from "formik";

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import getPrivacyPolicy from "common/realBackend/settings/getPrivacyPolicy";
import updatePrivacyPolicy from "common/realBackend/settings/updatePrivacyPolicy";

const PrivacyPolicy = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await getPrivacyPolicy();
        console.log("Fetched Privacy Policy Data:", response); // Log the data from API

        if (response && response.data && response.data.setting && response.data.setting.value) {
          try {
            const contentState = convertFromRaw(JSON.parse(response.data.setting.value));
            setEditorState(EditorState.createWithContent(contentState));
          } catch (error) {
            console.error("Error parsing content state:", error);
            setAlert({ type: 'danger', message: 'Failed to load privacy policy due to malformed content.' });
          }
        } else {
          const emptyContentState = ContentState.createFromText('');
          setEditorState(EditorState.createWithContent(emptyContentState));
        }
      } catch (error) {
        console.error("Error loading privacy policy:", error);
        setAlert({ type: 'danger', message: 'Failed to load privacy policy.' });
      }
    };

    fetchPrivacyPolicy();
  }, []);

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setAlert({ type: 'info', message: 'Sending...' });
      const rawContent = convertToRaw(editorState.getCurrentContent());
      const value = JSON.stringify(rawContent);
      console.log("Submitting Privacy Policy Value:", value); // Log the value being submitted

      await updatePrivacyPolicy(value);
      setAlert({ type: 'success', message: 'Privacy Policy updated successfully!' });
    } catch (error) {
      console.error("Error updating privacy policy:", error);
      setAlert({ type: 'danger', message: 'Failed to update privacy policy.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Privacy Policy" breadcrumbItem="Create New" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Edit Privacy Policy</CardTitle>

                  {alert.message && (
                    <Alert color={alert.type} isOpen={!!alert.message}>
                      {alert.message}
                    </Alert>
                  )}

                  <Formik
                    initialValues={{ privacyPolicy: '' }}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <FormGroup className="mb-4" row>
                          <Label className="col-form-label col-lg-2">
                            Privacy Policy Description
                          </Label>
                          <Col lg="10">
                            <Editor
                              editorState={editorState}
                              onEditorStateChange={handleEditorChange}
                              toolbarClassName="toolbarClassName"
                              wrapperClassName="wrapperClassName"
                              editorClassName="editorClassName"
                              placeholder="Place Your Content Here..."
                            />
                          </Col>
                        </FormGroup>
                        <Row className="justify-content-end">
                          <Col lg="10">
                            <Button type="submit" color="primary" disabled={isSubmitting}>
                              {isSubmitting ? 'Sending...' : 'Update Privacy Policy'}
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

export default PrivacyPolicy;

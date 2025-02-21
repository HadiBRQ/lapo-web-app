import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, CardTitle, Col, Container, Form, FormGroup, Label, Row, Alert } from "reactstrap";
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import getTermsOfService from "common/realBackend/settings/getTermsOfService";
import updateTermsOfService from "common/realBackend/settings/updateTermsOfService";

const TermsAndConditions = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTermsOfService = async () => {
      try {
        const response = await getTermsOfService();
        if (response && response.data && response.data.setting && response.data.setting.value) {
          // Convert <br> tags to line breaks before loading into editor
          const rawContent = JSON.parse(response.data.setting.value);
          const contentWithLineBreaks = replaceBrWithLineBreaks(rawContent);
          const contentState = convertFromRaw(contentWithLineBreaks);
          setEditorState(EditorState.createWithContent(contentState));
        }
      } catch (error) {
        setAlert({ type: 'danger', message: 'Error loading terms of service.' });
      }
    };

    fetchTermsOfService();
  }, []);

  const replaceBrWithLineBreaks = (rawContent) => {
    // Iterate through blocks and replace <br> tags with \n
    rawContent.blocks.forEach(block => {
      block.text = block.text.replace(/<br\s*\/?>/g, '\n');
    });
    return rawContent;
  };

  const replaceLineBreaksWithBr = (rawContent) => {
    // Iterate through blocks and replace \n with <br>
    rawContent.blocks.forEach(block => {
      block.text = block.text.replace(/\n/g, '<br />');
    });
    return rawContent;
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: '', message: '' });

    try {
      const contentState = editorState.getCurrentContent();
      let rawContent = convertToRaw(contentState);
      
      // Replace line breaks with <br> tags before sending to the API
      rawContent = replaceLineBreaksWithBr(rawContent);
      const value = JSON.stringify(rawContent);

      console.log("Submitting Terms of Service Value:", value); // Log the content being submitted

      await updateTermsOfService(value);
      setAlert({ type: 'success', message: 'Terms of Service updated successfully.' });
    } catch (error) {
      console.error("Error updating terms of service:", error.response ? error.response.data : error.message);
      setAlert({ type: 'danger', message: 'Error updating terms of service. Please ensure your content is correctly formatted.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Terms & Conditions" breadcrumbItem="Create New" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Create Terms & Conditions</CardTitle>
                  {alert.message && (
                    <Alert color={alert.type} className="mb-4">
                      {alert.message}
                    </Alert>
                  )}
                  <Form onSubmit={handleSubmit}>
                    <FormGroup className="mb-4" row>
                      <Label className="col-form-label col-lg-2">
                        Terms & Conditions Description
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
                        <Button type="submit" color="primary" disabled={loading}>
                          {loading ? 'Sending...' : 'Create Terms & Conditions'}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TermsAndConditions;

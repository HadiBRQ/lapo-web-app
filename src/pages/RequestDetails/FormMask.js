import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Form,
  Label,
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  CardFooter,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

//Custom Icons and Images
import plusLogo from "../../assets/icons/plus.png";
import successIcon from "../../assets/icons/successed.png";
import downloadDocIcon from "../../assets/icons/file-download-02.png";
import loadingDocIcon from "../../assets/icons/loading-02@2x.png";
import readyDocIcon from "../../assets/icons/package-check.png";
import sentDocIcon from "../../assets/icons/package-sent.png";
import acknwIcon from "../../assets/icons/check-circle-broken.png";

//Custom CSS
import "./CardFooterCustom.css";

const FormMask = () => {
  document.title = "Request Details Form | lapo - Web App";

  const [buttonStates, setButtonStates] = useState({
    download: false,
    inProgress: false,
    ready: false,
    dispatch: false,
    acknowledged: false
  });

  const [status, setStatus] = useState("Yet to be Downloaded");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalHeading, setModalHeading] = useState("");

  useEffect(() => {
    const handlePageRefresh = () => {
      localStorage.removeItem("buttonStates");
    };

    window.addEventListener("beforeunload", handlePageRefresh);
    return () => {
      window.removeEventListener("beforeunload", handlePageRefresh);
    };
  }, []);

  const handleButtonClick = (key, newStatus, heading, message) => {
    setButtonStates((prevState) => ({ ...prevState, [key]: true }));
    setStatus(newStatus);
    setModalHeading(heading);
    setModalMessage(message);
    setModalOpen(true);
  };

  return (
    <React.Fragment>
      <Container fluid={false}>
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <CardTitle className="mb-4">Card Request Details</CardTitle>
                <Form>
                  <Row>
                    <Col lg={6}>
                      <div className="form-group mb-4">
                        <Label>Branch Name</Label>
                        <input className="form-control" type="text" defaultValue="Corporate"
                          style={{ background: "#F5F5F7", borderRadius: 8 }} />
                      </div>
                      <div className="form-group mb-4">
                        <Label>Card Type</Label>
                        <select className="form-control" style={{ background: "#F5F5F7", borderRadius: 8 }}>
                          <option>Select</option>
                          <option selected>Classic Debit</option>
                          <option>MasterCard</option>
                        </select>
                      </div>
                      <div className="form-group mb-4">
                        <Label>Quantity</Label>
                        <input className="form-control" type="text" defaultValue="10"
                          style={{ background: "#F5F5F7", borderRadius: 8 }} />
                      </div>
                      <div className="form-group mb-0">
                        <Label>Date Requested</Label>
                        <p className="fs-4">11/14/2024 10:27:43</p>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="form-group mb-4">
                        <Label>Initiator</Label>
                        <input className="form-control" type="text" defaultValue="RootUser"
                          style={{ background: "#F5F5F7", borderRadius: 8 }} />
                      </div>
                      <div className="form-group mb-4">
                        <Label>Card Charges</Label>
                        <input className="form-control" type="text" defaultValue="₦1,500"
                          style={{ background: "#F5F5F7", borderRadius: 8 }} />
                      </div>
                      <div className="form-group mb-4">
                        <Label>Batch</Label>
                        <input className="form-control" type="text" defaultValue="847264905"
                          style={{ background: "#F5F5F7", borderRadius: 8 }} />
                      </div>
                      <div className="form-group mb-0">
                        <Label>Status</Label>
                        <p className="fs-4">
                        {status === "Downloaded for Production" ? (
                            <span className="badge badge-soft-secondary me-2 rounded-pill p-2">
                              Pending
                            </span>
                          ) : status === "In Progress" ? (
                            <span className="badge badge-soft-warning me-2 rounded-pill p-2">
                              In Progress
                            </span>
                          ) : status === "Ready" ? (
                            <span className="badge badge-soft-success me-2 rounded-pill p-2">
                              Ready
                            </span>
                          ) : status === "Sent to Dispatch" ? (
                            <span className="badge badge-soft-success me-2 rounded-pill p-2">
                              Ready
                            </span>
                          ) : status === "Acknowledged" ? (
                            <span className="badge badge-soft-primary me-2 rounded-pill p-2">
                              Acknowledged
                            </span>
                          ) : null}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </CardBody>

              <CardFooter style={{ background: "#ffffff" }}>
                <CardTitle>Actions</CardTitle>
                
                <div className="button-container">
                  <Button
                    className="btn align-items-center"
                    style={{ backgroundColor: "#344054", borderColor: "#344054", fontSize: 11 }}
                    onClick={() => handleButtonClick("download", "Downloaded for Production", "Successful", "Production file has been downloaded.")}
                    disabled={buttonStates.download}
                  >
                    <img src={downloadDocIcon} height={15} width={15} className="me-2" />
                    Download for Production
                  </Button>

                  <Button
                    className="btn align-items-center"
                    style={{ backgroundColor: "#B54708", borderColor: "#B54708", fontSize: 11 }}
                    onClick={() => handleButtonClick("inProgress", "In Progress", "Process Started", "The request has been marked as in progress.")}
                    disabled={buttonStates.inProgress}
                  >
                    <img src={loadingDocIcon} height={15} width={15} className="me-2" />
                    Mark as in Progress
                  </Button>

                  <Button
                    className="btn align-items-center"
                    style={{ backgroundColor: "#067647", borderColor: "#067647", fontSize: 11 }}
                    onClick={() => handleButtonClick("ready", "Ready", "Ready for Dispatch", "The request has been marked as ready.")}
                    disabled={buttonStates.ready}
                  >
                    <img src={readyDocIcon} height={15} width={15} className="me-2" />
                    Mark as Ready
                  </Button>

                  <Button
                    className="btn align-items-center"
                    style={{ backgroundColor: "#8020E7", borderColor: "#8020E7", fontSize: 11 }}
                    onClick={() => handleButtonClick("sent", "Sent to Dispatch", "Sent to Dispatch", "Card batch successfully sent to dispatch.")}
                    disabled={buttonStates.sent}
                  >
                    <img src={sentDocIcon} height={15} width={15} className="me-2" />
                    Sent to Dispatch
                  </Button>

                  <Button
                    className="btn align-items-center"
                    style={{ backgroundColor: "#014DAF", borderColor: "#014DAF", fontSize: 11 }}
                    onClick={() => handleButtonClick("acknw", "Acknowledged", "Acknowledged", "Card has successfully been acknowledged.")}
                    disabled={buttonStates.acknw}
                  >
                    <img src={acknwIcon} height={15} width={15} className="me-2" />
                    Mark as Acknowledged
                  </Button>
                </div>
              </CardFooter>

            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal */}
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} centered>
        <ModalBody className="text-left">
          <img src={successIcon} alt="Success Icon" width={80} height={80} className="mb-4" />
          <h4>{modalHeading}</h4>
          <p>{modalMessage}</p>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-start">
          <Button color="primary" onClick={() => setModalOpen(false)}>Continue</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default FormMask;

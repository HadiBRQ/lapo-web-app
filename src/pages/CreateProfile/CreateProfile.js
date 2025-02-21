import React, {useState, useEffect} from "react"

import PropTypes from "prop-types"
import { Container, Row, Col, Card, CardBody, Table, Label, Form, CardTitle, CardSubtitle, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

//Import Components
import Section from "./Section"

//Custom Images
import plusLogo from "../../assets/icons/plus.png"


import { Link } from "react-router-dom"
import FormMask from "./FormMask"


const CreateProfile = () => {
  document.title = "Create Profile"

  // Modal State
  const [modal, setModal] = useState(false);

  // Toggle Modal Function
  const toggleModal = () => setModal(!modal);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Section />


            {/* Form */}
            <FormMask />

            {/* Table for Card Information */}
            <Row style={{ marginBottom: 30, }}>
                <Col lg="12">
                <Card>
                  <CardBody>
                    <CardTitle>Fees</CardTitle>

                      {/* Add a Fee Button to Open the Modal */}
                      <Button className="btn align-items-center" style={{ marginBottom: 40, backgroundColor: "#014DAF", borderColor: "#014DAF" }} onClick={toggleModal} >
                          <img src={plusLogo} height={20} width={20} className="me-2" /> 
                          <span style={{ color: "#ffffff", fontSize: 17 }}>Add Fee</span>
                      </Button>

                      {/* Modal */}
                      <Modal isOpen={modal} toggle={toggleModal}>
                          <ModalHeader toggle={toggleModal} className="d-flex align-items-center" style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                            <div>
                              <img src={plusLogo} height={20} width={20} alt="Plus Icon" />
                            </div>

                            <div>
                              <p className="mb-0">Add Fee</p>
                              <small>Fill in fee details.</small>
                            </div>
                          </ModalHeader>
                        <ModalBody>
                          {/* Form content goes here */}
                          
                          <div className="form-group mb-4">
                            <Label for="input-card-name">Fee Name*</Label>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue="Maintenance"
                            />
                          </div>

                          <div className="form-group mb-4">
                            <Label for="input-card-name">Value</Label>
                            <input
                              className="form-control"
                              type="number"
                              defaultValue="0"
                            />
                          </div>
                          
                          <label className="form-check-label mb-1" htmlFor="currencies">
                            Currency
                          </label>
                          <div className="d-flex gap-3 mb-4">
                            <div className="form-check form-radio-primary">
                              <input
                                type="radio"
                                id="currency1"
                                name="currency1"
                                className="form-check-input"
                                defaultChecked
                              />
                              <label className="form-check-label" htmlFor="currency1">
                                NGN
                              </label>
                            </div>

                            <div className="form-check form-radio-primary">
                              <input
                                type="radio"
                                id="currency2"
                                name="currency2"
                                className="form-check-input"
                              />
                              <label className="form-check-label" htmlFor="currency2">
                                USD
                              </label>
                            </div>
                          </div>

                          <label className="form-check-label mb-1" htmlFor="fee-freq">
                            Fee Frequency
                          </label>
                          <div className="d-flex gap-3 mb-4">
                            <div className="form-check form-radio-primary">
                              <input
                                type="radio"
                                id="feefreq1"
                                name="feefreq1"
                                className="form-check-input"
                                defaultChecked
                              />
                              <label className="form-check-label" htmlFor="feefreq1">
                                One Off
                              </label>
                            </div>

                            <div className="form-check form-radio-primary">
                              <input
                                type="radio"
                                id="feefreq2"
                                name="feefreq2"
                                className="form-check-input"
                              />
                              <label className="form-check-label" htmlFor="feefreq2">
                                Monthly
                              </label>
                            </div>
                          </div>

                          <label className="form-check-label mb-1" htmlFor="fee-impact">
                            Fee Impact
                          </label>
                          <div className="d-flex gap-3 mb-4">
                            <div className="form-check form-radio-primary">
                              <input
                                type="radio"
                                id="feeimpact1"
                                name="feeimpact1"
                                className="form-check-input"
                                defaultChecked
                              />
                              <label className="form-check-label" htmlFor="feeimpact1">
                                Issuance
                              </label>
                            </div>

                            <div className="form-check form-radio-primary">
                              <input
                                type="radio"
                                id="feeimpact2"
                                name="feeimpact2"
                                className="form-check-input"
                              />
                              <label className="form-check-label" htmlFor="feeimpact2">
                                PIN Reissue
                              </label>
                            </div>
                          </div>

                          <label className="form-check-label mb-1" htmlFor="account-pad">
                            Account Pad
                          </label>
                          <div className="d-flex gap-3 mb-4">
                            <div className="form-check form-radio-primary">
                              <input
                                type="radio"
                                id="accountpad1"
                                name="accountpad1"
                                className="form-check-input"
                                defaultChecked
                              />
                              <label className="form-check-label" htmlFor="accountpad1">
                                None
                              </label>
                            </div>

                            <div className="form-check form-radio-primary">
                              <input
                                type="radio"
                                id="accountpad2"
                                name="accountpad2"
                                className="form-check-input"
                              />
                              <label className="form-check-label" htmlFor="accountpad2">
                                Branch Code Prefix
                              </label>
                            </div>

                            <div className="form-check form-radio-primary">
                              <input
                                type="radio"
                                id="accountpad3"
                                name="accountpad3"
                                className="form-check-input"
                              />
                              <label className="form-check-label" htmlFor="accountpad3">
                                Branch Code Suffix
                              </label>
                            </div>
                          </div>

                          <div className="form-group mb-4">
                            <Label for="input-card-name">Account</Label>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue=""
                            />
                          </div>

                        </ModalBody>
                        <ModalFooter className="d-flex justify-content-center">
                          <Button color="primary" className="w-100" style={{ maxWidth: "500px" }} onClick={toggleModal}>
                            Add Fee
                          </Button>
                        </ModalFooter>
                      </Modal>

                      <div className="table-responsive">
                        <div className="table-responsive">
                            <Table className="align-middle mb-0 text-center">
                                <thead>
                                    <tr style={{ background: "#F9FAFB" }}>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Value</th>
                                    <th className="text-center">Frequency</th>
                                    <th className="text-center">Currency</th>
                                    <th className="text-center">Time</th> 
                                    <th className="text-center">Account Pad</th> 
                                    <th className="text-center">Account</th>
                                    </tr>
                                </thead>
                                <tbody style={{ background: "#ffffff" }}>
                                    <tr>
                                    <th scope="row"> </th>
                                    <td> </td>
                                    <td> </td>
                                    <td align="center"> 
                                    </td>
                                    <td align="center"> </td> 
                                    <td className="text-center">
                                         
                                    </td>
                                    <td align="center"> </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div> 
                  </CardBody>
                </Card> 
                </Col>  
            </Row>

            <Row className="mb-4">
                <Col lg="12">
                    <div className="d-flex align-items-center">
                        <div>
                        <Button className="btn align-items-center" style={{ padding: "12px 70px", marginBottom: 40, backgroundColor: "#014DAF", borderColor: "#014DAF" }}>
                            <Link to="/create-profile">
                                <span style={{ color: "#ffffff", fontSize: 17 }}>Create Profile</span>
                            </Link>
                        </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default CreateProfile

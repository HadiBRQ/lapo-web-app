import React from "react"
import PropTypes from "prop-types"
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
} from "reactstrap"

import Breadcrumbs from "../../components/Common/Breadcrumb"

// Form Mask
import InputMask from "react-input-mask"

//Custom Images and Icons
import plusLogo from "../../assets/icons/plus.png"


const FormMask = () => {
  //meta title
  document.title = "Create Profile Form | lapo - Web App"

  return (
    <React.Fragment>
      <div>
        <Container fluid={false}>
          {/* <Breadcrumbs title="Forms" breadcrumbItem="Create Profile Form" /> */}

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody className="">
                  <CardTitle className="mb-4">Profile Details</CardTitle>
                  <Form>
                    <Row>
                      <Col lg={6}>
                        <div>
                          <div className="form-group mb-4">
                            <Label for="input-card-name">Card Name*</Label>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue="Artisanal kale"
                            />
                          </div>
                          <div className="form-group mb-4">
                            <Label for="input-card-scheme">Card Scheme*</Label>
                            <select className="form-control">
                              <option>Select</option>
                              <option>Verve</option>
                              <option>MasterCard</option>
                            </select>
                          </div>
                          <div className="form-group mb-4">
                            <Label for="input-description">Description</Label>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue=""
                            />
                          </div>
                          <div className="form-group mb-0">
                            <Label for="input-branch">Branch Blacklist</Label>
                            <select className="form-control">
                              <option>Select</option>
                              <option>Head Office</option>
                              <option>Branch 2</option>
                            </select>
                          </div>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mt-4 mt-lg-0">
                          <div className="form-group mb-4">
                            <Label for="input-bin">Bin Prefix*</Label>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue="00000000"
                            />
                          </div>
                          <div className="form-group mb-4">
                            <Label for="input-expiration">Expiration*</Label>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue="0"
                            />
                          </div>
                          <div className="form-group mb-4">
                            <Label for="input-currency">Currency*</Label>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue="NGN"
                            />

                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* <Row>
            <Col lg={12}>
              <Card>
                <CardBody className="">
                  <CardTitle className="mb-4">Fees</CardTitle>
                  <Button className="btn align-items-center" style={{ backgroundColor: "#014DAF", borderColor: "#014DAF" }}>
                      <Link to="/create-profile">
                          <img src={plusLogo} height={20} width={20} className="me-2" /> 
                          <span style={{ color: "#ffffff", fontSize: 17 }}>Add Fee</span>
                      </Link>
                  </Button>
                  <Form>
                    <Row>
                      <Col lg={6}>
                        <div>
                          <div className="form-group mb-4">
                            <Label for="input-card-name">Card Name*</Label>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue="Artisanal kale"
                            />
                          </div>
                          <div className="form-group mb-4">
                            <Label for="input-card-scheme">Card Scheme*</Label>
                            <select className="form-control">
                              <option>Select</option>
                              <option>Verve</option>
                              <option>MasterCard</option>
                            </select>
                          </div>
                          <div className="form-group mb-4">
                            <Label for="input-description">Description</Label>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue=""
                            />
                          </div>
                          <div className="form-group mb-0">
                            <Label for="input-branch">Branch Blacklist</Label>
                            <select className="form-control">
                              <option>Select</option>
                              <option>Head Office</option>
                              <option>Branch 2</option>
                            </select>
                          </div>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mt-4 mt-lg-0">
                          <div className="form-group mb-4">
                            <Label for="input-bin">Bin Prefix"</Label>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue="00000000"
                            />
                          </div>
                          <div className="form-group mb-4">
                            <Label for="input-expiration">Expiration*</Label>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue="0"
                            />
                          </div>
                          <div className="form-group mb-4">
                            <Label for="input-currency">Currency*</Label>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue="NGN"
                            />

                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row> */}
        </Container>
      </div>
    </React.Fragment>
  )
}

FormMask.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
}

export default FormMask

import React, {useState, useEffect} from "react"
import { Container, Row, Col, Card, CardBody, Table, CardTitle, CardSubtitle } from "reactstrap"

//Import Components
import Section from "./Section"

//Custom Images
import calenderLogo from "../../assets/icons/calendar.png"
import quickAcc1 from "../../assets/icons/Frame-1618867979.png"
import quickAcc2 from "../../assets/icons/Frame-1618867979-1.png"
import quickAcc3 from "../../assets/icons/Frame-1618867979-2.png"
import quickAcc4 from "../../assets/icons/Frame-1618867979-3.png"
import quickAccessArrow from "../../assets/icons/chevron-right.png"
import totalCardsLogo from "../../assets/icons/credit-card-check.png"
import totalPersCLogo from "../../assets/icons/credit-card-edit.png"
import todaysRevLogo from "../../assets/icons/bank-note-01.png"
import pendingRequestsLogo from "../../assets/icons/hourglass-03.png"
import expandIconLogo from "../../assets/icons/expand-icon.png"


import { Link } from "react-router-dom"
import ColumnWithDataLabels from "pages/AllCharts/apex/ColumnWithDataLabels"
import DountChart from "pages/AllCharts/apex/dountchart"
import Spinearea from "pages/AllCharts/apex/SplineArea"


const DashboardLapo = () => {
  document.title = "Default Dashboard | LAPO Web App"

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Section />

          {/* Your Quick Access */}
          <Row>
            <Col lg="12">
              <Card className="border-2 border rounded-3" style={{ borderColor: "#D0D5DD", }}>
                <CardBody>
                  <Row>
                    <h5 className="mb-2 card-title">Your Quick Access</h5>
                  </Row>
                  <Row className="g-2 mt-2">
                    <Col lg="3" className="d-lg-block">
                      <Link to={"/#"}> 
                        <div className="rounded p-2" style={{ backgroundColor: "#F1F7FF" }}>
                          <p className="text-muted mb-0">
                            <img src={quickAcc1} height={28} width={28} /> Manage a Card <img src={quickAccessArrow} height={16} width={16} />
                          </p>
                        </div>
                      </Link>
                    </Col>

                    <Col lg="3" className="d-lg-block">
                      <Link to={"/#"}> 
                        <div className="rounded p-2" style={{ backgroundColor: "#F1F7FF" }}>
                          <p className="text-muted mb-0">
                            <img src={quickAcc2} height={28} width={28} /> Issue Instant Card <img src={quickAccessArrow} height={16} width={16} />
                          </p>
                        </div>
                      </Link>
                    </Col>

                    <Col lg="3" className="d-lg-block">
                      <Link to={"/#"}> 
                        <div className="rounded p-2" style={{ backgroundColor: "#F1F7FF" }}>
                          <p className="text-muted mb-0">
                            <img src={quickAcc3} height={28} width={28} /> Issue Personalized Card <img src={quickAccessArrow} height={16} width={16} />
                          </p>
                        </div>
                      </Link>
                    </Col>

                    <Col lg="3" className="d-lg-block">
                      <Link to={"/#"}> 
                        <div className="rounded p-2" style={{ backgroundColor: "#F1F7FF" }}>
                          <p className="text-muted mb-0">
                            <img src={quickAcc1} height={28} width={28} /> Review Card Requests <img src={quickAccessArrow} height={16} width={16} />
                          </p>
                        </div>
                      </Link>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Analtics Heading */}
          <div className="d-flex align-items-center mb-4">
            <span className="fw-bold me-3 fs-5">Analytics</span>
            <div className="flex-grow-1 border-bottom border-2" style={{ borderColor: "#D0D5DD", }}></div>
          </div>

          {/* Card Reports */}
          <Row className="g-1">
            <Col lg="3">
              <Card className="border-2 border rounded-3" style={{ borderColor: "#D0D5DD", }}>
                <CardBody className="p-2">
                  <Row>
                    <p className="text-muted mb-0">
                      <img src={totalCardsLogo} height={16} width={16} />
                      <p className="mt-1 mb-2 card-title fs-6">Total Active Cards</p>
                    </p>
                  </Row>
                  <Row className="g-1 mt-2">
                    <Col lg="6" className="d-lg-block">
                      <p className="mt-1 mb-2 card-title fs-3">26,478</p>
                    </Col>
                    <Col lg="3" className="d-flex align-items-center">
                      <p className="mt-1 mb-2 card-title fs-6 flex-end">
                        <span className={"badge badge-soft-success me-2"}>
                            <i className={`bx bx-trending-up align-bottom me-1`}></i> +9%
                        </span>
                      </p>
                    </Col>
                    <Col lg="3" className="d-flex align-items-center">
                      <small className="mt-1 mb-2">this Month</small>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col lg="3">
              <Card className="border-2 border rounded-3" style={{ borderColor: "#D0D5DD", }}>
              <CardBody className="p-2">
                  <Row>
                    <p className="text-muted mb-0">
                      <img src={totalPersCLogo} height={16} width={16} />
                      <p className="mt-1 mb-2 card-title fs-6">Total Personalized Cards</p>
                    </p>
                  </Row>
                  <Row className="g-1 mt-2">
                    <Col lg="6" className="d-lg-block">
                      <p className="mt-1 mb-2 card-title fs-3">15,703</p>
                    </Col>
                    <Col lg="3" className="d-flex align-items-center">
                      <p className="mt-1 mb-2 card-title fs-6 flex-end">
                        <span className={"badge badge-soft-success me-2"}>
                            <i className={`bx bx-trending-up align-bottom me-1`}></i> +8.5%
                        </span>
                      </p>
                    </Col>
                    <Col lg="3" className="d-flex align-items-center">
                      <small className="mt-1 mb-2">this Month</small>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            
            <Col lg="3">
              <Card className="border-2 border rounded-3" style={{ borderColor: "#D0D5DD", }}>
                <CardBody className="p-2">
                  <Row>
                    <p className="text-muted mb-0">
                      <img src={todaysRevLogo} height={16} width={16} />
                      <p className="mt-1 mb-2 card-title fs-6">Today's Revenue</p>
                    </p>
                  </Row>
                  <Row className="g-1 mt-2">
                    <Col lg="6" className="d-lg-block">
                      <p className="mt-1 mb-2 card-title fs-3">₦9.3M</p>
                    </Col>
                    <Col lg="3" className="d-flex align-items-center">
                      <p className="mt-1 mb-2 card-title fs-6 flex-end">
                        <span className={"badge badge-soft-success me-2"}>
                            <i className={`bx bx-trending-up align-bottom me-1`}></i> +6%
                        </span>
                      </p>
                    </Col>
                    <Col lg="3" className="d-flex align-items-center">
                      <small className="mt-1 mb-2">vs yesterday</small>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col lg="3">
              <Card className="border-2 border rounded-3" style={{ borderColor: "#D0D5DD", }}>
                <CardBody className="p-2">
                  <Row>
                    <p className="text-muted mb-0">
                      <img src={pendingRequestsLogo} height={16} width={16} />
                      <p className="mt-1 mb-2 card-title fs-6">Pending Requests</p>
                    </p>
                  </Row>
                  <Row className="g-1 mt-2">
                    <Col lg="6" className="d-lg-block">
                      <p className="mt-1 mb-2 card-title fs-3">38</p>
                    </Col>
                    <Col lg="6" className="d-flex align-items-center">
                      <small className="mt-1 mb-2" style={{ color: "#E78020", }}>
                        <i className={`bx bx-info-circle me-1 `}></i> Requiries Attention
                      </small>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Graphs, Tables and Charts */}
          <Row className="g-1">
            <Col lg="6">
              <Row>
                <Col lg="12">
                  <Card className="border-2 border rounded-3" style={{ borderColor: "#D0D5DD", }}>
                    <CardBody>
                      <Row className="mb-4">
                        <Col lg="8" className="d-lg-block text-start">
                            <div className="d-flex align-items-center">
                                <div>
                                    {/* Monthly Issuance */}
                                    <p className="mb-2 fs-5">Monthly Issuance</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg="1" className="align-self-center">

                        </Col>
                        <Col lg="3" className="d-lg-block text-end">
                          <Link to="/#">
                            <img src={expandIconLogo} height={14} width={14} />
                          </Link>
                        </Col>
                      </Row>
                      
                      <Row>
                        <ColumnWithDataLabels dataColors='["#014DAF", "#CCE2FF", "#008FFB"]' />
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col lg="12">
                  <Card className="border-2 border rounded-3" style={{ borderColor: "#D0D5DD", }}>
                    <CardBody>
                      <Row className="mb-4">
                        <Col lg="8" className="d-lg-block text-start">
                            <div className="d-flex align-items-center">
                                <div>
                                    {/* Monthly Issuance */}
                                    <p className="mb-2 fs-5">This Week's Income</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg="1" className="align-self-center">

                        </Col>
                        <Col lg="3" className="d-lg-block text-end">
                          <Link to="/#">
                            <img src={expandIconLogo} height={14} width={14} />
                          </Link>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Spinearea dataColors='["#4DAF01", "#CCE2FF"]' />
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>

            <Col lg="6">
              <Row>
                <Col lg="12">
                  <Card className="border-2 border rounded-3" style={{ borderColor: "#D0D5DD", }}>
                    <CardBody>
                      <Row className="mb-4">
                        <Col lg="8" className="d-lg-block text-start">
                            <div className="d-flex align-items-center">
                                <div>
                                    {/* Monthly Issuance */}
                                    <p className="mb-2 fs-5">Recent Card Requests</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg="1" className="align-self-center">

                        </Col>
                        <Col lg="3" className="d-lg-block text-end">
                          <Link to="/#">
                            <img src={expandIconLogo} height={14} width={14} />
                          </Link>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col lg={12}>
                          <Card>
                            <CardBody>
                              <div className="table-responsive">
                                <div className="table-responsive">
                                  <Table className="align-middle mb-0 text-center">

                                    <thead>
                                      <tr>
                                        <th>Branch</th>
                                        <th>Card Type</th>
                                        <th>Quantity</th>
                                        <th alignItems="center">Status</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <th scope="row">Corporate</th>
                                        <td>Instant</td>
                                        <td>10</td>
                                        <td align="center">
                                          <span className="badge badge-soft-success me-2 rounded-pill p-2">
                                            Ready
                                          </span>
                                        </td>
                                        <td>
                                          <div className="d-flex justify-content-center align-items-center">
                                            <Link to="/#">
                                              <p className="mb-0" style={{ color: "blue", display: "flex", alignItems: "center", height: "100%" }}>View</p>
                                            </Link>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Corporate</th>
                                        <td>Personalized</td>
                                        <td>10</td>
                                        <td align="center">
                                          <span className="badge badge-soft-warning me-2 rounded-pill p-2">
                                            In Progress
                                          </span>
                                        </td>
                                        <td>
                                          <div className="d-flex justify-content-center align-items-center">
                                            <Link to="/#">
                                              <p className="mb-0" style={{ color: "blue", display: "flex", alignItems: "center", height: "100%" }}>View</p>
                                            </Link>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Corporate</th>
                                        <td>Personalized</td>
                                        <td>10</td>
                                        <td align="center">
                                          <span className="badge badge-soft-primary me-2 rounded-pill p-2">
                                            Acknowledged
                                          </span>
                                        </td>
                                        <td>
                                          <div className="d-flex justify-content-center align-items-center">
                                            <Link to="/#">
                                              <p className="mb-0" style={{ color: "blue", display: "flex", alignItems: "center", height: "100%" }}>View</p>
                                            </Link>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Corporate</th>
                                        <td>Instant</td>
                                        <td>10</td>
                                        <td align="center">
                                          <span className="badge badge-soft-secondary me-2 rounded-pill p-2">
                                            Pending
                                          </span>
                                        </td>
                                        <td>
                                          <div className="d-flex justify-content-center align-items-center">
                                            <Link to="/#">
                                              <p className="mb-0" style={{ color: "blue", display: "flex", alignItems: "center", height: "100%" }}>View</p>
                                            </Link>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col lg="12">
                  <Card className="border-2 border rounded-3" style={{ borderColor: "#D0D5DD", }}>
                    <CardBody>
                      <Row className="mb-4">
                        <Col lg="8" className="d-lg-block text-start">
                            <div className="d-flex align-items-center">
                                <div>
                                    {/* Monthly Issuance */}
                                    <p className="mb-2 fs-5">Card Status Distribution</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg="1" className="align-self-center">

                        </Col>
                        <Col lg="3" className="d-lg-block text-end">
                          {/* <Link to="/#">
                            <img src={expandIconLogo} height={14} width={14} />
                          </Link> */}
                        </Col>
                      </Row>
                      
                      <Row>
                        <DountChart dataColors='["#01A4AF", "#FFBA24", "#014DAF", "#8020E7", "#FF4457"]' />
                        {/* dataColors='["#01A4AF", "#FFBA24", "#014DAF", "#8020E7", "#FF4457"]' */}
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>


        </Container>
      </div>
    </React.Fragment>
  )
}

export default DashboardLapo

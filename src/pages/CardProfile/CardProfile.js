import React, {useState, useEffect} from "react"
import { Container, Row, Col, Card, CardBody, Table, CardTitle, CardSubtitle, Button } from "reactstrap"

//Import Components
import Section from "./Section"

//Custom Images
import plusLogo from "../../assets/icons/plus.png"
import edit1Logo from "../../assets/icons/edit-01.png"
import trash1Logo from "../../assets/icons/trash-01.png"


import { Link } from "react-router-dom"


const CardProfile = () => {
  document.title = "Card Profile"

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Section />

          <div className="border-bottom border-2 my-4" style={{ borderColor: "#D0D5DD" }}></div>

          {/* Searchbar and Button */}
            <Row className="mb-4">
                <Col lg="8">
                    <div className="d-flex align-items-center">
                        <div>
                            {/* Display fullName details */}
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bx bx-search-alt text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-start-0"
                                    placeholder="Search by Card Name"
                                    style={{ height: "40px" }}
                                />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg="1" className="align-self-center">

                </Col>
                <Col lg="3" className="d-lg-block text-end">
                    {/* <div className="d-inline-block border border-2 rounded p-2" style={{ borderColor: "#D0D5DD", }}>
                        <p className="text-muted small mb-0">
                            <img src={calenderLogo} height={14} width={14} /> Last Login | 11 Nov 2024
                        </p>
                    </div> */}
                    <Button className="btn align-items-center" style={{ backgroundColor: "#014DAF", borderColor: "#014DAF" }}>
                        <Link to="/create-profile">
                            <img src={plusLogo} height={20} width={20} className="me-2" /> 
                            <span style={{ color: "#ffffff", fontSize: 17 }}>Add Card</span>
                        </Link>
                    </Button>

                </Col>
            </Row>

            <div className="border-bottom border-2 my-4" style={{ borderColor: "#D0D5DD" }}></div>

            {/* Table for Card Information */}
            <Row style={{ marginBottom: 30, }}>
                <Col lg="12">
                    <div className="table-responsive">
                        <div className="table-responsive">
                            <Table className="align-middle mb-0 text-center">
                                <thead>
                                    <tr style={{ background: "#F9FAFB" }}>
                                    <th className="text-center">Card Name</th>
                                    <th className="text-center">Currency</th>
                                    <th className="text-center">Expiration</th>
                                    <th className="text-center">Bin Prefix</th>
                                    <th className="text-center">Date Created</th> 
                                    <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody style={{ background: "#ffffff" }}>
                                    <tr>
                                    <th scope="row">Verve-1</th>
                                    <td>NGN</td>
                                    <td>40 months</td>
                                    <td align="center">
                                        50611234
                                    </td>
                                    <td align="center">11/10/2024  23:21:03</td> 
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center align-items-center" style={{ height: "40px", gap: "16px" }}>
                                            <Link to="/card-profile">
                                                <img src={trash1Logo} height={20} width={20} />
                                            </Link>
                                            <Link to="/card-profile">
                                                <img src={edit1Logo} height={20} width={20} />
                                            </Link>
                                        </div>
                                    </td>
                                    </tr>
                                    <tr>
                                    <th scope="row">Verve-1</th>
                                    <td>NGN</td>
                                    <td>40 months</td>
                                    <td align="center">
                                        50611234
                                    </td>
                                    <td align="center">11/10/2024  23:21:03</td> 
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center align-items-center" style={{ height: "40px", gap: "16px" }}>
                                            <Link to="/card-profile">
                                                <img src={trash1Logo} height={20} width={20} />
                                            </Link>
                                            <Link to="/card-profile">
                                                <img src={edit1Logo} height={20} width={20} />
                                            </Link>
                                        </div>
                                    </td>
                                    </tr>
                                    <tr>
                                    <th scope="row">Verve-1</th>
                                    <td>NGN</td>
                                    <td>40 months</td>
                                    <td align="center">
                                        50611234
                                    </td>
                                    <td align="center">11/10/2024  23:21:03</td> 
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center align-items-center" style={{ height: "40px", gap: "16px" }}>
                                            <Link to="/card-profile">
                                                <img src={trash1Logo} height={20} width={20} />
                                            </Link>
                                            <Link to="/card-profile">
                                                <img src={edit1Logo} height={20} width={20} />
                                            </Link>
                                        </div>
                                    </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div> 
                </Col>  
            </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}

export default CardProfile

import React, {useState, useEffect} from "react"
import { Container, Row, Col, Card, CardBody, Table, CardTitle, CardSubtitle, Button } from "reactstrap"

//Import Components
import Section from "./Section"

//Custom Images
import plusLogo from "../../assets/icons/plus.png"
import edit1Logo from "../../assets/icons/edit-01.png"
import trash1Logo from "../../assets/icons/trash-01.png"


import { Link } from "react-router-dom"

const CardRequest = () => {
  document.title = "Card Request"

  // Modal State
  const [modal, setModal] = useState(false);

  // Toggle Modal Function
  const toggleModal = () => setModal(!modal);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Section />

          <div className="border-bottom border-3 my-4" style={{ borderColor: "#D0D5DD" }}></div>

            {/* Searchbar and Button */}
            <Row className="mb-4">
                <Col lg="12">
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
                                    placeholder="Search by Branch"
                                    style={{ height: "40px" }}
                                />
                            </div>
                        </div>
                    </div>
                </Col>
                
            </Row>

            <div className="border-bottom border-3 my-4" style={{ borderColor: "#D0D5DD" }}></div>

            {/* Table for Card Information */}
            <Row style={{ marginBottom: 30, }}>
                <Col lg="12">
                    <div className="table-responsive">
                        <div className="table-responsive">
                            <Table className="align-middle mb-0 text-center">
                                <thead>
                                    <tr style={{ background: "#F9FAFB" }}>
                                    <th className="text-center">Branch</th>
                                    <th className="text-center">Initiator</th>
                                    <th className="text-center">Quantity</th>
                                    <th className="text-center">Batch</th> 
                                    <th className="text-center">Date Requested</th> 
                                    <th className="text-center">Status</th>
                                    <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody style={{ background: "#FFFFFF" }}>
                                    <tr>
                                    <th scope="row">Corporate</th>
                                    <td>RootUser</td>
                                    <td>10</td>
                                    <td>847264905</td>
                                    <td align="center">11/14/2024  10:27:43</td> 
                                    <td align="center">
                                        <span className="badge badge-soft-success me-2 rounded-pill p-2">
                                        Ready
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-center align-items-center">
                                        <Link to="/request-details">
                                            <p className="mb-0" style={{ color: "blue", display: "flex", alignItems: "center", height: "100%" }}>View</p>
                                        </Link>
                                        </div>
                                    </td>
                                    </tr>
                                    <tr>
                                    <th scope="row">Corporate</th>
                                    <td>RootUser</td>
                                    <td>10</td>
                                    <td>847264905</td>
                                    <td align="center">11/14/2024  10:27:43</td> 
                                    <td align="center">
                                        <span className="badge badge-soft-success me-2 rounded-pill p-2">
                                        Ready
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-center align-items-center">
                                        <Link to="/request-details">
                                            <p className="mb-0" style={{ color: "blue", display: "flex", alignItems: "center", height: "100%" }}>View</p>
                                        </Link>
                                        </div>
                                    </td>
                                    </tr>
                                    <tr>
                                    <th scope="row">Corporate</th>
                                    <td>RootUser</td>
                                    <td>10</td>
                                    <td>847264905</td>
                                    <td align="center">11/14/2024  10:27:43</td> 
                                    <td align="center">
                                        <span className="badge badge-soft-warning me-2 rounded-pill p-2">
                                        In Progress
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-center align-items-center">
                                        <Link to="/request-details">
                                            <p className="mb-0" style={{ color: "blue", display: "flex", alignItems: "center", height: "100%" }}>View</p>
                                        </Link>
                                        </div>
                                    </td>
                                    </tr>
                                    <tr>
                                    <th scope="row">Corporate</th>
                                    <td>RootUser</td>
                                    <td>10</td>
                                    <td>847264905</td>
                                    <td align="center">11/14/2024  10:27:43</td> 
                                    <td align="center">
                                        <span className="badge badge-soft-secondary me-2 rounded-pill p-2">
                                        Pending
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-center align-items-center">
                                        <Link to="/request-details">
                                            <p className="mb-0" style={{ color: "blue", display: "flex", alignItems: "center", height: "100%" }}>View</p>
                                        </Link>
                                        </div>
                                    </td>
                                    </tr>
                                    <tr>
                                    <th scope="row">Corporate</th>
                                    <td>RootUser</td>
                                    <td>10</td>
                                    <td>847264905</td>
                                    <td align="center">11/14/2024  10:27:43</td> 
                                    <td align="center">
                                        <span className="badge badge-soft-primary me-2 rounded-pill p-2">
                                        Acknowledged
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center align-items-center">
                                        <Link to="/request-details">
                                            <p className="mb-0" style={{ color: "blue", display: "flex", alignItems: "center", height: "100%" }}>View</p>
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

export default CardRequest

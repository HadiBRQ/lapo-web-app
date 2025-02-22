import React, {useState, useEffect} from "react"

import PropTypes from "prop-types"
import { Container, Row, Col, Card, CardBody, Table, Label, Form, CardTitle, CardSubtitle, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

//Import Components
import Section from "./Section"

//Custom Images
import plusLogo from "../../assets/icons/plus.png"


import { Link } from "react-router-dom"
import FormMask from "./FormMask"

const RequestDetails = () => {
  document.title = "Request Details"

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

        </Container>
      </div>
    </React.Fragment>
  )
}

export default RequestDetails

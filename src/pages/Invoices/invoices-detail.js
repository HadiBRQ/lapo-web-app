import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import { isEmpty, map } from "lodash";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import Image
import logo from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";

// Redux and API imports
import { useDispatch } from "react-redux";
import getTransactionById from "common/realBackend/transactions/getTransactionById";

const InvoiceDetail = () => {

  //meta title
  document.title = "Invoice Detail | LAPO Web App";

  const dispatch = useDispatch();
  const { id } = useParams(); // Use useParams to extract the ID from the URL

  const [invoiceDetail, setInvoiceDetail] = useState({});

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const response = await getTransactionById(id);
        setInvoiceDetail(response.data.transaction);
      } catch (error) {
        console.error("Error fetching transaction details:", error);
      }
    };

    if (id) {
      fetchTransactionDetails();
    }
  }, [id]);

  //Print the Invoice
  const printInvoice = () => {
    window.print();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Invoices" breadcrumbItem="Invoice Detail" />
          {!isEmpty(invoiceDetail) && (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <div className="invoice-title">
                      <h4 className="float-end font-size-16">
                        Order # {invoiceDetail.reference}
                      </h4>
                      <div className="mb-4">
                        <img src={logo} alt="logo-dark" className="logo-dark-element" height="20" />
                        <img src={logoLight} alt="logo-light" className="logo-light-element" height="20" />
                      </div>
                    </div>
                    <hr />
                    <Row>
                      <Col sm="6">
                        <address>
                          <strong>Billed To:</strong>
                          <br />
                          {invoiceDetail.User && (
                            <>
                              {invoiceDetail.User.firstName} {invoiceDetail.User.lastName}
                              <br />
                              {invoiceDetail.User.email}
                              <br />
                              {invoiceDetail.User.phoneNumber}
                            </>
                          )}
                        </address>
                      </Col>
                      <Col sm="6" className="text-sm-end">
                        <address>
                          <strong>Shipped To:</strong>
                          <br />
                          {/* Add shipping details if applicable */}
                        </address>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6" className="mt-3">
                        <address>
                          <strong>Payment Method:</strong>
                          <br />
                          {invoiceDetail.paymentMethod}
                          <br />
                          {invoiceDetail.User && invoiceDetail.User.email}
                        </address>
                      </Col>
                      <Col sm="6" className="mt-3 text-sm-end">
                        <address>
                          <strong>Order Date:</strong>
                          <br />
                          {new Date(invoiceDetail.createdAt).toLocaleDateString()}
                          <br />
                          <br />
                        </address>
                      </Col>
                    </Row>
                    <div className="py-2 mt-3">
                      <h3 className="font-size-15 fw-bold">Order summary</h3>
                    </div>
                    <div className="table-responsive">
                      <Table className="table-nowrap">
                        <thead>
                          <tr>
                            <th style={{ width: "70px" }}>No.</th>
                            <th>Item</th>
                            <th className="text-end">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoiceDetail.SubscriptionPlan && (
                            <>
                              <tr>
                                <td>1</td>
                                <td>{invoiceDetail.SubscriptionPlan.name}</td>
                                <td className="text-end">{invoiceDetail.SubscriptionPlan.price}</td>
                              </tr>
                              <tr>
                                <td colSpan="2" className="border-0 text-end">
                                  <strong>Total</strong>
                                </td>
                                <td className="border-0 text-end">
                                  <h4 className="m-0">
                                    {invoiceDetail.SubscriptionPlan.price}
                                  </h4>
                                </td>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </Table>
                    </div>
                    <div className="d-print-none">
                      <div className="float-end">
                        <Link
                          to="#"
                          onClick={printInvoice}
                          className="btn btn-success  me-2"
                        >
                          <i className="fa fa-print" />
                        </Link>
                        <Link to="#" className="btn btn-primary w-md ">
                          Send
                        </Link>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

InvoiceDetail.propTypes = {
  match: PropTypes.any,
};

export default InvoiceDetail;

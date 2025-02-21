import React, { useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isEmpty } from "lodash";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableContainer from '../../../components/Common/TableContainer';
import * as Yup from "yup";
import { useFormik } from "formik";

// Import components
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import DeleteModal from '../../../components/Common/DeleteModal';

import {
  getOrders as onGetOrders,
  addNewOrder as onAddNewOrder,
  updateOrder as onUpdateOrder,
  deleteOrder as onDeleteOrder,
} from "store/actions";

import {
  OrderId,
  BillingName,
  Date,
  Total,
  PaymentStatus,
  PaymentMethod,
  BillingDetails
} from "./EcommerceOrderCol";

import {
  Button,
  Col,
  Row,
  UncontrolledTooltip,
  Card,
  CardBody,
} from "reactstrap";

// Redux
import { useSelector, useDispatch } from "react-redux";
import EcommerceOrdersModal from "./EcommerceOrdersModal";

function EcommerceOrder() {

  // Meta title
  document.title = "Transactions | LAPO Web App";

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [orderList, setOrderList] = useState([]);
  const [order, setOrder] = useState(null);
  const [viewModal, setViewModal] = useState(false); // Added state for view modal

  const dispatch = useDispatch();
  const { orders } = useSelector(state => ({
    orders: state.ecommerce.orders,
  }));

  useEffect(() => {
    if (orders && !orders.length) {
      dispatch(onGetOrders());
    }
  }, [dispatch, orders]);

  useEffect(() => {
    setOrderList(orders);
  }, [orders]);

  useEffect(() => {
    if (!isEmpty(orders) && !!isEdit) {
      setOrderList(orders);
      setIsEdit(false);
    }
  }, [orders]);

  const toggle = () => {
    if (modal) {
      setModal(false);
      setOrder(null);
    } else {
      setModal(true);
    }
  };

  const toggleViewModal = () => setModal1(!modal1);

  const handleOrderClick = (arg) => {
    const order = arg;
    setOrder({
      id: order.id,
      orderId: order.orderId,
      billingName: order.billingName,
      orderdate: order.orderdate,
      total: order.total,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      badgeclass: order.badgeclass,
    });

    setIsEdit(true);
    toggle();
  };

  // Delete order
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (order) => {
    setOrder(order);
    setDeleteModal(true);
  };

  const handleDeleteOrder = () => {
    if (order && order.id) {
      dispatch(onDeleteOrder(order.id));
      setDeleteModal(false);
    }
  };

  const handlePrintOrder = (order) => {
    const printUrl = `/print-order/${order.orderId}`; // Replace with the actual URL for printing
    window.open(printUrl, '_blank');
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Trans ID',
        accessor: 'orderId',
        width: '150px',
        style: {
          textAlign: "center",
          width: "10%",
          background: "#0000",
        },
        filterable: true,
        Cell: (cellProps) => <OrderId {...cellProps} />,
      },
      {
        Header: 'Billing Name',
        accessor: 'billingName',
        filterable: true,
        Cell: (cellProps) => <BillingName {...cellProps} />,
      },
      {
        Header: 'Billing Details',
        accessor: 'billingDetails',
        filterable: true,
        Cell: () => <div>No Details Available</div>,
      },
      {
        Header: 'Date',
        accessor: 'orderdate',
        filterable: true,
        Cell: (cellProps) => <Date {...cellProps} />,
      },
      {
        Header: 'Total',
        accessor: 'total',
        filterable: true,
        Cell: (cellProps) => <Total {...cellProps} />,
      },
      {
        Header: 'Payment Status',
        accessor: 'paymentStatus',
        filterable: true,
        Cell: (cellProps) => <PaymentStatus {...cellProps} />,
      },
      {
        Header: 'Payment Method',
        accessor: 'paymentMethod',
        Cell: (cellProps) => <PaymentMethod {...cellProps} />,
      },
      {
        Header: 'View Details',
        accessor: 'view',
        disableFilters: true,
        Cell: () => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={toggleViewModal}
            >
              View Details
            </Button>);
        }
      },
      {
        Header: 'Action',
        accessor: 'action',
        disableFilters: true,
        Cell: (cellProps) => (
          <div className="d-flex gap-3">
            <Link
              to="#"
              className="text-primary"
              onClick={() => {
                const orderData = cellProps.row.original;
                handlePrintOrder(orderData);
              }}
            >
              <i className="mdi mdi-printer font-size-18" id="printtooltip" />
              <UncontrolledTooltip placement="top" target="printtooltip">
                Print
              </UncontrolledTooltip>
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Transactions" breadcrumbItem="Transactions" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={orderList}
                    isGlobalFilter={true}
                    isAddOptions={false}  
                    customPageSize={10}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}
EcommerceOrder.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default EcommerceOrder;

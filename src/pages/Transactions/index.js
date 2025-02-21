import React, { useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Row, UncontrolledTooltip, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableContainer from '../../components/Common/TableContainer';
import getAllTransactions from "common/realBackend/transactions/getAllTransactions";
import Breadcrumbs from '../../components/Common/Breadcrumb';
import DeleteModal from '../../components/Common/DeleteModal';
import {
    OrderId,
    BillingName,
    BillingDetails,
    FormattedDate,
    Total,
    PaymentStatus,
    PaymentMethod
} from "./TransactionsCol";
import { useSelector, useDispatch } from "react-redux";
import EcommerceOrdersModal from "./TransactionsModal";

function Transactions() {
    // Meta title
    document.title = "Transactions | LAPO Web App";

    const [modal, setModal] = useState(false);
    const [viewModal, setViewModal] = useState(false); // State for view modal
    const [isEdit, setIsEdit] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const [order, setOrder] = useState(null);
    const [errorModal, setErrorModal] = useState(false); // State for error modal

    const dispatch = useDispatch();
    const navigate = useNavigate(); // Add useNavigate hook for navigation

    const { orders } = useSelector(state => ({
        orders: state.ecommerce.orders,
    }));

    useEffect(() => {
        const fetchTransactionResults = async () => {
            try {
                const response = await getAllTransactions();
                const transactions = response.data.transactions;
                const mappedTransactionResults = transactions.map(transaction => ({
                    id: transaction.id,
                    reference: transaction.reference,
                    billingName: `${transaction.User.firstName} ${transaction.User.lastName}`,
                    createdAt: new Date(transaction.createdAt).toLocaleDateString(), // Format date as needed
                    amount: transaction.amount,
                    status: transaction.status,
                    paymentMethod: transaction.paymentMethod,
                    billingDetails: transaction.SubscriptionPlan ? transaction.SubscriptionPlan.name : 'N/A', // Check if SubscriptionPlan exists
                }));
                setOrderList(mappedTransactionResults);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };
    
        fetchTransactionResults();
    }, []);

    const toggle = () => {
        if (modal) {
            setModal(false);
            setOrder(null);
        } else {
            setModal(true);
        }
    };

    const toggleViewModal = () => setViewModal(!viewModal);

    const toggleErrorModal = () => setErrorModal(!errorModal); // Toggle error modal

    const handleOrderClick = (order) => {
        if (order.status === "success") {
            navigate(`/invoices-detail/${order.id}`); // Navigate to the invoice detail page using transaction ID
        } else {
            toggleErrorModal(); // Show error modal if the payment status is not "success"
        }
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
        const printUrl = `/print-order/${order.reference}`; // Replace with the actual URL for printing
        window.open(printUrl, '_blank');
    };

    const columns = useMemo(
        () => [
            {
                Header: 'Trans ID',
                accessor: 'id',
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
                Cell: (cellProps) => <BillingDetails {...cellProps} />,
            },
            {
                Header: 'Date',
                accessor: 'createdAt',
                filterable: true,
                Cell: (cellProps) => <FormattedDate {...cellProps} />,
            },
            {
                Header: 'Total',
                accessor: 'amount',
                filterable: true,
                Cell: (cellProps) => <Total {...cellProps} />,
            },
            {
                Header: 'Payment Status',
                accessor: 'status',
                filterable: true,
                Cell: (cellProps) => {
                    const status = cellProps.value;
                    const badgeClass = status === 'success' ? 'bg-success' : 'bg-danger';
                    return <span className={`badge ${badgeClass}`}>{status}</span>;
                },
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
                Cell: (cellProps) => (
                    <Button
                        type="button"
                        color="primary"
                        className="btn-sm btn-rounded"
                        onClick={() => handleOrderClick(cellProps.row.original)}
                    >
                        View Details
                    </Button>
                ),
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
            <EcommerceOrdersModal isOpen={viewModal} toggle={toggleViewModal} />
            <DeleteModal
                show={deleteModal}
                onDeleteClick={handleDeleteOrder}
                onCloseClick={() => setDeleteModal(false)}
            />
            {/* Error Modal for Failed Transactions */}
            <Modal isOpen={errorModal} toggle={toggleErrorModal} centered>
                <ModalHeader toggle={toggleErrorModal}>Error</ModalHeader>
                <ModalBody>
                    <p>Cannot generate receipt for failed transaction.</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleErrorModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
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

Transactions.propTypes = {
    preGlobalFilteredRows: PropTypes.any,
};

export default Transactions;

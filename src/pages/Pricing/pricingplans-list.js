import React, { useState, useEffect, useMemo } from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";
import TableContainer from "components/Common/TableContainer2";
import Breadcrumbs from "components/Common/Breadcrumb";
import CreatePlanModal from "./CreatePlanModal";
import EditPlanModal from "./EditPlanModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import getSubscriptionPlans from "common/realBackend/subscription/getAllSubscriptionPlans";
import createSubscriptionPlan from "common/realBackend/subscription/createSubscriptionPlan";
import deleteSubscriptionPlan from "common/realBackend/subscription/deleteSubscriptionPlan";
import updateSubscriptionPlan from "common/realBackend/subscription/updateSubscriptionPlan";

const PricingPlansList = props => {
  document.title = "Pricing Plans | LAPO Web App";

  const [plans, setPlans] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [createPlanModal, setCreatePlanModal] = useState(false);
  const [editPlanModal, setEditPlanModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const columns = useMemo(
    () => [
      {
        Header: "Plan Name",
        accessor: "name",  
        filterable: true,
      },
      {
        Header: "Description",
        accessor: "description",  
        filterable: false,
      },
      {
        Header: "Price",
        accessor: "price",  
        filterable: false,
        Cell: ({ value }) => `₦${value}`,  
      },
      {
        Header: "Subscription Period",
        accessor: "subscriptionPeriod",  
        filterable: false,
        Cell: ({ row }) => `${row.original.periodDuration} ${row.original.subscriptionPeriod}`,
      },
      {
        Header: "Features",
        accessor: "features",  
        filterable: false,
        Cell: ({ value }) => (
          <ul>
            {value.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        ),
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-primary"
                onClick={() => {
                  const planData = cellProps.row.original;
                  setSelectedPlan(planData);
                  setEditPlanModal(true);
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="editPlantooltip" />
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const planData = cellProps.row.original;
                  setSelectedPlan(planData);
                  setConfirmDeleteModal(true); // Open confirmation modal
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletePlantooltip" />
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      try {
        const data = await getSubscriptionPlans();
        setPlans(data); 
      } catch (error) {
        setErrorMessage('Failed to load subscription plans.');
        setPlans([]); 
      }
    };

    fetchSubscriptionPlans();
  }, []);

  const handleCreatePlan = async (planData) => {
    try {
      await createSubscriptionPlan(planData);
      setSuccessMessage('New plan created successfully.');
      setCreatePlanModal(false);
      // Reload plans after creation
      const data = await getSubscriptionPlans();
      setPlans(data);
    } catch (error) {
      setErrorMessage('Failed to create the subscription plan.');
    }
  };

  const handleUpdatePlan = async (updatedPlanData) => {
    if (selectedPlan) {
      try {
        await updateSubscriptionPlan(selectedPlan.id, updatedPlanData); // Use the plan id for update
        setSuccessMessage(`Plan ${selectedPlan.name} updated successfully.`);
        setEditPlanModal(false);
        // Reload plans after update
        const data = await getSubscriptionPlans();
        setPlans(data);
      } catch (error) {
        setErrorMessage('Failed to update the subscription plan.');
      }
    }
  };

  const handleDeletePlan = async () => {
    if (selectedPlan) {
      try {
        await deleteSubscriptionPlan(selectedPlan.id); // Use the plan id for deletion
        setSuccessMessage(`You have deleted the ${selectedPlan.name} plan.`);
        setErrorMessage('');
        setConfirmDeleteModal(false);
        // Reload plans after deletion
        const data = await getSubscriptionPlans();
        setPlans(data);
      } catch (error) {
        setErrorMessage('Failed to delete the subscription plan.');
      }
    }
  };

  return (
    <React.Fragment>
      <ConfirmDeleteModal
        show={confirmDeleteModal}
        onDeleteClick={handleDeletePlan}
        onCloseClick={() => setConfirmDeleteModal(false)}
        planName={selectedPlan?.name} // Pass the plan name to the modal
      />
      <EditPlanModal
        show={editPlanModal}
        onCloseClick={() => setEditPlanModal(false)}
        plan={selectedPlan}
        onSave={handleUpdatePlan} // Pass the update function as a prop
      />
      <CreatePlanModal
        show={createPlanModal}
        onCloseClick={() => setCreatePlanModal(false)}
        onSave={handleCreatePlan}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Pricing" breadcrumbItem="Subscription Plans" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>

                  {successMessage && (
                    <div className="alert alert-success mt-4" role="alert">
                      {successMessage}
                    </div>
                  )}
                  {errorMessage && (
                    <div className="alert alert-danger mt-4" role="alert">
                      {errorMessage}
                    </div>
                  )}

                  <div className="d-flex justify-content-end mb-3">
                    <Button color="success" onClick={() => setCreatePlanModal(true)}>
                      Create New Plan
                    </Button>
                  </div>
                  <TableContainer
                    columns={columns}
                    data={plans}
                    isGlobalFilter={true}
                    customPageSize={10}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(PricingPlansList);

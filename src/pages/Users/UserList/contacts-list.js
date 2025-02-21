import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import withRouter from "components/Common/withRouter";
import TableContainer1 from "./TableContainer";
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import UserProfileForm from "./UserProfileForm";
import updateUser from "common/realBackend/users/updateUser";

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

import { Name1, Email1, Tags1, Projects1, Phone1 } from "./contactlistCol";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import DeleteModal1 from "./DeleteModal";
import { isEmpty } from "lodash";
import getAllUsers from "common/realBackend/users/getAllUsers";
import getSubscriptionPlanById from "common/realBackend/subscription/getSubscriptionPlanByID";
import getSubscriptionPlans from "common/realBackend/subscription/getAllSubscriptionPlans";
import deleteUser from "common/realBackend/users/deleteUser";
import getAllUserCandidatesByUserId from "common/realBackend/candidates/getAllUserCandidateByUserId";

import {
  getUsers as onGetUsers,
  addNewUser as onAddNewUser,
  updateUser as onUpdateUser,
  deleteUser as onDeleteUser,
} from "store/contacts/actions";


//redux
import { useSelector, useDispatch } from "react-redux";

const ContactsList1 = (props) => {

  //meta title
  document.title = "User List | LAPO Web App";

  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [contact, setContact] = useState(null); // Changed to null initially
  const [plans, setPlans] = useState([]);
  const [initialSubscriptionName, setInitialSubscriptionPlanName] = useState('');

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plansData = await getSubscriptionPlans();
        setPlans(plansData);

        if (contact?.subscriptionPlanId) {
          const selectedPlan = plansData.find(plan => plan.id === contact.subscriptionPlanId);
          setInitialSubscriptionPlanName(selectedPlan?.name || '');
        }
      } catch (error) {
        console.error('Error fetching subscription plans:', error);
      }
    };

    fetchPlans();
  }, [contact?.subscriptionPlanId]);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    address: Yup.string().required('Address is required'),
    role: Yup.string().required('Role is required')
  });
  // validation
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: contact?.firstName || "",
      lastName: contact?.lastName || "",
      email: contact?.email || "",
      password: "", // Keep empty for optional field
      phoneNumber: contact?.phoneNumber || "",
      address: contact?.address || "",
      role: contact?.role || "",
      subscriptionPlanId: initialSubscriptionName
    },
    validationSchema,
    onSubmit: values => {
      if (isEdit) {
        const updatedUser = {
          id: contact.id,
          ...values,
        };
        dispatch(onUpdateUser(updatedUser));
        setIsEdit(false);
        formik.resetForm();
      } else {
        const newUser = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          ...values
        };
        dispatch(onAddNewUser(newUser));
        formik.resetForm();
      }
      toggle();
    }
  });

  const [usersList, setUsersList] = useState([]);
  const [userId, setUserId] = React.useState(null);
  const [subscriptionPlans, setSubscriptionPlans] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [candidateCounts, setCandidateCounts] = useState({});
  const [candidatesData, setCandidatesData] = useState({});

  const handleSelectPlan = (selectedPlanId) => {
    // Update form values or state with the selected plan ID
    setContact(prev => ({
      ...prev,
      subscriptionPlanId: selectedPlanId,
    }));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        if (response.status === "success") {
          const approvedUsers = response.data.users.filter(user => user.acceptanceStatus === 'approved');
  
          // Fetch candidate counts for each user
          const counts = await Promise.all(approvedUsers.map(async (user) => {
            try {
              const candidatesResponse = await getAllUserCandidatesByUserId(user.id);
              // Log candidates data
              console.log(`Candidates for user ${user.id}:`, candidatesResponse.data.candidates);
              setCandidatesData(prev => ({ ...prev, [user.id]: candidatesResponse.data.candidates }));
              return {
                userId: user.id,
                count: candidatesResponse.data.candidates.length,
              };
            } catch (error) {
              console.error(`Error fetching candidates for user ${user.id}:`, error);
              return { userId: user.id, count: 0 };
            }
          }));
  
          const countsMap = counts.reduce((acc, { userId, count }) => {
            acc[userId] = count;
            return acc;
          }, {});
  
          console.log("Candidate counts map:", countsMap); // Debugging log
          setCandidateCounts(countsMap);
  
          const usersWithPlans = await Promise.all(
            approvedUsers.map(async (user) => {
              let subscriptionPlanName = "No Subscription Plan";
              if (user.subscriptionPlanId) {
                try {
                  const subscriptionPlanResponse = await getSubscriptionPlanById(user.subscriptionPlanId);
                  if (subscriptionPlanResponse.status === "success") {
                    subscriptionPlanName = subscriptionPlanResponse.data.subscriptionPlan.name;
                  }
                } catch (error) {
                  console.error(`Error fetching subscription plan for user ${user.id}:`, error);
                }
              }
              return {
                ...user,
                subscriptionPlanName,
                candidateCount: countsMap[user.id] || 0,
              };
            })
          );
  
          console.log("Users with plans:", usersWithPlans); // Debugging log
          setUsersList(usersWithPlans);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  }, []);  

  const columns = useMemo(() => [
    {
      Header: "#",
      // Cell: () => <input type="checkbox" className="form-check-input" />,
      accessor: "id",
        filterable: true,
        Cell: cellProps => {
          return <Name1 {...cellProps} />;
        },
    },
      {
        Header: "Img",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps) => (
          <>
            {!cellProps.profileImageUrl ? (
              <div className="avatar-xs">
                <span className="avatar-title rounded-circle">
                  {cellProps.fullName.charAt(0)}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className="rounded-circle avatar-xs"
                  src={cellProps.profileImageUrl}
                  alt=""
                />
              </div>
            )}
          </>
        ),
      },
      {
        Header: "Name",
        accessor: "fullName",
        filterable: true,
        Cell: cellProps => {
          return <Name1 {...cellProps} />;
        },
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: true,
        Cell: cellProps => {
          return <Email1 {...cellProps} />;
        },
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
        filterable: true,
        Cell: cellProps => {
          return <Phone1 {...cellProps} />;
        },
      },
      {
        Header: "Subscription",
        accessor: "subscriptionPlanName",
        filterable: true,
        Cell: cellProps => {
          return <Tags1 value={cellProps.value} />;
        },
      },
      {
        Header: "Number of Candidates",
        accessor: "candidateCount", // Change to the appropriate field if needed
        filterable: true,
        Cell: cellProps => {
          return (
            <>
              <Projects1 {...cellProps} />
            </>
          );
        },
      },
      {
        Header: "Action",
        Cell: ({ row }) => {
          const userData = row.original;
          const candidatesForUser = candidatesData[userData.id] || [];
          return (
            <div className="d-flex gap-3">
              <Link
                to={`/user-overview/${userData.id}`}
                state={{
                  candidateCount: candidateCounts[userData.id] || 0,
                  candidates: candidatesForUser || []
                }}
                className="text-info"
                onClick={() => {
                  console.log("Navigating to user overview with ID:", userData.id);
                  console.log("Candidate Count:", candidateCounts[userData.id] || 0);
                  console.log("Candidates Data:", candidatesForUser || []);
                }}
              >
                <i className="mdi mdi-eye font-size-18" id="viewtooltip" />
                <UncontrolledTooltip placement="top" target="viewtooltip">
                  View
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  handleUserClick(userData);
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  onClickDelete(userData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Suspend
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    [candidatesData]
  );

  useEffect(() => {
    if (!users || !users.length) {
      dispatch(onGetUsers());
      setIsEdit(false);
    }
  }, [dispatch, users]);

  useEffect(() => {
    setContact(users);
    setIsEdit(false);
  }, [users]);

  useEffect(() => {
    if (!isEmpty(users) && !!isEdit) {
      setContact(users);
      setIsEdit(false);
    }
  }, [users]);

  const toggle = () => {
    if (modal) {
      setModal(false);
      setContact({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        role: '',
        subscriptionPlanId: ''
      });
    } else {
      setModal(true);
    }
  };

  const handleUserClick = (user) => {
    setUserId(user.id);
    if (user) {
      setContact({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: '', // Assuming password is handled differently
        phoneNumber: user.phoneNumber,
        address: user.address,
        role: user.role,
        subscriptionPlanId: user.subscriptionPlanId || ''
      });
      setIsEdit(true); // Set to edit mode
    } else {
      setContact({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        role: '',
        subscriptionPlanId: ''
      });
      setIsEdit(false); // Set to create mode
    }
    toggle(); // Open the modal
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEdit) {
        await updateUser(userId, values);
        toast.success('User updated successfully');
      } else {
        await createUser(values);
        toast.success('User created successfully');
      }
      // Optionally refresh user list or perform additional actions
    } catch (error) {
      toast.error('Error handling user');
    } finally {
      setSubmitting(false);
      // Reset the contact state here
      setContact({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        role: '',
        subscriptionPlanId: ''
      });
    }
  };

  var node = useRef();
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page);
    }
  };

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (user) => {
    setSelectedUserId(user.id); // Set the ID of the user to be deleted
    setDeleteModal(true); // Open the delete modal
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id); // Call deleteUser with the ID
      setUsersList(usersList.filter(user => user.id !== id)); // Update user list after deletion
      setDeleteModal(false); // Close the modal
      toast.success("User suspended successfully!"); // Show success toast
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error suspending user. Please try again."); // Show error toast
    }
  };

  const handleUserClicks = () => {
    setIsEdit(false);
    toggle();
  };

  const keyField = "id";

  return (
    <React.Fragment>
      <ToastContainer />
      <DeleteModal1
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
        id={selectedUserId} 
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Users" breadcrumbItem="User List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                <TableContainer1
                      columns={columns}
                      data={usersList} // Ensure usersList is an array
                      isGlobalFilter={true}
                      isAddUserList={true}
                      handleUserClick={handleUserClicks}
                      customPageSize={10}
                      className="custom-header-css"
                      // addUserButtonLabel="Create User"
                    />
                  <Modal isOpen={modal} toggle={toggle}>
                      <ModalHeader toggle={toggle} tag="h4">
                        {!!isEdit ? "Edit User" : "Create User"}
                      </ModalHeader>
                      <ModalBody>
                      <UserProfileForm
                        initialValues={contact} // Pass the contact state for form initialization
                        onSubmit={handleSubmit} // Handle form submission
                        onClose={toggle}
                        isEdit={isEdit}
                        userId={userId}
                        initialSubscriptionPlanName={initialSubscriptionName}
                        subscriptionPlans={plans} // Make sure to pass the plans here
                        handleChange={formik.handleChange} // Ensure this is passed correctly
                        formik={formik}      
                        handleSelectPlan={handleSelectPlan}             
                      />
                    </ModalBody>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ContactsList1);

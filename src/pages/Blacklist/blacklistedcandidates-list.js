import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";
import TableContainer from "components/Common/TableContainer2";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  FormFeedback,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import isEmpty from 'lodash/isEmpty';

import { Name, Email, Tags, Projects } from "../Blacklist/BlacklistCol";

// Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import DeleteModal from "components/Common/DeleteModal";

// Import API functions
import getAllCandidatesWithBlacklist from 'common/realBackend/blacklist/getAllCandidatesWithBlacklist';
import setBlacklistThreshold from 'common/realBackend/blacklist/setBlacklistThreshold';
import deblacklistCandidate from 'common/realBackend/blacklist/deblacklistCandidate'; // Use this imported function

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers as onGetUsers,
  addNewUser as onAddNewUser,
  updateUser as onUpdateUser,
  deleteUser as onDeleteUser,
} from "store/contacts/actions";

const BlacklistedCandidatesList = props => {
  document.title = "BlackList | LAPO Web App";

  const dispatch = useDispatch();
  const [contact, setContact] = useState();
  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [deblacklistModal, setDeblacklistModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      designation: "",
    },
    validationSchema: Yup.object({
      designation: Yup.string().required("Please enter a value"),
    }),
    onSubmit: async (values) => {
      console.log("Form submitted with values:", values);
      try {
        const response = await setBlacklistThreshold(values.designation);
        console.log("API response:", response);
        setSuccessMessage('Threshold value updated successfully!');
        setErrorMessage('');
        // Close the modal or perform any other actions needed
        toggle();
      } catch (error) {
        console.error("API error:", error);
        setErrorMessage('Failed to update threshold value. Please try again.');
        setSuccessMessage('');
      }
    },
  });

  const { users } = useSelector(state => ({
    users: state.contacts.users,
  }));

  const onDeblacklistUser = async () => {
    try {
      await deblacklistCandidate(selectedCandidate.id);
      console.log(`Candidate ${selectedCandidate.fullName} has been deblacklisted.`);
      setSuccessMessage(`Candidate ${selectedCandidate.fullName} has been deblacklisted.`);
      setErrorMessage('');
      setDeblacklistModal(false);
      setSelectedCandidate(null);
  
      // Optionally, refresh the candidate list
      const data = await getAllCandidatesWithBlacklist();
      setCandidates(data.data.candidates);
    } catch (error) {
      console.error('Error de-blacklisting candidate:', error);
      setErrorMessage('Failed to deblacklist candidate. Please try again.');
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Img",
        disableFilters: true,
        filterable: false,
        accessor: "profileImage",  // Mapping to the profileImage field
        Cell: ({ value, row }) => (
          <>
            {!value ? (
              <div className="avatar-xs">
                <span className="avatar-title rounded-circle">
                  {row.original.fullName.charAt(0)}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className="rounded-circle avatar-xs"
                  src={value}
                  alt=""
                />
              </div>
            )}
          </>
        ),
      },
      {
        Header: "Name",
        accessor: "fullName",  // Mapping to the fullName field
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "No. of Time Blacklisted",
        accessor: "blacklistCount",  // Mapping to the blacklistCount field
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return (
            <>
              {" "}
              <Projects {...cellProps} />{" "}
            </>
          );
        },
      },
      {
        Header: "No. of Views",
        accessor: "views",  // Mapping to the views field
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Email {...cellProps} />;
        },
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const userData = cellProps.row.original;
                  setSelectedCandidate(userData);
                  setDeblacklistModal(true);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="blacklisttooltip" />
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (users && !users.length) {
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

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await getAllCandidatesWithBlacklist();
        console.log('Fetched candidates data:', data); // Log the data
        setCandidates(data.data.candidates);
      } catch (error) {
        console.error('Error fetching candidates with blacklist threshold:', error);
        setCandidates([]); // Ensure candidates is an empty array in case of error
      }
    };

    fetchCandidates();
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const handleUserClick = arg => {
    const user = arg;

    setContact({
      id: user.id,
      name: user.name,
      designation: user.designation,
      email: user.email,
      tags: user.tags,
      projects: user.projects,
    });
    setIsEdit(true);

    toggle();
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

  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = users => {
    setContact(users);
    setDeleteModal(true);
  };

  const handleDeleteUser = () => {
    if (contact && contact.id) {
      dispatch(onDeleteUser(contact.id));
    }
    onPaginationPageChange(1);
    setDeleteModal(false);
  };

  const handleUserClicks = () => {
    setUserList("");
    setIsEdit(false);
    toggle();
  };

  const keyField = "id";

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <Modal isOpen={deblacklistModal} toggle={() => setDeblacklistModal(!deblacklistModal)}>
        <ModalHeader toggle={() => setDeblacklistModal(!deblacklistModal)}>Confirm Deblacklist</ModalHeader>
        <ModalBody>
          Are you sure you want to deblacklist {selectedCandidate?.fullName}?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onDeblacklistUser}>Confirm</Button>
          <Button color="secondary" onClick={() => setDeblacklistModal(!deblacklistModal)}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Blacklist" breadcrumbItem="Blacklisted Candidates" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                <TableContainer
                   columns={columns}
                   data={candidates}
                   isGlobalFilter={true}
                   isAddUserList={true}
                   handleUserClick={handleUserClicks}
                   customPageSize={10}
                   className="custom-header-css"
                 />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
              {!!isEdit ? "Edit User" : "Add User"}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Row form>
                  <Col xs={12}>
                    <div className="mb-3">
                      <Label className="form-label">Threshold Value</Label>
                      <Input
                        name="designation"
                        type="text"
                        placeholder="Enter threshold value"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.designation || ""}
                        invalid={
                          validation.touched.designation &&
                          validation.errors.designation
                            ? true
                            : false
                        }
                      />
                      {validation.touched.designation &&
                      validation.errors.designation ? (
                        <FormFeedback type="invalid">
                          {validation.errors.designation}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <Button type="submit" color="success">
                        Save
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
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
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(BlacklistedCandidatesList);

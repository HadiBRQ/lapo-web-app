import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
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

import { Name, Salary, Experiences } from "./contactlistCol";

// Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import DeleteModal from "components/Common/DeleteModal";

import {
  getUsers as onGetUsers,
  addNewUser as onAddNewUser,
  updateUser as onUpdateUser,
  deleteUser as onDeleteUser,
} from "store/contacts/actions";
import { isEmpty } from "lodash";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { Experience } from "pages/JobPages/JobList/JobListCol";

const ContactsList = (props) => {
  // Meta title
  document.title = "User List | Skote - React Admin & Dashboard Template";

  const dispatch = useDispatch();
  const [contact, setContact] = useState();
  // Validation
  const validation = useFormik({
    // Enable reinitialize: use this flag when initial values need to be changed
    enableReinitialize: true,

    initialValues: {
      name: (contact && contact.name) || "",
      designation: (contact && contact.designation) || "",
      tags: (contact && contact.tags) || "",
      email: (contact && contact.email) || "",
      experiences: (contact && contact.experiences) || "",
      blacklisted: (contact && contact.blacklisted) || false, // New
      blacklistCount: (contact && contact.blacklistCount) || 0, // New
      employmentStatus: (contact && contact.employmentStatus) || "", // New
      candidateViews: (contact && contact.candidateViews) || 0, // New
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      designation: Yup.string().required("Please Enter Your Designation"),
      tags: Yup.array().required("Please Enter Tag"),
      email: Yup.string()
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please Enter Valid Email"
        )
        .required("Please Enter Your Email"),
      experiences: Yup.string().required("Please Enter Your Experiences"),
      blacklisted: Yup.boolean().required("Please Enter Blacklisted Status"), // New
      blacklistCount: Yup.number().required("Please Enter Blacklist Count"), // New
      employmentStatus: Yup.string().required("Please Enter Employment Status"), // New
      candidateViews: Yup.number().required("Please Enter Candidate Views"), // New
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateUser = {
          id: contact.id,
          name: values.name,
          designation: values.designation,
          tags: values.tags,
          email: values.email,
          experiences: values.experiences,
          blacklisted: values.blacklisted, // New
          blacklistCount: values.blacklistCount, // New
          employmentStatus: values.employmentStatus, // New
          candidateViews: values.candidateViews, // New
        };
        // Update user
        dispatch(onUpdateUser(updateUser));
        setIsEdit(false);
        validation.resetForm();
      } else {
        const newUser = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          name: values["name"],
          designation: values["designation"],
          email: values["email"],
          tags: values["tags"],
          experiences: values["experiences"],
          blacklisted: values["blacklisted"], // New
          blacklistCount: values["blacklistCount"], // New
          employmentStatus: values["employmentStatus"], // New
          candidateViews: values["candidateViews"], // New
        };
        // Save new user
        dispatch(onAddNewUser(newUser));
        validation.resetForm();
      }
      toggle();
    },
  });

  const { users } = useSelector((state) => ({
    users: state.contacts.users,
  }));

  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: () => {
          return <input type="checkbox" className="form-check-input" />;
        },
        
      },
      {
        Header: "Img",
        // Accessor: "name",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps) => (
          <>
            {!cellProps.img ? (
              <div className="avatar-xs">
                <span className="avatar-title rounded-circle">
                  {cellProps.name.charAt(0)}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className="rounded-circle avatar-xs"
                  src={cellProps.img}
                  alt=""
                />
              </div>
            )}
          </>
        ),
       
      },
      {
        Header: "Name",
        accessor: "name",
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      
      },
      {
        Header: "Salary",
        accessor: "salary",
        filterable: true,
        Cell: (cellProps) => {
          return <Salary {...cellProps} />;
        },
        
      },
      {
        Header: "Experiences",
        accessor: "experiences",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <Experiences {...cellProps} />
            </>
          );
        },
        
      },
      {
        Header: "Blacklisted", // New
        accessor: "blacklisted", // New
        filterable: true,
        Cell: (cellProps) => {
          return cellProps.value ? "Yes" : "No";
        },
        
      },
      {
        Header: "Blacklist Count", // New
        accessor: "blacklistCount", // New
        filterable: true,
        
      },
      {
        Header: "Employment Status", // New
        accessor: "employmentStatus", // New
        filterable: true,
        
      },
      {
        Header: "Candidate Views", // New
        accessor: "candidateViews", // New
        filterable: true,
        
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const userData = cellProps.row.original;
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
                  const userData = cellProps.row.original;
                  onClickDelete(userData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-info"
                onClick={() => {
                  const userData = cellProps.row.original;
                  onViewUser(userData);
                }}
              >
                <i className="mdi mdi-eye font-size-18" id="viewtooltip" />
                <UncontrolledTooltip placement="top" target="viewtooltip">
                  View
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-warning"
                onClick={() => {
                  const userData = cellProps.row.original;
                  onBlacklistUser(userData);
                }}
              >
                <i className="mdi mdi-block-helper font-size-18" id="blacklisttooltip" />
                <UncontrolledTooltip placement="top" target="blacklisttooltip">
                  Blacklist
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
        style: { whiteSpace: "nowrap", overflow: "hidden" },
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
    setUserList(users);
    setIsEdit(false);
  }, [users]);

  useEffect(() => {
    if (!isEmpty(users) && !!isEdit) {
      setUserList(users);
      setIsEdit(false);
    }
  }, [users]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleUserClick = (arg) => {
    const user = arg;
    setContact({
      id: user.id,
      name: user.name,
      designation: user.designation,
      tags: user.tags,
      email: user.email,
      experiences: user.experiences,
      blacklisted: user.blacklisted, // New
      blacklistCount: user.blacklistCount, // New
      employmentStatus: user.employmentStatus, // New
      candidateViews: user.candidateViews, // New
    });
    setIsEdit(true);
    toggle();
  };

  // Delete customer
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (users) => {
    setContact(users);
    setDeleteModal(true);
  };

  const handleDeleteUser = () => {
    if (contact.id) {
      dispatch(onDeleteUser(contact));
      setDeleteModal(false);
    }
  };

  const keyField = "id";

  const onViewUser = (user) => {
    // Implement the view functionality here
    console.log("View user", user);
  };

  const onBlacklistUser = (user) => {
    // Implement the blacklist functionality here
    console.log("Blacklist user", user);
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Contacts" breadcrumbItem="User List" />
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <div className="d-flex justify-content-end mb-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => setModal(true)}
                  >
                    Add New User
                  </button>
                </div>
                {/* <div style={{ overflowX: "auto" }}> */}
                  <TableContainer
                    columns={columns}
                    data={userList}
                    isGlobalFilter={true}
                    isAddOptions={false}
                    isColumnFilter={true}
                    customPageSize={10}
                    className="custom-header-css"
                  />
                {/* </div> */}
                <DeleteModal
                  show={deleteModal}
                  onDeleteClick={handleDeleteUser}
                  onCloseClick={() => setDeleteModal(false)}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} tag="h4">
            {isEdit ? "Edit User" : "Add User"}
          </ModalHeader>
          <ModalBody>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <Row form>
                <Col className="col-12">
                  <div className="mb-3">
                    <Label className="form-label">Name</Label>
                    <Input
                      name="name"
                      className="form-control"
                      placeholder="Enter Name"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.name || ""}
                      invalid={
                        validation.touched.name && validation.errors.name
                          ? true
                          : false
                      }
                    />
                    {validation.touched.name && validation.errors.name ? (
                      <FormFeedback type="invalid">
                        {validation.errors.name}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label className="form-label">Designation</Label>
                    <Input
                      name="designation"
                      className="form-control"
                      placeholder="Enter Designation"
                      type="text"
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

                  <div className="mb-3">
                  <Label className="form-label">Salary</Label>
                  <Input
                      name="salary" 
                      className="form-control"
                      placeholder="Enter Salary" 
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.salary || ""} 
                      invalid={
                        validation.touched.salary && validation.errors.salary
                          ? true
                          : false
                      }
                    />
                    {validation.touched.salary && validation.errors.salary ? (
                      <FormFeedback type="invalid">
                        {validation.errors.salary}
                      </FormFeedback>
                    ) : null}
                  </div>
                  
                  <div className="mb-3">
                    <Label className="form-label">Experiences</Label>
                    <Input
                      name="experiences"
                      className="form-control"
                      placeholder="Enter Your Experiences"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.experiences || ""}
                      invalid={
                        validation.touched.experiences &&
                        validation.errors.experiences
                          ? true
                          : false
                      }
                    />
                    {validation.touched.experiences &&
                    validation.errors.experiences ? (
                      <FormFeedback type="invalid">
                        {validation.errors.experiences}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label className="form-label">Blacklisted</Label> {/* New */}
                    <Input
                      name="blacklisted"
                      className="form-control"
                      placeholder="Enter Blacklisted Status"
                      type="checkbox"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.blacklisted || false}
                      invalid={
                        validation.touched.blacklisted &&
                        validation.errors.blacklisted
                          ? true
                          : false
                      }
                    />
                    {validation.touched.blacklisted &&
                    validation.errors.blacklisted ? (
                      <FormFeedback type="invalid">
                        {validation.errors.blacklisted}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label className="form-label">Blacklist Count</Label>{" "}
                    {/* New */}
                    <Input
                      name="blacklistCount"
                      className="form-control"
                      placeholder="Enter Blacklist Count"
                      type="number"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.blacklistCount || 0}
                      invalid={
                        validation.touched.blacklistCount &&
                        validation.errors.blacklistCount
                          ? true
                          : false
                      }
                    />
                    {validation.touched.blacklistCount &&
                    validation.errors.blacklistCount ? (
                      <FormFeedback type="invalid">
                        {validation.errors.blacklistCount}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label className="form-label">Employment Status</Label>{" "}
                    {/* New */}
                    <Input
                      name="employmentStatus"
                      className="form-control"
                      placeholder="Enter Employment Status"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.employmentStatus || ""}
                      invalid={
                        validation.touched.employmentStatus &&
                        validation.errors.employmentStatus
                          ? true
                          : false
                      }
                    />
                    {validation.touched.employmentStatus &&
                    validation.errors.employmentStatus ? (
                      <FormFeedback type="invalid">
                        {validation.errors.employmentStatus}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                <Label className="form-label" htmlFor="candidateViews">
                  Candidate Views
                </Label>
                <Input
                  name="candidateViews"
                  type="number"
                  id="candidateViews"
                  placeholder="Enter Candidate Views"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.candidateViews || 0}
                  invalid={
                    validation.touched.candidateViews &&
                    validation.errors.candidateViews
                      ? true
                      : false
                  }
                />
                {validation.touched.candidateViews &&
                validation.errors.candidateViews ? (
                  <FormFeedback type="invalid">
                    {validation.errors.candidateViews}
                  </FormFeedback>
                ) : null}
              </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={() => setIsEdit(false)}
                    >
                      Submit
                    </button>
                  </div>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    </div>
  );
};

export default withRouter(ContactsList);
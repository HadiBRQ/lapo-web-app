import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";
import TableContainer from "components/Common/TableContainer";
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

import { Name, Salary, Experiences } from "./candidateslistCol";

// Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import DeleteModal from "components/Common/DeleteModal";

// Import API
import getAllCandidates from "common/realBackend/candidates/getAllCandidates";
import deleteCandidate from "common/realBackend/candidates/deleteCandidate";

const CandidatesList = (props) => {
  // Meta title
  document.title = "Candidate List | LAPO Web App";

  const [contact, setContact] = useState({});
  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // Dummy data for employment status and candidate views
  const dummyEmploymentStatuses = [
    "Employed",
    "Unemployed",
    "Self-Employed",
  ];
  const dummyCandidateViews = [10, 20, 30, 40, 50];

  // Validation
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: (contact && contact.fullName) || "",
      salary: (contact && contact.salaryRangeMin) || "",
      experiences: (contact && contact.yearsOfExperience) || "",
      blacklisted: (contact && contact.blacklisted) || false,
      blacklistCount: (contact && contact.blacklistCount) || 0,
      employmentStatus: (contact && contact.employmentStatus) || dummyEmploymentStatuses[0],
      candidateViews: (contact && contact.candidateViews) || dummyCandidateViews[0],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      salary: Yup.string().required("Please Enter Your Salary"),
      experiences: Yup.string().required("Please Enter Your Experiences"),
      blacklisted: Yup.boolean().required("Please Enter Blacklisted Status"),
      blacklistCount: Yup.number().required("Please Enter Blacklist Count"),
      employmentStatus: Yup.string().required("Please Enter Employment Status"),
      candidateViews: Yup.number().required("Please Enter Candidate Views"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateUser = {
          id: contact.id,
          fullName: values.name,
          salaryRangeMin: values.salary,
          yearsOfExperience: values.experiences,
          blacklisted: values.blacklisted,
          blacklistCount: values.blacklistCount,
          employmentStatus: values.employmentStatus,
          candidateViews: values.candidateViews,
        };
        // Update user logic here
        console.log("Updating user:", updateUser);
        setIsEdit(false);
        validation.resetForm();
      } else {
        const newUser = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          fullName: values["name"],
          salaryRangeMin: values["salary"],
          yearsOfExperience: values["experiences"],
          blacklisted: values["blacklisted"],
          blacklistCount: values["blacklistCount"],
          employmentStatus: values["employmentStatus"],
          candidateViews: values["candidateViews"],
        };
        // Save new user logic here
        console.log("Adding new user:", newUser);
        validation.resetForm();
      }
      toggle();
    },
  });

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await getAllCandidates();
        console.log("Fetched candidates:", response);

        const candidates = response.data.candidates;

        const mappedData = candidates.map(candidate => ({
          id: candidate.id,
          profileImage: candidate.profileImage,
          fullName: candidate.fullName,
          salaryRangeMin: candidate.salaryRangeMin,
          salaryRangeMax: candidate.salaryRangeMax,
          yearsOfExperience: candidate.yearsOfExperience,
          blacklisted: candidate.blacklistCount > 0,
          blacklistCount: candidate.blacklistCount,
          employmentStatus: candidate.employmentStatus || dummyEmploymentStatuses[Math.floor(Math.random() * dummyEmploymentStatuses.length)],
          candidateViews: candidate.candidateViews || dummyCandidateViews[Math.floor(Math.random() * dummyCandidateViews.length)],
        }));
        setUserList(mappedData);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

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
        accessor: (cellProps) => (
          <>
            {!cellProps.profileImage ? (
              <div className="avatar-xs">
                <span className="avatar-title rounded-circle">
                  {cellProps.fullName.charAt(0)}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className="rounded-circle avatar-xs"
                  src={cellProps.profileImage}
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
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Salary",
        accessor: (cellProps) => `₦${cellProps.salaryRangeMin} - ₦${cellProps.salaryRangeMax}`,
        Cell: (cellProps) => {
          return <Salary {...cellProps} />;
        },
      },
      {
        Header: "Experiences",
        accessor: "yearsOfExperience",
        Cell: (cellProps) => {
          return <Experiences {...cellProps} />;
        },
      },
      {
        Header: "Blacklisted",
        accessor: "blacklisted",
        Cell: (cellProps) => {
          return cellProps.value ? "Yes" : "No";
        },
      },
      {
        Header: "Blacklist Count",
        accessor: "blacklistCount",
      },
      {
        Header: "Employment Status",
        accessor: "employmentStatus",
      },
      {
        Header: "Candidate Views",
        accessor: "candidateViews",
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
                to={`/job-details/${cellProps.row.original.id}`}
                className="text-info"
              >
                <i className="mdi mdi-eye font-size-18" id="viewtooltip" />
                <UncontrolledTooltip placement="top" target="viewtooltip">
                  View
                </UncontrolledTooltip>
              </Link>
              <Link
                to={`/job-details/${cellProps.row.original.id}`}
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

  const toggle = () => {
    setModal(!modal);
  };

  const handleUserClick = (arg) => {
    const user = arg;
    setContact({
      id: user.id,
      fullName: user.fullName,
      salaryRangeMin: user.salaryRangeMin,
      yearsOfExperience: user.yearsOfExperience,
      blacklisted: user.blacklisted,
      blacklistCount: user.blacklistCount,
      employmentStatus: user.employmentStatus,
      candidateViews: user.candidateViews,
    });
    setIsEdit(true);
    toggle();
  };

  const onClickDelete = (user) => {
    setContact(user);
    setDeleteModal(true);
  };

  const handleDeleteUser = async () => {
    if (contact.id) {
      try {
        await deleteCandidate(contact.id);
        setUserList((prevUserList) =>
          prevUserList.filter((user) => user.id !== contact.id)
        );
        setDeleteModal(false);
      } catch (error) {
        console.error("Error deleting candidate:", error);
      }
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Candidate" breadcrumbItem="Candidate List" />
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
              <div className="d-flex align-items-center">
                  <h4 className="card-title mb-4 flex-grow-1">Candidate List</h4>
                  <div className="flex-shrink-0">
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setIsEdit(false);
                          toggle();
                        }}
                      >
                        <i className="mdi mdi-plus-circle-outline me-1" />
                        Add New Candidate
                      </button>
                    </div>
                  </div>
                </div>

                  <TableContainer
                    columns={columns}
                    data={userList}
                    isGlobalFilter={true}
                    customPageSize={10}
                    className="custom-header-css"
                  />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} tag="h4">
          {isEdit ? "Edit Candidate" : "Add Candidate"}
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
              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Name</Label>
                  <Input
                    name="name"
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
                  <Label className="form-label">Salary</Label>
                  <Input
                    name="salary"
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
                  <Label className="form-label">Blacklisted</Label>
                  <Input
                    name="blacklisted"
                    type="checkbox"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    checked={validation.values.blacklisted}
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
                  <Label className="form-label">Blacklist Count</Label>
                  <Input
                    name="blacklistCount"
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
                  <Label className="form-label">Employment Status</Label>
                  <Input
                    name="employmentStatus"
                    type="select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.employmentStatus || ""}
                    invalid={
                      validation.touched.employmentStatus &&
                      validation.errors.employmentStatus
                        ? true
                        : false
                    }
                  >
                    {dummyEmploymentStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.employmentStatus &&
                  validation.errors.employmentStatus ? (
                    <FormFeedback type="invalid">
                      {validation.errors.employmentStatus}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Candidate Views</Label>
                  <Input
                    name="candidateViews"
                    type="number"
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
                  <button type="submit" className="btn btn-success save-user">
                    Save
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>

      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
    </div>
  );
};

export default withRouter(CandidatesList);

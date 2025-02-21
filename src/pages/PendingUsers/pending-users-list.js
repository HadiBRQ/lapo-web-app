import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";
import { isEmpty, map } from "lodash";
import {
  Badge,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledDropdown,
  Card,
  CardBody,
  Input,
} from "reactstrap";

// Import Components
import Breadcrumbs from "components/Common/Breadcrumb";
import ApproveModal from "./ApproveModal";
import DeclineModal from "./DeclineModal";

// Import API Helper
import getAllUsers from "common/realBackend/users/getAllUsers";
import updateUserAcceptanceStatus from "common/realBackend/users/updateUserAcceptanceStatus";

const ProjectStatus = ({ status }) => {
  switch (status) {
    case "pending":
      return <Badge className="bg-warning text-dark"> {status} </Badge>;

    case "declined":
      return <Badge className="bg-danger"> {status} </Badge>;

    case "approved":
      return <Badge className="bg-success"> {status} </Badge>;

    default:
      return <Badge className="bg-secondary"> {status} </Badge>;
  }
};

const PendingUsers = () => {
  // Meta title
  document.title = "Pending Users | LAPO Web App";

  const [users, setUsers] = useState([]);
  const [approveModal, setApproveModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [action, setAction] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        const usersArray = response.data?.users || []; // Safely access the users array
        
        // Filter users with pending or declined acceptance status
        const filteredUsers = usersArray.filter(
          (user) =>
            user.acceptanceStatus === "pending" ||
            user.acceptanceStatus === "declined"
        );
        
        console.log("Filtered Users: ", filteredUsers); // Log filtered users to verify
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  }, []);  

  const handleUserClick = (user, actionType) => {
    setSelectedUser(user);
    setAction(actionType);
    actionType === "approve" ? setApproveModal(true) : setDeclineModal(true);
  };

  const handleAction = async () => {
    if (selectedUser) {
      try {
        const newStatus = action === "approve" ? "approved" : "declined";
        const response = await updateUserAcceptanceStatus(selectedUser.id, newStatus);
  
        console.log(`User ${action}d successfully:`, response);
  
        // Optionally refetch users or update state
        const usersResponse = await getAllUsers();
        const filteredUsers = usersResponse.data.filter(
          (user) => user.acceptanceStatus === "pending" || user.acceptanceStatus === "declined"
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error(`Error updating user status to ${action}:`, error);
      }
    }
    setApproveModal(false);
    setDeclineModal(false);
  };  

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("Final Filtered Users for Display:", filteredUsers);

  return (
    <React.Fragment>
      <ApproveModal
        show={approveModal}
        onApproveClick={handleAction}
        onCloseClick={() => setApproveModal(false)}
      />
      <DeclineModal
        show={declineModal}
        onDeclineClick={handleAction}
        onCloseClick={() => setDeclineModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Pending Users List" breadcrumbItem="Pending Users List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ width: '300px' }}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <div>
                <div className="table-responsive">
                  <Table className="project-list-table table-nowrap align-middle table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">Name and Email</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Address</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {map(filteredUsers, (user, index) => (
                        <tr key={index}>
                          <td>
                            <h5 className="text-truncate font-size-14">
                              <Link
                                to="#"
                                className="text-dark"
                              >
                                {user.fullName}
                              </Link>
                            </h5>
                            <p className="text-muted mb-0">
                              {user.email}
                            </p>
                          </td>
                          <td>{user.phoneNumber}</td>
                          <td>{user.address}</td>
                          <td>
                            <ProjectStatus status={user.acceptanceStatus} />
                          </td>
                          <td>
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="card-drop"
                                tag="a"
                              >
                                <i className="mdi mdi-dots-horizontal font-size-18" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem
                                  onClick={() => handleUserClick(user, "approve")}
                                >
                                  <i className="mdi mdi-check font-size-16 text-success me-1" />{" "}
                                  Approve
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => handleUserClick(user, "decline")}
                                >
                                  <i className="mdi mdi-close font-size-16 text-danger me-1" />{" "}
                                  Decline
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(PendingUsers);

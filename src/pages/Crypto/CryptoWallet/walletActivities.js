import React, { useState, useEffect, useMemo } from "react";
import { Card, CardBody, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import TableContainer from "../../../components/Common/TableContainer";
import getAllAdmins from "common/realBackend/admin/getAllAdmin";
import CreateAdmin from "./CreateAdmin"; // Adjust the import path as needed

const WalletActivities = () => {
  const [activeTab, setActiveTab] = useState("settings");
  const [admins, setAdmins] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchUserRole = () => {

      //Uncomment the following code for production
      const authUser = JSON.parse(localStorage.getItem("authUser"));
      if (authUser && authUser.role) {
        setRole(authUser.role);
      }
    };

    const fetchAdmins = async () => {
      try {
        const adminData = await getAllAdmins();
        setAdmins(adminData.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchUserRole();
    fetchAdmins();
  }, []);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Profile Image",
        accessor: "profileImageUrl",
        filterable: false,
        Cell: (cellProps) => (
          <img
            src={cellProps.value}
            alt="Profile"
            style={{ width: "50px", borderRadius: "50%" }}
          />
        ),
      },
      {
        Header: "Full Name",
        accessor: "fullName",
        filterable: true,
        Cell: (cellProps) => cellProps.value,
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: true,
        Cell: (cellProps) => cellProps.value,
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
        filterable: true,
        Cell: (cellProps) => cellProps.value,
      },
      {
        Header: "Role",
        accessor: "role",
        filterable: true,
        Cell: (cellProps) => cellProps.value,
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        filterable: true,
        Cell: (cellProps) => new Date(cellProps.value).toLocaleDateString(),
      },
      {
        Header: "Email Verified",
        accessor: "emailVerified",
        filterable: true,
        Cell: (cellProps) => (cellProps.value ? "Verified" : "Not Verified"),
      },
      {
        Header: "Actions",
        accessor: "actions",
        filterable: false,
        Cell: (cellProps) => (
          <div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(cellProps.row.original)}
            >
              <i className="bx bxs-trash"></i> {/* Delete icon */}
              <span className="ms-2">Delete</span> {/* Button text */}
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const handleDelete = (row) => {
    // Handle delete action
    console.log("Delete: ", row);
  };

  const handleCreateAdmin = (newAdmin) => {
    // Handle create admin action
    console.log("Create Admin: ", newAdmin);
    // Optionally, you can add the new admin to the admins list
    setAdmins([...admins, newAdmin]);
  };

  return (
    <Card>
      <CardBody>
        <h4 className="card-title mb-4">Admin Panel</h4>
        <ul className="nav nav-tabs nav-tabs-custom">
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "settings",
              })}
              onClick={() => toggleTab("settings")}
            >
              Settings
            </NavLink>
          </NavItem>
          {role === "super_admin" && (
            <>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "all",
                  })}
                  onClick={() => toggleTab("all")}
                >
                  All Admins
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "create",
                  })}
                  onClick={() => toggleTab("create")}
                >
                  Create Admin
                </NavLink>
              </NavItem>
            </>
          )}
        </ul>
        <div className="mt-4">
          {activeTab === "all" && role === "super_admin" && (
            <TableContainer
              columns={columns}
              data={admins}
              isGlobalFilter={true}
              customPageSize={10}
            />
          )}
          {activeTab === "create" && role === "super_admin" && (
            <CreateAdmin onCreate={handleCreateAdmin} />
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default WalletActivities;

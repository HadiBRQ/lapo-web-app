import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import classnames from "classnames";

// SimpleBar
import SimpleBar from "simplebar-react";

// Import the getAllBlogs function
import getAllBlogs from "common/realBackend/blog/getAllBlogs";

const Posts = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs when the component mounts
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs();
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error('Error fetching all blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <React.Fragment>
      <Col xl={4} lg={6}>
        <Card>
          <CardHeader className="bg-transparent border-bottom">
            <div className="d-flex flex-wrap">
              <div className="me-2">
                <h5 className="card-title mt-1 mb-0">Posts</h5>
              </div>
              <ul className="nav nav-tabs nav-tabs-custom card-header-tabs ms-auto" role="tablist">
                <NavItem>
                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => { toggle("1"); }}
                  >
                    Recent
                  </NavLink>
                </NavItem>
              </ul>
            </div>
          </CardHeader>

          <CardBody>
            <SimpleBar style={{ maxHeight: "295px" }}>
              <div>
                <TabContent activeTab={activeTab}>
                  <TabPane className="show" tabId="1">
                    <ul className="list-group list-group-flush">
                      {blogs.map(blog => (
                        <li key={blog.id} className="list-group-item py-3">
                          <div className="d-flex">
                            <div className="me-3">
                              <img
                                src={blog.backgroundImage}
                                alt=""
                                className="avatar-md h-auto d-block rounded"
                              />
                            </div>
                            <div className="align-self-center overflow-hidden me-auto">
                              <div>
                                <h5 className="font-size-14 text-truncate">
                                  <Link to="#" className="text-dark">
                                    {blog.title}
                                  </Link>
                                </h5>
                                <p className="text-muted mb-0">{new Date(blog.createdAt).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <UncontrolledDropdown className="ms-2">
                              <DropdownToggle
                                tag="a"
                                className="text-muted font-size-14"
                                color="white"
                                type="button"
                              >
                                <i className="mdi mdi-dots-horizontal"></i>
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-end">
                                <Link className="dropdown-item" to="#">
                                  Action
                                </Link>
                                <Link className="dropdown-item" to="#">
                                  Another action
                                </Link>
                                <Link className="dropdown-item" to="#">
                                  Something else
                                </Link>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </TabPane>
                </TabContent>
              </div>
            </SimpleBar>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
}

export default Posts;

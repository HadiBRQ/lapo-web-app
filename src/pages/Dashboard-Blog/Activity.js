import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, UncontrolledDropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import SimpleBar from "simplebar-react";
import getAllBlogs from "common/realBackend/blog/getAllBlogs";

const Activity = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
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

  return (
    <React.Fragment>
      <Col xl={4}>
        <Card>
          <CardBody>
            <div className="d-flex align-items-start">
              <div className="me-2">
                <h5 className="card-title mb-4">Activity</h5>
              </div>
              <UncontrolledDropdown className="ms-auto">
                <DropdownToggle className="text-muted font-size-16" tag="a" color="white" type="button">
                  <i className="mdi mdi-dots-horizontal"></i>
                </DropdownToggle>
                <DropdownMenu direction="right">
                  <Link className="dropdown-item" to="#">
                    Action
                  </Link>
                  <Link className="dropdown-item" to="#">
                    Another action
                  </Link>
                  <Link className="dropdown-item" to="#">
                    Something else
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="#">
                    Separated link
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <SimpleBar className="mt-2" style={{ maxHeight: "280px" }}>
              <ul className="verti-timeline list-unstyled">
                {blogs.map(blog => (
                  <li className="event-list" key={blog.id}>
                    <div className="event-timeline-dot">
                      <i className="bx bxs-right-arrow-circle font-size-18 bx-fade-right"></i>
                    </div>
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <h5 className="font-size-14">{new Date(blog.createdAt).toLocaleDateString()} <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i></h5>
                      </div>
                      <div className="flex-grow-1">
                        <div>
                          {blog.title}... <Link to="#">View</Link>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </SimpleBar>

          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Activity;

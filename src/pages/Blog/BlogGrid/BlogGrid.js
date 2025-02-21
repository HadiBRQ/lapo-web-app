import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import getAllBlogs from "common/realBackend/blog/getAllBlogs";

const BlogGrid = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs();
        if (response.status === "success") {
          setBlogs(response.data.blogs);
          setFilteredBlogs(response.data.blogs); // Initialize filtered blogs
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    let filtered = blogs;
    if (searchQuery) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedYear) {
      filtered = filtered.filter(blog =>
        new Date(blog.createdAt).getFullYear().toString() === selectedYear
      );
    }
    setFilteredBlogs(filtered);
  }, [searchQuery, selectedYear, blogs]);

  return (
    <React.Fragment>
      <Col xl={9} lg={8}>
        <Card>
          <div className="p-4">
            <Row className="justify-content-center">
              <Col xl={8}>
                <div>
                  <div className="row align-items-center">
                    <div className="col-4">
                      <h5 className="mb-0">Blog Grid</h5>
                    </div>
                    <Col xs={8}>
                      <div className="float-end">
                        <div className="search-box mb-4">
                          <input
                            type="text"
                            className="form-control rounded bg-light border-light"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <i className="mdi mdi-magnify search-icon"></i>
                        </div>
                      </div>
                    </Col>
                  </div>
                  <hr className="mb-4" />
                  <div>
                    <ul className="list-unstyled fw-medium">
                      {[...new Set(blogs.map(blog => new Date(blog.createdAt).getFullYear()))].map(year => (
                        <li key={year}>
                          <Link
                            to="#"
                            className={`text-muted py-2 d-block ${selectedYear === year ? 'active' : ''}`}
                            onClick={() => setSelectedYear(year === selectedYear ? "" : year)}
                          >
                            <i className="mdi mdi-chevron-right me-1"></i> {year}
                            <span className="badge badge-soft-success rounded-pill float-end ms-1 font-size-12">
                              {blogs.filter(blog => new Date(blog.createdAt).getFullYear().toString() === year).length}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Row>
                    {filteredBlogs.map((blog) => (
                      <Col sm={6} key={blog.id}>
                        <Card className="p-1 border shadow-none">
                          <div className="p-3">
                            <h5>
                              <Link to={`/blog-details/${blog.id}`} className="text-dark">
                                {blog.title}
                              </Link>
                            </h5>
                            <p className="text-muted mb-0">{new Date(blog.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="position-relative">
                            <img
                              src={blog.backgroundImage}
                              alt={blog.title}
                              className="img-thumbnail"
                            />
                          </div>
                          <div className="p-3">
                            <ul className="list-inline">
                              <li className="list-inline-item me-3">
                                <Link to="#" className="text-muted">
                                  <i className="bx bx-purchase-tag-alt align-middle text-muted me-1"></i>{" "}
                                  {blog.category || "Uncategorized"}
                                </Link>
                              </li>
                              <li className="list-inline-item me-3">
                                <Link to="#" className="text-muted">
                                  <i className="bx bx-comment-dots align-middle text-muted me-1"></i>{" "}
                                  {blog.commentsCount || "0 Comments"}
                                </Link>
                              </li>
                            </ul>
                            <p>{blog.content.substring(0, 100)}...</p>
                            <div>
                              <Link to={`/blog-details/${blog.id}`} className="text-primary">
                                Read more <i className="mdi mdi-arrow-right"></i>
                              </Link>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <hr className="my-4" />
                  <div className="text-center">
                    <ul className="pagination justify-content-center pagination-rounded">
                      <li className="page-item disabled">
                        <Link to="#" className="page-link">
                          <i className="mdi mdi-chevron-left"></i>
                        </Link>
                      </li>
                      <li className="page-item"><Link to="#" className="page-link">1</Link></li>
                      <li className="page-item active"><Link to="#" className="page-link">2</Link></li>
                      <li className="page-item"><Link to="#" className="page-link">3</Link></li>
                      <li className="page-item"><Link to="#" className="page-link">...</Link></li>
                      <li className="page-item"><Link to="#" className="page-link">10</Link></li>
                      <li className="page-item">
                        <Link to="#" className="page-link">
                          <i className="mdi mdi-chevron-right"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default BlogGrid;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Card,
  CardBody,
  Col,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import getBlogById from "common/realBackend/blog/getBlogById"; 

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// import images
import img1 from "../../assets/images/small/img-2.jpg";
import avtar1 from "../../assets/images/users/avatar-2.jpg";

const BlogDetails = () => {
  // Meta title
  document.title = "Blog Details | LAPO Web App";

  // State to hold blog data
  const [blog, setBlog] = useState(null);

  // Get blog ID from URL params
  const { id } = useParams();

  // Fetch blog data from API
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data.data.blog);
      } catch (error) {
        console.error(`Error fetching blog with ID ${id}:`, error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Blog" breadcrumbItem="Blog Details" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="pt-3">
                    <div className="row justify-content-center">
                      <div className="col-xl-8">
                        <div>
                          <div className="text-center">

                            <h4>{blog.title}</h4>
                            <p className="text-muted mb-4">
                              <i className="mdi mdi-calendar me-1"></i> {new Date(blog.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <hr />

                          <div className="my-5">
                            <img
                              src={blog.backgroundImage || img1}
                              alt="Blog"
                              className="img-thumbnail mx-auto d-block"
                            />
                          </div>

                          <hr />

                          <div className="mt-4">
                            <div className="text-muted font-size-14">
                              <p>{blog.content}</p>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BlogDetails;

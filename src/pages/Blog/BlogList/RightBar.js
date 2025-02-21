import React from "react";
import { Card, CardBody, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";

// import images
import img1 from "../../../assets/images/small/img-7.jpg";
import img2 from "../../../assets/images/small/img-4.jpg";
import img3 from "../../../assets/images/small/img-6.jpg";

const RightBar = () => {
  return (
    <React.Fragment>
      <Col xl={3} lg={4}>
        <Card>
          <CardBody className="p-4">
            <div className="d-flex justify-content-between mb-4">
              <Button color="primary" tag={Link} to="/create-blog">
                Create Blog
              </Button>
            </div>

            <hr className="my-4" />
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
}

export default RightBar;

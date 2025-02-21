import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import { useSelector, useDispatch } from 'react-redux';
import { dashboardBlogVisitorData } from '../../store/actions';
import getAllBlogs from "common/realBackend/blog/getAllBlogs";

const CardUser = ({ dataColors }) => {
  const apexCardUserChartColors = getChartColorsArray(dataColors);
  const [duration, setDuration] = useState("year");
  const [totalPosts, setTotalPosts] = useState(0); // State to store total posts
  const dispatch = useDispatch();

  const visitorDurationData = (duration) => {
    setDuration(duration);
    dispatch(dashboardBlogVisitorData(duration));
  };

  useEffect(() => {
    dispatch(dashboardBlogVisitorData("year"));

    // Fetch all blogs and calculate total posts
    const fetchTotalPosts = async () => {
      try {
        const response = await getAllBlogs();
        const blogs = response.data.blogs;
        setTotalPosts(blogs.length); // Assuming data.blogs is an array of blogs
      } catch (error) {
        console.error('Error fetching total posts:', error);
      }
    };

    fetchTotalPosts();
  }, [dispatch]);

  const { visitor } = useSelector(state => ({
    visitor: state.DashboardBlog.visitor
  }));

  // Set the visitor data to 0
  const series = [
    {
      name: "Current",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "Previous",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    colors: apexCardUserChartColors,
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
    xaxis: {
      categories: (visitor.categories || []),
    },
    markers: {
      size: 3,
      strokeWidth: 3,
      hover: {
        size: 4,
        sizeOffset: 2,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
  };

  return (
    <React.Fragment>
      <Col xl={8}>
        <Row>
          <Col lg={4}>
            <Card className="mini-stats-wid">
              <CardBody>
                <div className="d-flex flex-wrap">
                  <div className="me-3">
                    <p className="text-muted mb-2">Total Post</p>
                    <h5 className="mb-0">{totalPosts}</h5>
                  </div>

                  <div className="avatar-sm ms-auto">
                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                      <i className="bx bxs-book-bookmark"></i>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="blog-stats-wid">
              <CardBody>
                <div className="d-flex flex-wrap">
                  <div className="me-3">
                    <p className="text-muted mb-2">Comments</p>
                    <h5 className="mb-0">0</h5>
                  </div>

                  <div className="avatar-sm ms-auto">
                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                      <i className="bx bxs-message-square-dots"></i>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Card>
          <CardBody>
            <div className="d-flex flex-wrap">
              <h5 className="card-title me-2">Visitors</h5>
              <div className="ms-auto">
                <div className="toolbar d-flex flex-wrap gap-2 text-end">
                  <button type="button" className="btn btn-light btn-sm" onClick={() => visitorDurationData('all')}>
                    ALL
                  </button>{" "}
                  <button type="button" className="btn btn-light btn-sm" onClick={() => visitorDurationData('onemonth')}>
                    1M
                  </button>{" "}
                  <button type="button" className="btn btn-light btn-sm" onClick={() => visitorDurationData('sixmonth')}>
                    6M
                  </button>{" "}
                  <button type="button" className="btn btn-light btn-sm active" onClick={() => visitorDurationData('year')}>
                    1Y
                  </button>{" "}
                </div>
              </div>
            </div>

            <Row className="text-center">
              <Col lg={4}>
                <div className="mt-4">
                  <p className="text-muted mb-1">Today</p>
                  <h5>0</h5>
                </div>
              </Col>

              <Col lg={4}>
                <div className="mt-4">
                  <p className="text-muted mb-1">This Month</p>
                  <h5>
                    0{" "}
                    <span className="text-success font-size-13">
                      0 % <i className="mdi mdi-arrow-up ms-1"></i>
                    </span>
                  </h5>
                </div>
              </Col>

              <Col lg={4}>
                <div className="mt-4">
                  <p className="text-muted mb-1">This Year</p>
                  <h5>
                    0{" "}
                    <span className="text-success font-size-13">
                      0 % <i className="mdi mdi-arrow-up ms-1"></i>
                    </span>
                  </h5>
                </div>
              </Col>
            </Row>

            <hr className="mb-4" />
            <div id="area-chart" dir="ltr">
              <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={350}
                className="apex-charts"
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

CardUser.propTypes = {
  dataColors: PropTypes.array.isRequired
};

export default CardUser;

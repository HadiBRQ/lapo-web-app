import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

// import images
import jobs from "../../assets/images/jobs.png";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from "swiper";
import "../../../node_modules/swiper/swiper.scss";

const CandidateSection = () => {
    return (
        <React.Fragment>
            <Col lg={4}>
                <Card>
                    <CardBody>
                        <h4 className="card-title mb-3">Popular Candidates</h4>
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={50}
                            slidesPerView={1}
                            navigation
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                        >
                            <div className="carousel-inner">

                                <SwiperSlide>
                                    <div className="carousel-item active" data-bs-interval="3000">
                                        <div className="bg-light p-3 d-flex mb-3 rounded">
                                            <img src={avatar4} alt="" className="avatar-sm rounded me-3" />
                                            <div className="flex-grow-1">
                                                <h5 className="font-size-15 mb-2">
                                                    <a href="candidate-overview" className="text-body">Chinonso Okeke</a> 
                                                    <span className="badge badge-soft-info">Freelance</span>
                                                </h5>
                                                <p className="mb-0 text-muted">
                                                    <i className="bx bx-map text-body align-middle"></i> Lagos, Nigeria
                                                </p>
                                            </div>
                                            <div>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle className="btn btn-soft-primary" type="button" id="dropdownMenuButton11">
                                                        <i className='bx bx-dots-vertical-rounded'></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu aria-labelledby="dropdownMenuButton11">
                                                        <li><DropdownItem href="candidate-overview">View Details</DropdownItem></li>
                                                        <li><DropdownItem href="#">Download CV</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                        <div className="bg-light p-3 d-flex">
                                            <img src={avatar2} alt="" className="avatar-sm rounded me-3" />
                                            <div className="flex-grow-1">
                                                <h5 className="font-size-15 mb-2">
                                                    <a href="candidate-overview" className="text-body">Adewale Akinyemi</a> 
                                                    <span className="badge badge-soft-success">Full Time</span>
                                                </h5>
                                                <p className="mb-0 text-muted">
                                                    <i className="bx bx-map text-body align-middle"></i> Abuja, Nigeria
                                                </p>
                                            </div>
                                            <div>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle className="btn btn-soft-primary" type="button" id="dropdownMenuButton11">
                                                        <i className='bx bx-dots-vertical-rounded'></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu aria-labelledby="dropdownMenuButton11">
                                                        <li><DropdownItem href="candidate-overview">View Details</DropdownItem></li>
                                                        <li><DropdownItem href="#">Download CV</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="carousel-item active" data-bs-interval="3000">
                                        <div className="bg-light p-3 d-flex mb-3 rounded">
                                            <img src={avatar1} alt="" className="avatar-sm rounded me-3" />
                                            <div className="flex-grow-1">
                                                <h5 className="font-size-15 mb-2">
                                                    <a href="candidate-overview" className="text-body">Ngozi Eze</a> 
                                                    <span className="badge badge-soft-warning">Internship</span>
                                                </h5>
                                                <p className="mb-0 text-muted">
                                                    <i className="bx bx-map text-body align-middle"></i> Enugu, Nigeria
                                                </p>
                                            </div>
                                            <div>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle className="btn btn-soft-primary" type="button" id="dropdownMenuButton11">
                                                        <i className='bx bx-dots-vertical-rounded'></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu aria-labelledby="dropdownMenuButton11">
                                                        <li><DropdownItem href="candidate-overview">View Details</DropdownItem></li>
                                                        <li><DropdownItem href="#">Download CV</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                        <div className="bg-light p-3 d-flex">
                                            <img src={avatar3} alt="" className="avatar-sm rounded me-3" />
                                            <div className="flex-grow-1">
                                                <h5 className="font-size-15 mb-2">
                                                    <a href="candidate-overview" className="text-body">Tunde Balogun</a> 
                                                    <span className="badge badge-soft-info">Freelance</span>
                                                </h5>
                                                <p className="mb-0 text-muted">
                                                    <i className="bx bx-map text-body align-middle"></i> Ibadan, Nigeria
                                                </p>
                                            </div>
                                            <div>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle className="btn btn-soft-primary" type="button" id="dropdownMenuButton11">
                                                        <i className='bx bx-dots-vertical-rounded'></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu aria-labelledby="dropdownMenuButton11">
                                                        <li><DropdownItem href="candidate-overview">View Details</DropdownItem></li>
                                                        <li><DropdownItem href="#">Download CV</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="carousel-item active" data-bs-interval="3000">
                                        <div className="bg-light p-3 d-flex mb-3 rounded">
                                            <img src={avatar4} alt="" className="avatar-sm rounded me-3" />
                                            <div className="flex-grow-1">
                                                <h5 className="font-size-15 mb-2">
                                                    <a href="candidate-overview" className="text-body">Folake Afolabi</a> 
                                                    <span className="badge badge-soft-success">Full Time</span>
                                                </h5>
                                                <p className="mb-0 text-muted">
                                                    <i className="bx bx-map text-body align-middle"></i> Lagos, Nigeria
                                                </p>
                                            </div>
                                            <div>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle className="btn btn-soft-primary" type="button" id="dropdownMenuButton11">
                                                        <i className='bx bx-dots-vertical-rounded'></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu aria-labelledby="dropdownMenuButton11">
                                                        <li><DropdownItem href="candidate-overview">View Details</DropdownItem></li>
                                                        <li><DropdownItem href="#">Download CV</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                        <div className="bg-light p-3 d-flex">
                                            <img src={avatar2} alt="" className="avatar-sm rounded me-3" />
                                            <div className="flex-grow-1">
                                                <h5 className="font-size-15 mb-2">
                                                    <a href="candidate-overview" className="text-body">Chuka Ibe</a> 
                                                    <span className="badge badge-soft-danger">Part Time</span>
                                                </h5>
                                                <p className="mb-0 text-muted">
                                                    <i className="bx bx-map text-body align-middle"></i> Port Harcourt, Nigeria
                                                </p>
                                            </div>
                                            <div>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle className="btn btn-soft-primary" type="button" id="dropdownMenuButton11">
                                                        <i className='bx bx-dots-vertical-rounded'></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu aria-labelledby="dropdownMenuButton11">
                                                        <li><DropdownItem href="candidate-overview">View Details</DropdownItem></li>
                                                        <li><DropdownItem href="#">Download CV</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </div>
                        </Swiper>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
}

export default CandidateSection;

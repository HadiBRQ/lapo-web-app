import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

// Default avatar image
import avatar2  from '../../assets/images/users/avatar-3.jpg';

const Section = () => {
    // Retrieve authUser from localStorage and parse it
    const authUserString = localStorage.getItem('authUser');
    let authUser;

    try {
        authUser = authUserString ? JSON.parse(authUserString) : null;
    } catch (error) {
        console.error("Error parsing authUser from localStorage:", error);
        authUser = null;
    }

    // Extract fullName and profileImageUrl, fallback to default values if necessary
    const fullName = authUser && authUser.data && authUser.data.fullName ? authUser.data.fullName : "Default Name";
    const profileImageUrl = authUser && authUser.data && authUser.data.profileImageUrl ? authUser.data.profileImageUrl : avatar2;

    return (
        <React.Fragment>
            <Row className="mb-4">
                <Col lg={12}>
                    <div className="d-flex align-items-center">
                        {/* Use dynamic profileImageUrl */}
                        <img src={profileImageUrl} alt="" className="avatar-sm rounded" />
                        <div className="ms-3 flex-grow-1">
                            {/* Display dynamic fullName */}
                            <h5 className="mb-2 card-title">Hello, {fullName}</h5>
                            <p className="text-muted mb-0">Ready to jump back in?</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default Section;

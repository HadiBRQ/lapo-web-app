import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

// Default avatar image
import avatar2  from '../../assets/images/users/avatar-3.jpg';

//Custom Images
import calenderLogo from "../../assets/icons/calendar.png"


const Section = () => {

    return (
        <React.Fragment>
            <Row className="mb-4">
                <Col lg="12">
                    <div className="d-flex align-items-center">
                        <div>
                            {/* Display fullName details */}
                            <h2 className="mb-2 card-title fs-4">Card Profile</h2>
                            <p className="text-muted mb-0">Create, view and edit card profiles here.</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default Section;

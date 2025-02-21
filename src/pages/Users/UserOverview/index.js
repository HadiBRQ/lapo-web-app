import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import AboutUs1 from './AboutUs';
import Sidebar1 from './Sidebar';
import getUser from 'common/realBackend/users/getUser';
import { useLocation } from "react-router-dom";

const CandidateOverview1 = () => {
    document.title = "Candidate Overview | LAPO Web App";

    const { id } = useParams(); // Extract user ID from URL
    const [userData, setUserData] = useState(null);
    const location = useLocation();
    console.log("Location", location);
  const { state } = location;

  const candidateCount = state?.candidateCount || 0;
  const candidates = state?.candidates || [];

    useEffect(() => {
        console.log("UserOverview - Candidate Count:", candidateCount);
        console.log("UserOverview - Candidates Data:", candidates);
    }, [candidateCount, candidates]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUser(id); // Use ID from URL
                setUserData(data.data); // Access the nested `data` property
                console.log("User data:", data.data); // Log the user data
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [id]);

    if (!userData) {
        return <div>Loading...</div>; // Add a loading state or spinner as needed
    }

    const { fullName, address, isSubscribed, profileImageUrl } = userData;

    // Default to fallback avatar if profileImageUrl is not available
    const getFallbackAvatar = () => {
        if (!fullName) return '';
        const firstLetter = fullName.charAt(0).toUpperCase();
        return `https://via.placeholder.com/150?text=${firstLetter}`;
    };

    // Handle cases where profileImageUrl is not available
    const avatarSrc = profileImageUrl ? profileImageUrl : getFallbackAvatar();

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card className="mx-n4 mt-n4 bg-info bg-soft">
                                <CardBody>
                                    <div className="text-center mb-4">
                                        <img
                                            src={avatarSrc}
                                            alt="User Avatar"
                                            className="avatar-md rounded-circle mx-auto d-block"
                                        />
                                        <h5 className="mt-3 mb-1">{fullName}</h5>
                                        <i className="bx bx-map align-middle"></i> {address}
                                        <p className="text-muted mb-3">
                                            <span className={`badge me-1 ${isSubscribed === true ? 'text-bg-success' : 'text-bg-secondary'}`}>
                                                {isSubscribed === true ? 'Subscribed' : 'Not Subscribed'}
                                            </span>
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Sidebar1 userData={userData} />
                        <AboutUs1 candidateCount={candidateCount} candidates={candidates}/>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default CandidateOverview1;

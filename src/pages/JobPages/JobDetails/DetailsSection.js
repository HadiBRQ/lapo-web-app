import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardBody, Col, Row } from 'reactstrap';

// Import images
import wechat from "../../../assets/images/companies/wechat.svg";
import avatar6 from "../../../assets/images/users/avatar-6.jpg"

import getCandidateDetails from "../../../common/realBackend/candidates/getCandidateDetails";
import getAllUserBlacklistedCandidates from "../../../common/realBackend/blacklist/getAllUserBlacklistedCandidates";

const DetailsSection = () => {
    const { id } = useParams();
    const [candidateDetails, setCandidateDetails] = useState({});
    const [blacklistedCandidates, setBlacklistedCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCandidateDetails = async () => {
            try {
                console.log(`Fetching details for candidate ID: ${id}`);
                const response = await getCandidateDetails(id);
                console.log('Candidate details fetched:', response);
                setCandidateDetails(response.data.candidate);
            } catch (error) {
                console.error('Error fetching candidate details:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchBlacklistedCandidates = async () => {
            try {
                const response = await getAllUserBlacklistedCandidates();
                console.log('Blacklisted candidates fetched:', response);
                setBlacklistedCandidates(response.data.candidates);
            } catch (error) {
                console.error('Error fetching blacklisted candidates:', error);
                setError(error);
            }
        };

        fetchCandidateDetails();
        fetchBlacklistedCandidates();
    }, [id]);

    const activeBtn = (ele) => {
        if (ele.closest("button").classList.contains("active")) {
            ele.closest("button").classList.remove("active");
        } else {
            ele.closest("button").classList.add("active");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading candidate details. Please try again later.</div>;
    }

    const {
        fullName,
        about,
        profileImage,
        location,
        experience,
        skills,
        education,
        yearsOfExperience,
        salaryRangeMin,
        salaryRangeMax,
        languagesSpoken
    } = candidateDetails;

    return (
        <React.Fragment>
            <Col xl={9}>
                <Card>
                    <CardBody className="border-bottom">
                        <div className="d-flex">
                            <img src={profileImage || avatar6} alt="" height="50" />
                            <div className="flex-grow-1 ms-3">
                                <h5 className="fw-semibold">{fullName || "Jadeed Balogun"}</h5>
                                <ul className="list-unstyled hstack gap-2 mb-0">
                                    <li>
                                        <i className="bx bx-map"></i> <span className="text-muted">{location || "Lagos State"}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </CardBody>
                    <CardBody>
                        <h5 className="fw-semibold mb-3">Description</h5>
                        <p className="text-muted">{about || "We are looking for a dependable driver to ensure safe and timely transportation for our clients and staff. You will operate various vehicles, perform routine maintenance, and adhere to traffic regulations."}</p>

                        <h5 className="fw-semibold mb-3">Responsibilities:</h5>
                        <ul className="vstack gap-3">
                            {experience ? experience.map((exp, index) => (
                                <li key={index}>
                                    <strong>{exp.jobTitle}</strong> at {exp.company} ({exp.startYear} - {exp.endYear})
                                </li>
                            )) : (
                                <>
                                    <li>Candidate Responsibilities was not inputed.</li>

                                </>
                            )}
                        </ul>

                        <h5 className="fw-semibold mb-3">Skills:</h5>
                        <ul className="list-unstyled">
                            {skills ? skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            )) : (
                                <>
                                    <li>Candidate skills was not Specified</li>

                                </>
                            )}
                        </ul>

                        <h5 className="fw-semibold mb-3">Education:</h5>
                        <ul className="list-unstyled">
                            {education ? education.map((edu, index) => (
                                <li key={index}>
                                    <strong>{edu.degree}</strong> from {edu.institution} ({edu.startYear} - {edu.endYear})
                                </li>
                            )) : (
                                <>
                                    <li>Candidate Education was not Specified</li>


                                </>
                            )}
                        </ul>
                    </CardBody>
                </Card>
            </Col>
            <Row>
                <h2 className='text-center'>Blacklisted Users</h2>
                {(blacklistedCandidates || []).map((candidate, key) => (
                    <Col xl={3} key={key}>
                        <Card>
                            <CardBody>
                                <div className="text-center mb-3">
                                    <img src={candidate.profileImage || avatar6} alt="" className="avatar-sm rounded-circle" />
                                    <h6 className="font-size-15 mt-3 mb-1">{candidate.fullName}</h6>
                                    <p className="mb-0 text-muted">Location: {candidate.location}</p>
                                    <p className="mb-0 text-muted">blacklisted candidate:- {candidate.blacklistCount}</p>
                                </div>
                                <div className="mt-4 pt-1">
                                    <Link to={`/job-details/${candidate.id}`} className="btn btn-soft-primary d-block">View Profile</Link>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </React.Fragment>
    );
};

export default DetailsSection;





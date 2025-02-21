import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';
import getCandidateDetails from "../../../common/realBackend/candidates/getCandidateDetails";




const Overview = () => {
    const { id } = useParams();
    const [candidateDetails, setCandidateDetails] = useState({});
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

        fetchCandidateDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading candidate details. Please try again later.</div>;
    }

    const {
        fullName,
        about,
        education,
        experience,
        languagesSpoken,
        location,
        phone,
        salaryRangeMin,
        salaryRangeMax,
        skills,
        yearsOfExperience
    } = candidateDetails;

    return (
        <React.Fragment>
            <Col xl={3}>
                <Card>
                    <CardBody>
                        <h5 className="fw-semibold">Details</h5>
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th scope="row">Experience:</th>
                                        <td>{yearsOfExperience || 'Not Specified'}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Offered Salary</th>
                                        <td>{salaryRangeMin && salaryRangeMax ? `₦${salaryRangeMin} - ₦${salaryRangeMax}` : 'Not Specified'}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Languages:</th>
                                        <td>{languagesSpoken ? languagesSpoken.join(', ') : 'Not Specified'}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">skill:</th>
                                        <td>{skills ? skills.join(', ') : 'Not Specified'}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Mobile:</th>
                                        <td>{phone || 'Not Specified'}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Address</th>
                                        <td>{location || 'Not Specified'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="hstack gap-2">
                            <button className="btn btn-soft-primary w-100">Download CV</button>
                        </div>
                    </CardBody>
                </Card>
                <Card>
                </Card>
            </Col>
        </React.Fragment>
    );
}

export default Overview;




import React from 'react';
import { Container, Row } from 'reactstrap';

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import Overview from './Overview';
import DetailsSection from './DetailsSection';

const JobDetails = () => {
    document.title = "Candidate Details ";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Candidate" breadcrumbItem="Candidate Details" />

                    <Row>
                        <Overview />
                        <DetailsSection />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default JobDetails;
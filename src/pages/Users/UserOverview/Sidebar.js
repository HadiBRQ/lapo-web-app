import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';

const Sidebar1 = ({ userData }) => {
  const {
    phoneNumber,
    email,
    accountId,
    isSubscribed,
    subscriptionPlan,
    role,
  } = userData;

  const statusBadge = userData.acceptanceStatus === 'approved' ? 
    'text-bg-success' : 
    (userData.acceptanceStatus === null ? 'text-bg-warning' : 'text-bg-warning');
  const statusText = userData.acceptanceStatus === 'approved' ? 
    'Approved' : 
    (userData.acceptanceStatus === null ? 'Pending' : 'Unknown')

  return (
    <Col lg={3}>
      <Card>
        <CardBody>
          <ul className="list-unstyled vstack gap-3 mb-0">
            <li>
              <div className="d-flex">
                <i className='bx bx-money font-size-18 text-primary'></i>
                <div className="ms-3">
                  <h6 className="mb-1 fw-semibold">Status:</h6>
                  <div className="mx-auto">
                        <span className={`badge me-1 ${statusBadge}`}>
                                {statusText}
                      </span>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="d-flex">
                <i className='bx bx-calendar font-size-18 text-primary'></i>
                <div className="ms-3">
                  <h6 className="mb-1 fw-semibold">Phone Number:</h6>
                  <span className="text-muted">{phoneNumber}</span>
                </div>
              </div>
            </li>
            <li>
              <div className="d-flex">
                <i className='bx bx-envelope font-size-18 text-primary'></i>
                <div className="ms-3">
                  <h6 className="mb-1 fw-semibold">Email Address:</h6>
                  <span className="text-muted">{email}</span>
                </div>
              </div>
            </li>
            <li>
              <div className="d-flex">
                <i className='bx bx-user font-size-18 text-primary'></i>
                <div className="ms-3">
                  <h6 className="mb-1 fw-semibold">Role:</h6>
                  <span className="text-muted">{role}</span>
                </div>
              </div>
            </li>
            <li>
              <div className="d-flex">
                <i className='bx bx-money font-size-18 text-primary'></i>
                <div className="ms-3">
                  <h6 className="mb-1 fw-semibold">Account ID:</h6>
                  <span className="text-muted">{accountId}</span>
                </div>
              </div>
            </li>
            {isSubscribed && subscriptionPlan && (
              <>
                <li>
                  <div className="d-flex">
                    <i className='bx bx-calendar font-size-18 text-primary'></i>
                    <div className="ms-3">
                      <h6 className="mb-1 fw-semibold">Current Subscription Plan:</h6>
                      <span className="text-muted">{subscriptionPlan.name}</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex">
                    <i className='bx bx-check font-size-18 text-primary'></i>
                    <div className="ms-3">
                      <h6 className="mb-1 fw-semibold">Subscription Features:</h6>
                      <div className="mx-auto">
                        {subscriptionPlan.features.map((feature, index) => (
                          <span key={index} className="badge me-1 text-bg-info">{feature}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              </>
            )}
            {/* <li>
              <div className="d-flex">
                <i className='bx bx-user font-size-18 text-primary'></i>
                <div className="ms-3">
                  <h6 className="mb-1 fw-semibold">Gender:</h6>
                  <span className="text-muted">Male</span>
                </div>
              </div>
            </li>
            <li>
              <div className="d-flex">
                <i className='bx bx-translate font-size-18 text-primary'></i>
                <div className="ms-3">
                  <h6 className="mb-1 fw-semibold">Languages:</h6>
                  <span className="text-muted">English, French</span>
                </div>
              </div>
            </li> */}
          </ul>
        </CardBody>
      </Card>
    </Col>
  );
}

export default Sidebar1;

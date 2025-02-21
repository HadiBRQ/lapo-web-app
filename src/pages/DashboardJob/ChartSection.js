import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';

// Import components
import { JobWidgetCharts } from './JobCharts';

const ChartSection = ({ chartsData }) => {
    return (
        <React.Fragment>
            <Row>
                {(chartsData || []).map((item, key) => {
                    // Extract percentage value and trend direction
                    const percentageChange = parseFloat(item.percentageValue.percentageChange);
                    const isTrendingUp = percentageChange >= 0;
                    const trendIcon = isTrendingUp ? "bx-trending-up" : "bx-trending-down";
                    const trendText = isTrendingUp ? "Increase last month" : "Decrease last month";
                    const badgeColor = isTrendingUp ? "success" : "danger"; // Color based on trend

                    return (
                        <Col lg={3} key={key}>
                            <Card className="mini-stats-wid">
                                <CardBody>
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-medium">{item.title}</p>
                                            <h4 className="mb-0">{item.price}</h4>
                                        </div>

                                        <div className="flex-shrink-0 align-self-center">
                                            <JobWidgetCharts dataColors={item.color} series={item.seriesData} dir="ltr" />
                                        </div>
                                    </div>
                                </CardBody>
                                <div className="card-body border-top py-3">
                                    <p className="mb-0">
                                        <span className={"badge badge-soft-" + badgeColor + " me-2"}>
                                            <i className={`bx ${trendIcon} align-bottom me-1`}></i> {Math.abs(percentageChange).toFixed(2)}%
                                        </span>
                                        {trendText}
                                    </p>
                                </div>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </React.Fragment>
    );
}

export default ChartSection;

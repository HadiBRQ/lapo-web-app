import React, {useState, useEffect} from "react"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import ActivityFeed from "./ActivityFeed"
import AddedJobs from "./AddedJobs"
import CandidateSection from "./CandidateSection"
import getAllCandidates from "common/realBackend/candidates/getAllCandidates"
import getAllUsers from "common/realBackend/users/getAllUsers"
import getAllCandidatesWithBlacklist from "common/realBackend/blacklist/getAllCandidatesWithBlacklist"

//Import Components
import ChartSection from "./ChartSection"
import JobVacancy from "./JobVacancy"
import ReceivedTime from "./ReceivedTime"
import Section from "./Section"
import StatisticsApplications from "./StatisticsApplications"
import LatestTranaction from "pages/Dashboard/LatestTranaction"

import TopCities from "pages/Dashboard/TopCities"

const getMonthlyCounts = (data, dateField) => {
  const currentYear = new Date().getFullYear();
  const monthlyCounts = Array(12).fill(0);

  data.forEach(item => {
    const date = new Date(item[dateField]);
    if (date.getFullYear() === currentYear) {
      const month = date.getMonth(); // January is 0
      monthlyCounts[month]++;
    }
  });

  return monthlyCounts;
};

const calculatePercentageChangeForCurrentMonth = (monthlyCounts) => {
  const currentMonthIndex = new Date().getMonth(); // 0-based index (August = 7)
  const previousMonthIndex = currentMonthIndex - 1; // July = 6

  const previousMonthCount = monthlyCounts[previousMonthIndex] || 0;
  const currentMonthCount = monthlyCounts[currentMonthIndex] || 0;

  // Log counts for debugging
  console.log(`Previous Month (Index ${previousMonthIndex}): ${previousMonthCount}`);
  console.log(`Current Month (Index ${currentMonthIndex}): ${currentMonthCount}`);

  let percentageChange = 0;
  let isTrendingUp = false;

  if (previousMonthCount > 0) {
    percentageChange = ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;
    isTrendingUp = percentageChange > 0;
  } else if (previousMonthCount === 0 && currentMonthCount > 0) {
    percentageChange = 100; // Significant increase from zero
    isTrendingUp = true;
  } else if (previousMonthCount === 0 && currentMonthCount === 0) {
    percentageChange = 0; // No change when both are zero
    isTrendingUp = false;
  } else {
    percentageChange = -100; // Significant drop from zero
    isTrendingUp = false;
  }

  return {
    percentageChange: percentageChange.toFixed(2), // Return as a string with 2 decimal places
    isTrendingUp
  };
};

const DashboardJob = () => {
  document.title = "Default Dashboard | LAPO Web App"

  const [candidateCounts, setCandidateCounts] = useState([]);
  const [userCounts, setUserCounts] = useState([]);
  const [blacklistCounts, setBlacklistCounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const candidatesResponse = await getAllCandidates();
        const usersResponse = await getAllUsers();
        const blacklistResponse = await getAllCandidatesWithBlacklist();

        const candidates = candidatesResponse.data.candidates || [];
        const users = usersResponse.data.users || [];
        const blacklists = blacklistResponse.data.candidates || [];

        setCandidateCounts(getMonthlyCounts(candidates, 'createdAt'));
        setUserCounts(getMonthlyCounts(users, 'createdAt')); // Adjust field if needed
        setBlacklistCounts(getMonthlyCounts(blacklists, 'createdAt')); // Adjust field if needed
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const reports = [
    { title: "Purchases", iconClass: "bx-copy-alt", description: "8" },
    { title: "Revenue", iconClass: "bx-archive-in", description: "N1,500" },
  ];

  const candidatePercentage = calculatePercentageChangeForCurrentMonth(candidateCounts);
  const userPercentage = calculatePercentageChangeForCurrentMonth(userCounts);
  const blacklistPercentage = calculatePercentageChangeForCurrentMonth(blacklistCounts);

  // Log the counts and percentage changes for debugging
  console.log('Candidate Counts:', candidateCounts);
  console.log('User Counts:', userCounts);
  console.log('Blacklist Counts:', blacklistCounts);
  console.log('Candidate Percentage Change:', candidatePercentage);
  console.log('User Percentage Change:', userPercentage);
  console.log('Blacklist Percentage Change:', blacklistPercentage);

  const chartsData = [
    {
      id: 1,
      title: "Total Candidate",
      price: candidateCounts.reduce((a, b) => a + b, 0).toString(), // Total count
      percentageValue: candidatePercentage,
      badgeColor: "success",
      isTrendingArrow: candidatePercentage.isTrendingUp,
      seriesData: [
        {
          name: "Total Candidate",
          data: candidateCounts,
        },
      ],
      color: '["--bs-success", "--bs-transparent"]',
    },
    {
      id: 2,
      title: "Total Users",
      price: userCounts.reduce((a, b) => a + b, 0).toString(), // Total count
      percentageValue: userPercentage,
      badgeColor: "success",
      isTrendingArrow: userPercentage.isTrendingUp,
      seriesData: [
        {
          name: "Total Users",
          data: userCounts,
        },
      ],
      color: '["--bs-success", "--bs-transparent"]',
    },
    {
      id: 3,
      title: "Total Blacklist",
      price: blacklistCounts.reduce((a, b) => a + b, 0).toString(), // Total count
      percentageValue: blacklistPercentage,
      badgeColor: "success",
      isTrendingArrow: blacklistPercentage.isTrendingUp,
      seriesData: [
        {
          name: "Total Blacklist",
          data: blacklistCounts,
        },
      ],
      color: '["--bs-success", "--bs-transparent"]',
    },
  ]
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Section />

          <ChartSection chartsData={chartsData} />
          <Row>
            {/* CandidateSection */}
            <CandidateSection /> 
          </Row> 

          <Row>
            <LatestTranaction />
          </Row>

          <Row>
            <ReceivedTime />
            {/* <ActivityFeed /> */}
            <AddedJobs />
          </Row>

          {/* <Row>
            <Col xl="4">
              <TopCities />
            </Col>

          </Row> */}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default DashboardJob

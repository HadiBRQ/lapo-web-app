import React, { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faTshirt, faBed, faTree, faChild, faCar, faConciergeBell, faShieldAlt, faBriefcase, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import getAllJobs from "common/realBackend/job/getAllJobs";
import getAllDomesticCategories from "common/realBackend/domesticCategory/GetAllDomesticCategories";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";

// Define the icon mapping
const categoryIcons = {
  "Chef": faUtensils,
  "Laundrer": faTshirt,
  "Senior Housekeeper": faBed,
  "Gardener": faTree,
  "Nanny": faChild,
  "Driver": faCar,
  "Butler": faConciergeBell,
  "Cook": faUtensils,
  "Security Personnel": faShieldAlt,
  "Personal Assistant": faBriefcase
};

const AddedJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsResponse = await getAllJobs();
        const jobsData = jobsResponse.data.jobs;

        // Sort jobs by createdAt in descending order
        const sortedJobs = jobsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setJobs(sortedJobs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate time since the job was posted
  const timeAgo = (dateString) => {
    const now = new Date();
    const postedDate = new Date(dateString);
    const diffInMs = now.getTime() - postedDate.getTime();
    
    if (diffInMs < 0) {
      return 'In the future';
    }
    
    const diffInSeconds = Math.floor(diffInMs / 1000);
    if (diffInSeconds < 60) { // Less than a minute
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) { // Less than an hour
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      return `${diffInMinutes} minutes ago`;
    } else if (diffInSeconds < 86400) { // Less than a day
      const diffInHours = Math.floor(diffInSeconds / 3600);
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInSeconds / 86400);
      return `${diffInDays} days ago`;
    }
  };  

  return (
    <React.Fragment>
      <div className="col-lg-4">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title mb-4">Recent Added Jobs</h4>
            <SimpleBar style={{ maxHeight: "376px" }}>
              <div className="vstack gap-4">
                {jobs.map((job) => {
                  // Get the first domestic category for the job
                  const firstCategoryName = job.DomesticCategories[0]?.name;
                  const icon = categoryIcons[firstCategoryName] || faQuestionCircle;
                  
                  return (
                    <div key={job.id} className="d-flex align-items-center">
                      {/* Display the icon for the first domestic category */}
                      <FontAwesomeIcon
                        icon={icon}
                        size="lg"
                        className="me-2"
                      />
                      <div className="ms-2 flex-grow-1">
                        <h6 className="mb-1 font-size-15">
                          <a href={`job-details.html?jobId=${job.id}`} className="text-body">
                            {job.title}
                          </a>
                        </h6>
                        <p className="text-muted mb-0">
                          {job.location} - <b>{timeAgo(job.createdAt)}</b>
                        </p>
                      </div>
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn btn-light"
                          type="button"
                          id="dropdownMenuButton1"
                        >
                          <i className="bx bx-dots-vertical-rounded"></i>
                        </DropdownToggle>
                        <DropdownMenu
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <DropdownItem href={`job-details.html?jobId=${job.id}`}>
                            View Details
                          </DropdownItem>
                          <DropdownItem href="#">Apply Now</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  );
                })}
              </div>
            </SimpleBar>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddedJobs;

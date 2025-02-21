import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row, Collapse, Label, Input } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import getNigeriaState from 'common/realBackend/users/GetNigeriaState';
import getNigeriaLGAbyStateName from 'common/realBackend/users/GetNigeriaLGAbyStateName';
import getAllDomesticCategories from 'common/realBackend/domesticCategory/GetAllDomesticCategories';
import { default as avatar2 } from '../../../assets/images/users/avatar-2.jpg';
//import images
import { Candidate } from 'common/data/users';

const AboutUs1 = ({candidateCount, candidates}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [selectDate, setSelectDate] = useState();
    const [lgas, setLgas] = useState([]);
    const [selectedLGA, setSelectedLGA] = useState('');
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [categories, setCategories] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState(candidates);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const dateChange = (date) => {
        setSelectDate(date)
    };

    useEffect(() => {
        const fetchJobCategories = async () => {
            try {
                const response = await getAllDomesticCategories();
                console.log("API Response:", response); // Debugging line

                if (Array.isArray(response)) {
                    setCategories(response);
                    console.log('Categories state set:', response);
                } else {
                    console.warn("No categories found in response"); // Debugging line
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const fetchStates = async () => {
            try {
                const response = await getNigeriaState();
                if (Array.isArray(response.data)) {
                    // Directly map the array of state names
                    const statesWithIds = response.data.map((state, index) => ({
                        id: index + 1,
                        name: state
                    }));
                    setStates(statesWithIds);
                } else {
                    console.error('Invalid States data:', response.data);
                }
            } catch (error) {
                console.error('Error fetching States:', error);
            }
        };

        fetchJobCategories();
        fetchStates();
    }, []);

    // Fetch LGAs when selectedState changes
    useEffect(() => {
        const fetchLgas = async () => {
            if (selectedState) {
                try {
                    const stateName = states.find(state => state.id === parseInt(selectedState))?.name;
                    if (stateName) {
                        const response = await getNigeriaLGAbyStateName(stateName);
                        if (response.data && Array.isArray(response.data.lgas)) {
                            const lgasWithIds = response.data.lgas.map((lga, index) => ({
                                id: index + 1,
                                name: lga
                            }));
                            setLgas(lgasWithIds);
                        } else {
                            console.error('Invalid LGAs data:', response.data);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching LGAs:', error);
                }
            } else {
                setLgas([]); // Clear LGAs if no state is selected
            }
        };

        fetchLgas();
    }, [selectedState, states]);

    const handleLGAChange = (event) => {
        setSelectedLGA(event.target.value);
    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        let filtered = candidates;

        if (searchTerm) {
            filtered = filtered.filter(candidate =>
                candidate.fullName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedState) {
            filtered = filtered.filter(candidate => {
                const [state, lga] = candidate.location.split(', ');
                return state === states.find(state => state.id === parseInt(selectedState))?.name;
            });
        }

        if (selectedLGA) {
            filtered = filtered.filter(candidate => {
                const [state, lga] = candidate.location.split(', ');
                return lga === lgas.find(lga => lga.id === parseInt(selectedLGA))?.name;
            });
        }

        if (selectedCategory) {
            filtered = filtered.filter(candidate =>
                candidate.domesticCategories.some(category =>
                    category.name === categories.find(cat => cat.id === parseInt(selectedCategory))?.name
                )
            );
        }

        setFilteredCandidates(filtered);
    }, [searchTerm, selectedState, selectedLGA, selectedCategory, candidates, states, lgas, categories]);

    const formatSalary = (minSalary, maxSalary) => {
        if (minSalary === null && maxSalary === null) {
            return 'Salary not specified';
        }
    
        const format = (salary) => {
            if (salary === null) return '';
    
            // If salary is less than 1000, return it as is with Naira symbol
            if (salary < 1000) return `₦${salary}`;
    
            // If salary is 1000 or more, format it as K with Naira symbol
            const salaryK = Math.round(salary / 1000);
            return `₦${salaryK}K`;
        };
    
        // Apply formatting to both minSalary and maxSalary
        return `${format(minSalary)} - ${format(maxSalary)}`;
    };

    return (
        <React.Fragment>
            <Col lg={9}>
            <Row>
                        <Col lg={12}>
                            <Card className="job-filter">
                                <CardBody>
                                    <form action="#">
                                        <Row className="g-3">
                                            <Col xxl={4} lg={4}>
                                                <div className="position-relative">
                                                    <Input type="text" className="form-control" id="searchJob" autoComplete="off" placeholder="Search your candidate" value={searchTerm}
                                                    onChange={handleSearchChange} />
                                                </div>
                                            </Col>

                                            <Col xxl={2} lg={4}>
                                                <div className="position-relative">
                                                <select
                                                    className="form-control form-select"
                                                    id="State"
                                                    value={selectedState}
                                                    onChange={handleStateChange}
                                                    required
                                                >
                                                    <option value="">Select a State</option>
                                                    {states.map((state) => (
                                                        <option key={state.id} value={state.id}>
                                                            {state.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                </div>
                                            </Col>


                                            <Col xxl={2} lg={4}>
                                                <div className="position-relative">
                                                <select
                                                    className="form-control form-select"
                                                    id="LGA"
                                                    value={selectedLGA}
                                                    onChange={handleLGAChange}
                                    
                                                >
                                                    <option value="">Select an LGA</option>
                                                    {lgas.map((lga) => (
                                                        <option key={lga.id} value={lga.id}>
                                                            {lga.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                </div>
                                            </Col>

                                            <Col xxl={2} lg={4}>
                                                <div className="position-relative">
                                                    <select className="form-select select2" aria-label="Default select example" value={selectedCategory}
                                                    onChange={handleCategoryChange}>
                                                    <option value="">Select a Job Category</option>
                                                    {categories.map(category => (
                                                        <option key={category.id} value={category.id}>{category.name}</option>
                                                    ))}
                                                    </select>
                                                </div>
                                            </Col>

                                            {/* <Col xxl={2} lg={6}>
                                                <div className="position-relative">
                                                    <div id="datepicker1">
                                                        <DatePicker
                                                            className="form-control"
                                                            placeholderText="Select date"
                                                            selected={selectDate}
                                                            onChange={dateChange}
                                                        />
                                                    </div>
                                                </div>
                                            </Col> */}
                                        </Row>
                                    </form>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>
                <Row>
                    <Col lg={12}>
                        <h5 className="mb-3">Candidates ({filteredCandidates.length})</h5>
                    </Col>
                    {filteredCandidates.map((item, key) => (
                <Col xl={3} key={key}>
                    <Card>
                        <CardBody>
                            <div className="d-flex align-start mb-3">
                                <div className="flex-grow-1">
                                <span className={
                                        item.type === "Available" ? "badge badge-soft-success" :
                                        item.type === "Unavailable" ? "badge badge-soft-danger" :
                                        "badge badge-soft-warning"  // Fallback for any other types
                                        }>
                                        {item.type}
                                        </span>
                                </div>
                                <button type="button" className="btn btn-light btn-sm like-btn" onClick={(e) => activeBtn(e.target)}>
                                    <i className="bx bx-heart"></i>
                                </button>
                            </div>
                            <div className="text-center mb-3">
                            <img src={item.profileImage || avatar2} alt="" className="avatar-sm rounded-circle" />
                                <h6 className="font-size-15 mt-3 mb-1">{item.fullName}</h6>
                                {/* <p className="mb-0 text-muted">{item.designation}</p> */}
                            </div>
                            <div className="d-flex justify-content-between text-muted mb-3">
                                <div className="text-center">
                                    <h6>Experience</h6>
                                    <div className="d-flex justify-content-center gap-2">
                                        <div>
                                            <i className='bx bx-map align-middle text-primary'></i> {item.yearsOfExperience} Years
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <h6>Salary</h6>
                                    <div className="d-flex justify-content-center gap-2">
                                        <p className="mb-0">
                                            <i className='bx bx-money align-middle text-primary'></i> {formatSalary(item.salaryRangeMin, item.salaryRangeMax)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="hstack gap-2 justify-content-center">
                                {(item.skills || []).map((subItem , key) => (
                                <span key={key} className="badge badge-soft-secondary">{subItem}</span>
                                ))}
                            </div> */}

                            <div className="mt-4 pt-1">
                                <Link to={`/job-details/${item.id}`} className="btn btn-soft-primary d-block">
                                                View Profile
                                            </Link>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                ))}
                </Row>

            </Col>
        </React.Fragment>
    );
}

export default AboutUs1;
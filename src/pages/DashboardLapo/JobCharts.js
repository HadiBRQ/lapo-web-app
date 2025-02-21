import React, {useEffect, useState} from 'react';
import ReactApexChart from "react-apexcharts";

import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import getAllCandidates from 'common/realBackend/candidates/getAllCandidates';

const JobWidgetCharts = ({ dataColors, series }) => {
    var areacharteathereumColors = getChartColorsArray(dataColors);

    var options = {
        chart: {
            width: 130,
            height: 46,
            type: "area",
            sparkline: {
                enabled: true,
            },
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
            width: 1.5,
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [50, 100, 100, 100],
            },
        },
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function (seriesName) {
                        return '';
                    }
                }
            },
            marker: {
                show: false
            }
        },
        colors: areacharteathereumColors,
    };
    return (
        <React.Fragment>
            <ReactApexChart
                options={options}
                series={series}
                type="area"
                height="46"
                width="130"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

const StatisticsApplicationsChart = ({ seriesData, dataColors }) => {
    var statisticsApplicationColors = getChartColorsArray(dataColors);

    const series = [{
        name: 'Companay',
        type: 'column',
        data: (seriesData.companay || [])
    }, {
        name: 'New Jobs',
        type: 'column',
        data: (seriesData.newjobs || [])
    }, {
        name: 'Total Jobs',
        type: 'area',
        data: (seriesData.totaljobs || [])
    }, {
        name: 'Job View',
        type: 'line',
        data: (seriesData.jobview || [])
    }];
    var options = {
        chart: {
            height: 350,
            type: 'line',
            stacked: false,
            toolbar: {
                show: false,
            },
        },
        legend: {
            show: true,
            offsetY: 10,
        },
        stroke: {
            width: [0, 0, 2, 2],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                columnWidth: '30%'
            }
        },
        fill: {
            opacity: [1, 1, 0.1, 1],
            gradient: {
                inverseColors: false,
                shade: 'light',
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100]
            }
        },
        labels: (seriesData.label || []),
        colors: statisticsApplicationColors,
        markers: {
            size: 0
        },
        xaxis: {
            type: 'datetime'
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + " points";
                    }
                    return y;

                }
            }
        }
    };
    return (
        <React.Fragment>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height="350"
                className="apex-charts pb-3"
            />
        </React.Fragment>
    );
};

const processCandidateData = (candidates) => {
    if (!Array.isArray(candidates)) {
        console.error('Invalid data format for candidates:', candidates);
        return Array(24).fill(0); // Return a default value if data is not valid
    }

    const hours = Array(24).fill(0);

    candidates.forEach(candidate => {
        if (candidate.createdAt) {
            const createdAt = new Date(candidate.createdAt);
            const hour = createdAt.getUTCHours();
            hours[hour]++;
        }
    });

    return hours;
};

const ReceivedTimeCharts = ({ dataColors }) => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await getAllCandidates();
                if (response.status === 'success' && Array.isArray(response.data.candidates)) {
                    setCandidates(response.data.candidates);
                } else {
                    console.error('Unexpected API response structure:', response);
                }
            } catch (error) {
                console.error('Error fetching candidates:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCandidates();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Display loading state
    }

    if (error) {
        return <div>Error loading data</div>; // Display error state
    }

    const ApplicationReceivedTimeColors = getChartColorsArray(dataColors);

    // Process the candidates data to get the counts for each hour
    const hourlyData = processCandidateData(candidates);

    const series = [{
        name: 'Number of candidates created',
        data: hourlyData
    }];

    const options = {
        chart: {
            type: 'line',
            height: 400, // Adjust height as needed
            toolbar: {
                show: false,
            },
        },
        stroke: {
            width: 3,
            curve: 'smooth'
        },
        xaxis: {
            categories: Array.from({ length: 24 }, (_, i) => {
                const hour = i % 12 === 0 ? 12 : i % 12; // Handle 12AM and 12PM
                return `${hour}${i < 12 ? 'AM' : 'PM'}`;
            }),
            labels: {
                style: {
                    colors: '#6c757d', // Optional: Customize label color
                },
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ApplicationReceivedTimeColors,
        markers: {
            hover: {
                sizeOffset: 4
            }
        }
    };

    return (
        <React.Fragment>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height="400"
                width="100%" // Ensure chart scales with container
                className="apex-charts"
            />
        </React.Fragment>
    );
};

ReceivedTimeCharts.defaultProps = {
    dataColors: [] // Assuming dataColors is also passed as a prop
};

export { JobWidgetCharts, StatisticsApplicationsChart, ReceivedTimeCharts};
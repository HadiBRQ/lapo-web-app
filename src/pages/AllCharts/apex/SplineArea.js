import React from "react"
import ReactApexChart from "react-apexcharts"
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor";

const Spinearea = ({dataColors}) => {
  const spineareaChartColors = getChartColorsArray(dataColors);

  const series = [
    {
      name: "Income (N)",
      data: [34, 40, 28, 52, 42, 109, 100],
    },
    // {
    //   name: "series2",
    //   data: [32, 60, 34, 46, 34, 52, 41],
    // },
  ]

  const options = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },

    colors: spineareaChartColors,
    xaxis: {
      type: "Week",
      categories: [
        "Mon",
        "Tues",
        "Wed",
        "Thurs",
        "Fri",
        "Sat",
        "Sun",
      ],
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  }

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height="350"
    />
  )
}

export default Spinearea

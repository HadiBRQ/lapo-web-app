import React from "react"
import ReactApexChart from "react-apexcharts"
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor";

const dountchart = ({dataColors}) => {
  const dountApexChartColors = getChartColorsArray(dataColors);

  const series = [204, 55, 31, 17, 12]
  const options = {
    labels: ["Active", "Expired", "Inactive", "Blocked", "Lost"],
    colors: dountApexChartColors,
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      verticalAlign: "middle",
      floating: false,
      fontSize: "14px",
      offsetX: 0,
      offsetY: -10,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 240,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  }

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="donut"
      height="320"
    />
  )
}

export default dountchart

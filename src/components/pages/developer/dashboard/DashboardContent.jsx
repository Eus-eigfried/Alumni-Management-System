import React from "react";
import { Chart } from "react-google-charts";
const DashboardContent = ({ users }) => {
	const data = [
		["Employment Status", "People"],
		["Employed", 0],
		["Non-working", 0],
		["Self-Employed", 0],
	];

	const options = {
   		is3D: true,
		pieStartAngle: 90,
    	legend: {
    		position: "bottom",
    		alignment: "center",
    		textStyle: {
    		color: "#233238",
    		fontSize: 12,
      		},
		},
		colors: ["#008000", "#FF5F1F", "#000080",],
	};
	return (
		<Chart
			chartType='PieChart'
			data={data}
			options={options}
			width={"100%"}
			height={"400px"}
		/>
	);
};

export default DashboardContent;

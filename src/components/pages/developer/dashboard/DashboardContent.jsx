import React from "react";
import { Chart } from "react-google-charts";
const DashboardContent = ({ users }) => {
	const data = [
		["Employment Status", "Emplyoyed/Unemployed/Student"],
		["Employed", users[8] == "Employed" ? 10 : 0],
		["Employed", users[8] == "Employed" ? 10 : 0],
		["Employed", users[8] == "Employed" ? 10 : 0],
	];

	const options = {
		title: "Employment Status",
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

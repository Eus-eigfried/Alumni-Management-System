import React from "react";
import axios from "axios";
import AsideBar from "../home/AsideBar";
import { FaDatabase } from "react-icons/fa";
import { Link } from "react-router-dom";
import DbHeader from "../../../partials/header/DbHeader";
import ThemeMode from "../../../partials/functions/ThemeMode";
import { StoreContext } from "../../../../store/StoreContext";
import DashboardContent from "./DashboardContent";

const DashboardInfo = () => {
	const [users, setUsers] = React.useState([]);
	const [name, setName] = React.useState("");
	const [yearGraduated, setYearGraduated] = React.useState("");
	const [course, setCourse] = React.useState("");
	const [birthDate, setBirthDate] = React.useState("");
	const [address, setAddress] = React.useState("");
	const [contactNo, setContactNo] = React.useState("");
	const [currentStatus, setCurrentStatus] = React.useState("");

	const [is_Active, setIs_Active] = React.useState();
	const [timeCreated, setTimeCreated] = React.useState();
	// for search
	const [filteredUsers, setFilteredUsers] = React.useState([]);
	// dispatch
	const { store, dispatch } = React.useContext(StoreContext);
	// effect

	React.useEffect(() => {
		// localStorage for sorters:
		localStorage.setItem("sortName", "preSorted");
		axios
			.get("http://localhost:5000/users")
			.then((response) => {
				setUsers(response.data);
				setFilteredUsers(response.data); // Initialize filtered users with all users
			})
			.catch((error) =>
				console.error("There was an error fetching the users!", error)
			);
	}, []);
	return (
		<>
			<div className='flex gap-5 flex-row justify-between w-full '>
				<aside className='w-1/5'>
					<AsideBar activeLink={"dashboard"} />
				</aside>
				<main className='w-4/5 pr-20'>
					{/* header */}
					<div className='border-b-4 border-accent'>
						<DbHeader type={false} />
						{/* Display filtered users */}
						<div className='w-full flex items-center gap-5 container pt-2'>
							<div className='w-1/2 justify-start'>
								<h2>Master List</h2>
							</div>
							<div className='w-1/2 flex items-center gap-2 justify-end'>
								<button className='btn btn-add bg-accent text-primary flex items-center  gap-2 justify-center w-1/3'>
									<FaDatabase />
									<Link
										to='http://localhost/phpmyadmin/index.php?route=/database/structure&db=crud_db'
										target='_blank'>
										Database Link
									</Link>
								</button>
								<ThemeMode />
							</div>
						</div>
					</div>
					{/* insert here: */}
					<DashboardContent users={users} />
				</main>
			</div>
		</>
	);
};

export default DashboardInfo;

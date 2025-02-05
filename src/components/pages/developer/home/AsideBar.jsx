import { useTransform } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const AsideBar = ({ activeLink }) => {
	const userAdmin = "Dean of COE";
	return (
		<>
			<div className='w-full h-screen bg-accent text-secondary py-4 pr-4'>
				<div className='container'>
					<div className='flex flex-col'>
						<div className='flex flex-row justify-start'>
							<img
								src='public/COE_logo.jpg'
								alt='logo'
								className='object-cover rounded-full'
							/>
						</div>
						<ul className='nav flex flex-col justify-star w-full'>
							<p>Hello, {userAdmin}</p>
							<li
								className={`nav-link navigator-${
									activeLink === "home" ? "active" : ""
								}`}>
								<Link to='http://localhost:5173/'>Master List</Link>
							</li>
							<li
								className={`nav-link navigator-${
									activeLink === "dashboard" ? "active" : ""
								}`}>
								<Link to='/graph'>Employment Chart</Link>
							</li> 
							<li className={`nav-link navigator-${
									activeLink === "FB COESC Page" ? "active" : ""
								}`}>
								<Link to='https://www.facebook.com/PLSPCOESC'>COESC Page</Link>
							</li>
							<li className={`nav-link navigator-${
									activeLink === "PLSP Web" ? "active" : ""
								}`}>
								<Link to='https://plsp.edu.ph'>PLSP Web</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default AsideBar;

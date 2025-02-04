import { useTransform } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const AsideBar = ({ activeLink }) => {
	const userAdmin = "Dean of COE";
	return (
		<>
			<div className='w-full h-screen bg-accent text-secondary py-5 pr-5'>
				<div className='container'>
					<div className='flex flex-col gap-5'>
						<div className='flex flex-row justify-start gap-2'>
							<img
								src='public/COE_logo.jpg'
								alt='logo'
								className='object-cover rounded-full'
							/>
						</div>
						<ul className='nav flex gap-3 flex-col justify-star w-full'>
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
									activeLink === "dashboard" ? "active" : ""
								}`}>
									<button>Logout</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default AsideBar;

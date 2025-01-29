import { useTransform } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const AsideBar = ({ activeLink }) => {
	const userAdmin = "Dean";
	return (
		<>
			<div className='w-full h-screen bg-accent text-secondary py-5 pr-5'>
				<div className='container'>
					<div className='flex flex-col gap-5'>
						<div className='flex flex-row justify-start gap-2'>
							<img
								src='public/vite.svg'
								alt='logo'
								className='object-cover rounded-full'
							/>
							<p>Hello, {userAdmin}</p>
						</div>
						<ul className='nav flex gap-2 flex-col justify-star w-full'>
							<li
								className={`nav-link navigator-${
									activeLink === "home" ? "active" : ""
								}`}>
								<Link to='http://localhost:5173/'>Home</Link>
							</li>
							<li
								className={`nav-link navigator-${
									activeLink === "dashboard" ? "active" : ""
								}`}>
								<Link to='/graph'>Graph</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default AsideBar;

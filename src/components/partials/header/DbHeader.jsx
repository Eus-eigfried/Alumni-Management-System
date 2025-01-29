import React from "react";

const DbHeader = ({
	adminTitle = "Alumni Management System",
	handleSearch,
	handleAdd,
	users,
	handleSortByName,
	type,
}) => {
	const [showInfo, setShowInfo] = React.useState(false);
	const handleShowInfo = () => {
		setShowInfo(!showInfo);
	};
	return (
		<>
			<header
				className={`${
					type === true ? "border-b-4 border-accent" : ""
				} py-1 w-full z-[99]`}>
				<div className='container '>
					<div className='flex items-center gap-5 justify-between relative'>
						<h4 className='text-content mb-0 font-FiraCode '>{adminTitle}</h4>
					</div>
				</div>
			</header>
		</>
	);
};

export default DbHeader;

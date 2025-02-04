import React from "react";
import ModalWrapper from "../../modals/ModalWrapper";
import { FaTimesCircle } from "react-icons/fa";
import { MdOutlineQuestionMark } from "react-icons/md";
import { setIsViewId } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";

const UserInfo = ({ users, isId, setIsId }) => {
	// Find the user by the ID passed in props
	const user = users.find((u) => u[0] === isId); // Assuming the first element of user is the ID.
	// console.log(setIsId);
	console.log(user);
	const handleCloseMain = () => dispatch(setIsViewId(false));
	const { store, dispatch } = React.useContext(StoreContext);

	return (
		<>
			<div className='parent bg-primary w-1/8'>
				<ModalWrapper
					position={"center"}
					opacity={"50"}>
					<div className='bg-primary h-[425px] w-[750px] p-5 rounded-xl flex flex-col gap-5'>
						<div className='flex justify-end items-center'>
							<button
								className='text-xl text-accent'
								onClick={handleCloseMain}>
								<FaTimesCircle />
							</button>
						</div>

						{/* Check if the user exists */}
						{user ? (
							<>
								<div className='flex flex-row justify-evenly user info'>
									<div className='flex flex-col gap-4 items-left '>
										<div className='flex flex-row gap-4'>
											<p>Id:</p>
											<p>{user[0]}</p>
										</div>
										<div className='flex flex-row'>
											<p>Active Status:</p>
											<p
												className={` mx-auto ${
													user[9] === 1
														? `bg-green-300 rounded-full  px-3   w-fit text-green-950`
														: `bg-red-300 rounded-full px-3 w-fit  text-red-950`
												}`}>
												{user[9] ? "Active" : "Inactive"}
											</p>
										</div>
										<div className='flex flex-row gap-4'>
											<p>Time Created:</p>
											<p>{user[10]}</p>
										</div>
										<div className='flex flex-row gap-4'>
											<p>Graduation Year:</p>
											<p>{user[2]}</p>
										</div>
										<div className='flex flex-row gap-4'>
											<p>College Course:</p>
											<p>{user[3]}</p>
										</div>
										<div className='flex flex-row gap-4'>
											<p>Employement Status:</p>
											<p>{user[8]}</p>
										</div>
									</div>
									<div className='flex flex-col gap-3 items-right'>
										<div className='flex flex-row gap-3'>
											<p>Name:</p>
											<p>{user[1]}</p>
										</div>
										<div className='flex flex-row gap-3'>
											<p>BirthDate:</p>
											<p>{user[4]}</p>
										</div>
										<div className='flex flex-row gap-3'>
											<p>Address:</p>
											<p>{user[5]}</p>
										</div>
										<div className='flex flex-row gap-3'>
											<p>Contact No:</p>
											<p>{user[6]}</p>
										</div>
										<div className='flex flex-row gap-3'>
											<p>Email:</p>
											<p>{user[7]}</p>
										</div>
									</div>
								</div>
									
							</>
						) : (
							<p>User not found</p>
						)}

						<div className='flex w-full items-center justify-end'>
							<button
								onClick={handleCloseMain}
								className='bg-accent rounded-lg w-1/2  p-2 text-primary '>
								Confirm
							</button>
						</div>
					</div>
				</ModalWrapper>
			</div>
		</>
	);
};

export default UserInfo;

import React from "react";
import ModalWrapper from "./ModalWrapper";
import { FaTimesCircle } from "react-icons/fa";
import { StoreContext } from "../../../store/StoreContext";
import { setIsEdit } from "../../../store/StoreAction";

const ModalEditUser = ({
	setEditUserId,
	handleUpdate,
	// edit : getter states
	editName,
	editYearGraduated,
	editCourse,
	editBirthDate,
	editAddress,
	editContactNo,
	editCurrentStatus,
	editEmail,
	// edit: setters
	setEditName,
	setEditYearGraduated,
	setEditCourse,
	setEditBirthDate,
	setEditAddress,
	setEditContactNo,
	setEditCurrentStatus,
	setEditEmail,
}) => {
	// store components
	const { dispatch, store } = React.useContext(StoreContext);
	// handlers
	const handleClose = () => dispatch(setIsEdit(false));

	return (
		<>
			<ModalWrapper position={"center"}>
				<div className='main-modal w-[400px] bg-primary text-content h-auto  rounded-xl '>
					<div className='bg-accent w-full flex items-center text-center px-4 rounded-t-xl text-primary justify-between'>
						<h4 className='mb-0 py-2 text-primary '>Edit Alumni</h4>
						<button
							className='text-xl text-primary'
							onClick={handleClose}>
							<FaTimesCircle />
						</button>
					</div>
					<div className='modal-body p-4'>
						<div className='bg-primary '>
							<form
								onSubmit={handleUpdate}
								className='input-wrapper'>
								<div className=' flex flex-col  items-center gap-2 py-5 px-10'>
									{/* name */}
									<input
										type='text'
										placeholder='Name'
										value={editName}
										onChange={(e) => setEditName(e.target.value)}
										required
									/>
									{/* year grad */}
									<input
										type='month'
										id='start'
										name='Year Graduated'
										min='1900-01'
										max='2100-01'
										value={editYearGraduated}
										onChange={(e) => setEditYearGraduated(e.target.value)}
										required
									/>
									{/* course */}
									<select
										name='Course'
										id='Course'
										placeholder='Course'
										value={editCourse}
										onChange={(e) => setEditCourse(e.target.value)}
										required>
										<option
											hidden
											value='Course'>
											Course
										</option>
										<option value='BSCpE'>BSCpE</option>
										<option value='BSIE'>BSIE</option>
										<option value='Others'>Others</option>
									</select>
									{/* birthdate */}
									<input
										type='date'
										id='start'
										name='Birthdate'
										min='1900-01-01'
										max='2100-01-01'
										value={editBirthDate}
										placeholder='1999-01'
										onChange={(e) => setEditBirthDate(e.target.value)}
										required
									/>
									{/* address */}
									<input
										type='text'
										placeholder='Address'
										value={editAddress}
										onChange={(e) => setEditAddress(e.target.value)}
										required
									/>
									{/* contact no */}
									<input
										type='number'
										placeholder='ContactNo'
										value={editContactNo}
										onChange={(e) => setEditContactNo(e.target.value)}
										required
									/>
									{/* current status */}
									<select
										name='Status'
										id='Status'
										placeholder='Status'
										value={editCurrentStatus}
										onChange={(e) => setEditCurrentStatus(e.target.value)}
										required>
										<option
											hidden
											value=''>
											Occupational Status
										</option>
										<option value='Employed'>Employed</option>
										<option value='Non-Working'>Non-Working</option>
										<option value='Self-Employed'>Self-Employed</option>
									</select>
									{/* email */}
									<input
										type='email'
										placeholder='Email'
										value={editEmail}
										onChange={(e) => setEditEmail(e.target.value)}
										required
									/>
								</div>

								<div className='w-full flex items-center gap-2 px-10 jusitfy-center'>
									<button
										className='btn btn-form btn--close text-primary'
										onClick={handleClose}>
										Close
									</button>
									<button
										className='btn btn-form btn--edit'
										type='submit'>
										Edit Alumni
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</ModalWrapper>
		</>
	);
};

export default ModalEditUser;

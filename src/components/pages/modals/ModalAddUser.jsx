import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { setIsAdd } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import ModalWrapper from "./ModalWrapper";

const ModalAddUser = ({
	handleSubmit,
	name,
	yearGraduated,
	course,
	birthDate,
	address,
	contactNo,
	currentStatus,
	email,
	// edit: setters
	setName,
	setYearGraduated,
	setCourse,
	setBirthDate,
	setAddress,
	setContactNo,
	setCurrentStatus,
	setEmail,
	is_Active,
	setIs_Active,
}) => {
	// store variables:
	const { dispatch, store } = React.useContext(StoreContext);
	const handleClose = () => dispatch(setIsAdd(false));
	return (
		<>
			<ModalWrapper position={"center"}>
				<div className='main-modal w-[400px] bg-primary text-content h-auto  rounded-xl '>
					<div className='bg-accent w-full flex items-center text-center px-4 rounded-t-xl text-primary justify-between'>
						<h4 className='mb-0 py-2 text-primary '>Add Alumni</h4>
						<button
							className='text-xl text-primary'
							onClick={handleClose}>
							<FaTimesCircle />
						</button>
					</div>
					<div className='modal-body p-4'>
						<div className='bg-primary '>
							<form
								onSubmit={handleSubmit}
								className='input-wrapper flex flex-col  items-center gap-2 py-5'>
								<input
									type='text'
									placeholder='Name'
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
								{/* CALENDAR SELECT */}
								<input
									type='month'
									id='start'
									name='Year Graduated'
									min='1900-01'
									max='2100-01'
									value={yearGraduated}
									onChange={(e) => setYearGraduated(e.target.value)}
									required
								/>

								<select
									name='Course'
									id='Course'
									placeholder='Course'
									value={course}
									onChange={(e) => setCourse(e.target.value)}
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

								<input
									type='date'
									id='start'
									name='Birthdate'
									min='1900-01-01'
									max='2100-01-01'
									value={birthDate}
									placeholder='1999-01'
									onChange={(e) => setBirthDate(e.target.value)}
									required
								/>
								<input
									type='text'
									placeholder='Address'
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									required
								/>
								<input
									type='number'
									placeholder='ContactNo'
									value={contactNo}
									onChange={(e) => setContactNo(e.target.value)}
									required
								/>
								{/* current status */}
								<select
									name='Status'
									id='Status'
									placeholder='Status'
									value={currentStatus}
									onChange={(e) => setCurrentStatus(e.target.value)}
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
								<input
									type='email'
									placeholder='Email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
								{/* Active Status */}
								<div className='flex flex-row gap-2 py-5 w-2/3'>
									<p className='mb-0 pt-1'>Status:</p>
									<select
										className='isActive'
										name='is_Active'
										onChange={(e) => setIs_Active(e.target.value)}
										value={is_Active}>
										<option hidden>Is Active?</option>
										<option value='1'>Active</option>
										<option value='0'>Inactive</option>
									</select>
								</div>

								<div className='w-full flex items-center gap-2 px-10 jusitfy-center'>
									<button
										className='btn btn-form btn--close text-primary'
										onClick={handleClose}>
										Close
									</button>
									<button
										className='btn btn-form btn--add'
										type='submit'>
										Add Alumni
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

export default ModalAddUser;

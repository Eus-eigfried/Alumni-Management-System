import React from "react";
import axios from "axios";
import {
	setError,
	setIsAdd,
	setIsArchive,
	setIsDelete,
	setIsEdit,
	setIsLoading,
	setMessage,
	setSuccess,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";

import DbHeader from "../../../partials/header/DbHeader";
import ModalAddUser from "../../modals/ModalAddUser";
import ModalEditUser from "../../modals/ModalEditUser";
import UserList from "./UserList";

import { FaDatabase } from "react-icons/fa";
import { Link } from "react-router-dom";
import ModalArchive from "../../modals/ModalArchive";
import ModalDelete from "../../modals/ModalDelete";
import ModalError from "../../modals/ModalError";
import Toast from "../../modals/Toast";
import TableContent from "./TableContent";
import AsideBar from "./AsideBar";
import AsideInfo from "./UserInfo";
import { ClockAlert } from "lucide-react";

const MainHome = () => {
	const [users, setUsers] = React.useState([]);
	const [name, setName] = React.useState("");
	const [yearGraduated, setYearGraduated] = React.useState("");
	const [course, setCourse] = React.useState("");
	const [birthDate, setBirthDate] = React.useState("");
	const [address, setAddress] = React.useState("");
	const [contactNo, setContactNo] = React.useState("");
	const [currentStatus, setCurrentStatus] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [is_Active, setIs_Active] = React.useState();
	const [timeCreated, setTimeCreated] = React.useState();
	// for search
	const [filteredUsers, setFilteredUsers] = React.useState([]);
	// State for editing a user
	const [editUserId, setEditUserId] = React.useState(null); // Track which user is being edited
	const [editName, setEditName] = React.useState("");
	const [editYearGraduated, setEditYearGraduated] = React.useState("");
	const [editCourse, setEditCourse] = React.useState("");
	const [editBirthDate, setEditBirthDate] = React.useState("");
	const [editAddress, setEditAddress] = React.useState("");
	const [editContactNo, setEditContactNo] = React.useState("");
	const [editCurrentStatus, setEditCurrentStatus] = React.useState("");
	const [editEmail, setEditEmail] = React.useState("");
	const [editIs_Active, setEditIs_Active] = React.useState();
	// is being archived:
	const [statusId, setStatusId] = React.useState("");
	// is being deleted
	const [deleteId, setDeleteId] = React.useState("");
	// store contents:
	const { store, dispatch } = React.useContext(StoreContext);
	// open user info

	React.useEffect(() => {
		// localStorage for sorters:
		localStorage.setItem("sortName", "preSorted");
		axios
			.get("http://localhost:5000/users")
			.then((response) => {
				setUsers(response.data);
				setFilteredUsers(response.data); // Initialize filtered users with all users
				// store
				dispatch(setIsLoading(true));
			})
			.catch((error) =>
				console.error("There was an error fetching the users!", error)
			);
	}, []);

	// Handle search functionality
	const handleSearch = (searchTerm) => {
		if (!searchTerm) {
			setFilteredUsers(users); // If no search term, show all users
		} else {
			const lowercasedSearchTerm = searchTerm.toLowerCase();
			const filtered = users.filter(
				(user) =>
					user[1].toLowerCase().includes(lowercasedSearchTerm) || // search by name
					user[2].toLowerCase().includes(lowercasedSearchTerm) || // search by year graduated
					user[3].toLowerCase().includes(lowercasedSearchTerm) || //search by course
					user[8].toLowerCase().includes(lowercasedSearchTerm) // search by employment status
			);
			setFilteredUsers(filtered);
		}
	};

	//  Handle user create:
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:5000/users", {
				name,
				yearGraduated,
				course,
				birthDate,
				address,
				contactNo,
				currentStatus,
				email,
				is_Active,
				timeCreated,
			})
			.then(() => {
				// reset
				setName("");
				setYearGraduated("");
				setCourse("");
				setBirthDate("");
				setAddress("");
				setContactNo("");
				setCurrentStatus("");
				setEmail("");
				setIs_Active("");
				// refresh on add
				axios
					.get("http://localhost:5000/users")
					.then((response) => {
						setUsers(response.data);
						setFilteredUsers(response.data);
					})
					.catch((error) => {
						dispatch(setError(true));
						dispatch(setMessage("Create User failed!"));
						console.error("There was an error fetching the users!", error);
					});

				// Dispatch state updates
				dispatch(setIsAdd(false));
				dispatch(setSuccess(true));
				dispatch(setMessage(`Record has been successfully saved.`));
			})
			.catch((error) => {
				console.error("There was an error creating the user!", error);
			});
	};

	// Handle user deletion
	const handleDelete = (e, id = deleteId) => {
		e.preventDefault();
		const handleError = (message, error) => {
			dispatch(setError(true));
			dispatch(setMessage(message));
			console.error(error);
		};
		const updateUsers = () => {
			axios
				.get("http://localhost:5000/users")
				.then((response) => {
					setUsers(response.data);
					setFilteredUsers(response.data);
				})
				.catch((error) => handleError("Failed to fetch users!", error));
		};
		axios
			.delete(`http://localhost:5000/users/${id}`)
			.then(() => {
				setUsers(users.filter((user) => user.id !== id));
				setFilteredUsers(filteredUsers.filter((user) => user.id !== id));
				dispatch(setIsDelete(false));
				dispatch(setSuccess(true));
				dispatch(setMessage("Record Successfully Deleted"));
				updateUsers(); // Re-fetch users after deletion
			})
			.catch((error) => handleError("Delete failed!", error));
	};

	// Handle saving the edited user
	const handleUpdate = (e) => {
		e.preventDefault();
		axios
			.put(`http://localhost:5000/users/${editUserId}`, {
				name: editName,
				yearGraduated: editYearGraduated,
				course: editCourse,
				birthDate: editBirthDate,
				address: editAddress,
				contactNo: editContactNo,
				currentStatus: editCurrentStatus,
				email: editEmail,
			})
			.then((response) => {
				axios
					.get("http://localhost:5000/users")
					.then((response) => {
						setUsers(response.data);
						setFilteredUsers(response.data);
					})
					.catch((error) => {
						console.error("There was an error fetching the users!", error);
					});
				// Clear the edit state
				setEditUserId(null);
				setName("");
				setYearGraduated("");
				setCourse("");
				setBirthDate("");
				setAddress("");
				setContactNo("");
				setCurrentStatus("");
				setEmail("");
				// Dispatch state updates
				dispatch(setIsEdit(false));
				dispatch(setSuccess(true));
				dispatch(setMessage(`Record has been successfully updated.`));
				// Re-fetch users after updating
				axios
					.get("http://localhost:5000/users")
					.then((response) => setUsers(response.data));
			})
			.catch((error) => {
				dispatch(setError(true));
				dispatch(setMessage("Edit Alumni failed!", error));
				console.error("There was an error updating the user!", error);
			});
	};
	// Handle saving the edited user
	const handleStatusEdit = (e) => {
		e.preventDefault();
		axios
			.put(`http://localhost:5000/users-active/${editUserId}`, {
				is_Active: editIs_Active,
			})
			.then((response) => {
				axios
					.get("http://localhost:5000/users")
					.then((response) => {
						setUsers(response.data);
						setFilteredUsers(response.data);
					})
					.catch((error) => {
						console.error("There was an error fetching the users!", error);
					});
				// Clear the edit state
				setEditUserId(null);
				setEditIs_Active("");
				// Dispatch state updates
				dispatch(setIsArchive(false));
				dispatch(setSuccess(true));
				dispatch(setMessage(`User's Status active has been altered`));
				// Re-fetch users after updating
				axios
					.get("http://localhost:5000/users")
					.then((response) => setUsers(response.data));
			})
			.catch(() => {
				dispatch(setError(true));
				dispatch(setMessage("Operation Failed: Status Alter"));
			});
	};

	// handle create-modal
	const handleAdd = () => {
		// callbacks via store folder (create)
		dispatch(setIsAdd(true));
	};
	// handle delete-modal
	const handleDeleteModal = (e) => {
		// callbacks via store folder (edit)
		dispatch(setIsDelete(true));
		setDeleteId(e);
	};
	// handle edit-modal
	const handleEdit = (id) => {
		// callbacks via store folder (edit)
		dispatch(setIsEdit(true));
		try {
			// Find the user to edit
			const userToEdit = users.find((user) => user.id === id);
			setEditUserId(id); // Set the id of the user being edited
			setEditName(userToEdit[1]); // Set the name of the user to edit
			setEditYearGraduated(userToEdit[2]);
			setEditCourse(userToEdit[3]);
			setEditBirthDate(userToEdit[4]);
			setEditAddress(userToEdit[5]);
			setEditContactNo(userToEdit[6]);
			setEditCurrentStatus(userToEdit[7]);
			setEditEmail(userToEdit[8]);
		} catch (error) {
			// console.log(error.cause);
		}
	};
	const handleStatusModal = (id) => {
		// callbacks via store folder (edit)
		dispatch(setIsArchive(true));
		try {
			// Find the user to edit
			const userToEdit = users.find((user) => user.id === id);
			setEditUserId(id); // Set the id of the user being edited
			setEditIs_Active(userToEdit[9]); // Set the name of the user to edit
		} catch (error) {
			// console.log(error.cause);
		}
	};
	// gets info
	const openModal = async () => {
		try {
			const response = await axios.get("http://localhost:5000/get-info"); // Adjust URL based on your Flask server
			setModalData(response.data.info); // Store the fetched data
			setModalOpen(true); // Open the modal
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	// Function to close the modal
	const closeModal = () => {
		setModalOpen(false);
		setModalData(null); // Clear data when closing the modal
	};

	// Sorting function: by name
	const handleSortByName = () => {
		if (localStorage.getItem("sortName") === "preSorted") {
			const sortedUsers = [...filteredUsers].sort((a, b) => {
				// Assuming user[1] is the name field
				const nameA = a[1].toLowerCase(); // Convert name to lowercase for case-insensitive comparison
				const nameB = b[1].toLowerCase(); // Convert name to lowercase for case-insensitive comparison

				if (nameA < nameB) return -1; // a comes before b
				if (nameA > nameB) return 1; // b comes before a
				return 0; // names are equal
			});
			setFilteredUsers(sortedUsers); // Update filtered users with sorted data
			localStorage.setItem("sortName", "sorted");
		} else {
			localStorage.setItem("sortName", "preSorted");
			axios
				.get("http://localhost:5000/users")
				.then((response) => {
					setUsers(response.data);
					setFilteredUsers(response.data); // Initialize
				})
				.catch((error) =>
					console.error("There was an error fetching the users!", error)
				);
		}
	};

	return (
		<>
			<div className='flex gap-5 flex-row justify-between w-full '>
				<aside className='w-1/5'>
					<AsideBar activeLink={"home"} />
				</aside>
				<main className='w-4/5 pr-20'>
					{/* header */}
					<DbHeader />
					<TableContent
						handleSearch={handleSearch}
						handleAdd={handleAdd}
						users={users}
						handleSortByName={handleSortByName}
					/>
					{/* Display filtered users */}
					<div className='w-full flex items-center gap-5 border-t-2 border-accent container pt-2'>
						<div className='w-1/2 justify-start'>
							<h2>Master List</h2>
						</div>
						<div className='w-1/2 flex items-center gap-2 justify-end'>
							<p
								className={
									"rounded-lg btn-information bg-accent text-primary text-center gap-5 w-1/3 my-2"
								}>
								Entries Existing: {users.length}
							</p>
							<button className='btn btn-add bg-accent text-primary flex items-center  gap-2 justify-center w-1/3'>
								<FaDatabase />
								<Link
									to='http://localhost/phpmyadmin/index.php?route=/database/structure&db=crud_db'
									target='_blank'>
									Database Link
								</Link>
							</button>
						</div>
					</div>
					<UserList
						users={filteredUsers}
						handleDeleteModal={handleDeleteModal}
						handleDelete={handleDelete}
						handleEdit={handleEdit}
						handleStatusModal={handleStatusModal}
						isLoading={store.isLoading}
					/>
				</main>
			</div>

			{store.isDelete && (
				<ModalDelete
					handleDelete={handleDelete}
					users={users}
				/>
			)}
			{store.isArchive && (
				<ModalArchive
					// function:
					handleStatusEdit={handleStatusEdit}
					// values:
					setEditIs_Active={setEditIs_Active}
					editIs_Active={editIs_Active}
					users={users}
				/>
			)}
			{store.isEdit && (
				<ModalEditUser
					// function pass
					handleUpdate={handleUpdate}
					// is the id to edit
					setEditUserId={setEditUserId}
					// value pass : set
					setEditName={setEditName}
					setEditYearGraduated={setEditYearGraduated}
					setEditCourse={setEditCourse}
					setEditBirthDate={setEditBirthDate}
					setEditAddress={setEditAddress}
					setEditContactNo={setEditContactNo}
					setEditCurrentStatus={setEditCurrentStatus}
					setEditEmail={setEditEmail}
					// value pass : data
					editName={editName}
					editYearGraduated={editYearGraduated}
					editCourse={editCourse}
					editBirthDate={editBirthDate}
					editAddress={editAddress}
					editContactNo={editContactNo}
					editCurrentStatus={editCurrentStatus}
					editEmail={editEmail}
				/>
			)}
			{store.isAdd && (
				<ModalAddUser
					// function pass
					handleSubmit={handleSubmit}
					// value pass
					// text
					name={name}
					yearGraduated={yearGraduated}
					course={course}
					birthDate={birthDate}
					address={address}
					contactNo={contactNo}
					currentStatus={currentStatus}
					email={email}
					
					setName={setName}
					setYearGraduated={setYearGraduated}
					setCourse={setCourse}
					setBirthDate={setBirthDate}
					setAddress={setAddress}
					setContactNo={setContactNo}
					setCurrentStatus={setCurrentStatus}
					setEmail={setEmail}
					// bool
					is_Active={is_Active}
					setIs_Active={setIs_Active}
				/>
			)}

			{store.success && <Toast type='xl' />}
			{store.error && <ModalError position={"center"} />}
		</>
	);
};

export default MainHome;

import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { useUpdateTeamMutation, useDeleteTeamMutation } from "./teamsApiSlice"
//import  CreateNotice  from "./CreateNotice";
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { selectAllEmployees } from '../employees/employeesApiSlice'
import { useSelector } from 'react-redux'
import useAuth from "../../hooks/useAuth"
//import Modal from 'react-modal';
import Select from 'react-select';
//import "./Team.css";
import "./Modal.css";
import Modal from "./Modal"
 import "./EditTeam.css";
//Modal.setAppElement('#root');

const EditTeamForm = ({ team }) => {

    const { email, isManager, isAdmin, isEmployee } = useAuth()
    const employees = useSelector(selectAllEmployees)

    const [updateTeam, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateTeamMutation()

    const [deleteTeam, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteTeamMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(team.title)
    const [category, setCategory] = useState(team.category);
    const [description, setDescription] = useState(team.description);
    const [completed, setCompleted] = useState(team.completed)
    const [employeeId, setEmployeeId] = useState(team.members)
   // const [userEmailsSelected, setUserEmailsSelected]= useState(team.emails)
   // const [userEmailsSelected, setUserEmailsSelected]= useState([])
    const [employeeIdsSelected, setEmployeeIdsSelected]= useState(team.members)
   
//    const [showUserModal, setShowUserModal] = useState(false);
const [showModal, setShowModal] = useState(false);
const handleOpenModal = () => {
  setShowModal(true);
};

const handleCloseModal = () => {
  setShowModal(false);
};

    useEffect(() => {
       if (isSuccess || isDelSuccess) {
            setTitle('')
            setCategory('')
            setDescription('')
            setEmployeeId('')
            setEmployeeIdsSelected([])
            navigate('/dash/teams')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    
    const created = new Date(team.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(team.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = employees.map((user) => ({
        value: user.id,
        label: user.email,
        id: user.id,
      }));

      const assignedEmployeesList = (
    // <div>
    // <table>
         <tbody>
      {employeeIdsSelected?.length > 0 ? (
        employeeIdsSelected.map((employeeId) => {
          const user = employees.find((user) => user.id === employeeId);
          return (
            // <div key={employeeId}>
            <tr key={employeeId}>
                <td>
              <span>{user.email}</span>
              </td>
            <td>
              {isAdmin || isManager ? (
                <button
                  className="delete-btn"
                  onClick={() => handleUnselectUser(employeeId)}
                >
                  x
                </button>
              ) : null}
            {/* </div> */}
            </td>
            </tr>
          );
        })
      ) : (
        // <div>No employees assigned</div>
      <tr>
        <td colSpan="1">No employees assigned</td>
        </tr>
      )}
    {/* </div> */}
    </tbody>
    // </table>
  );
const handleUserSelection = (selectedOptions) => {
    const selectedEmployees = selectedOptions.map((selectedOption) => selectedOption.value);
    setEmployeeIdsSelected(selectedEmployees);
    };

    const handleUnselectUser = (employeeIds) => {
       setEmployeeIdsSelected((prev) => prev.filter((singleId) => singleId !== employeeIds));
        };

        const handleNotice = () =>{
           navigate(`/dash/teams/noticeList`); 
          // <CreateNotice />

           }

            // <Team key={teamId} teamId={teamId} />
      
      const canSave = [title, description, employeeId].every(Boolean) && !isLoading

        const onSaveTeamClicked = async (e) => {
            if (canSave) {
                await updateTeam({ id: team.id, title, description, category, members: employeeIdsSelected,  completed })
            }
        }
    
        const onDeleteTeamClicked = async () => {
            await deleteTeam({ id: team.id })
        }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validDescriptionClass = !description ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteTeamClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

    const content = (
        <>
            <p className={errClass}>{errContent}</p>
           {/* <button
               className="icon-button table__button"
               onClick={handleNotice} >
                 // <CreateNotice teamId={team.id} /> 
               <FontAwesomeIcon icon={<button
               className="icon-button table__button"
               onClick={handleNotice} >
               <FontAwesomeIcon icon={faPenToSquare} />
             </button>} />
             </button>  */}
                    
            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="team_title">
                    <h2>Team Name : {team.title}</h2>
                    {/* <div className="team-description"> */}
                    <h4>Description: {team.description}</h4>
                    {/* </div> */}

                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveTeamClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>
                <div className="details">
                <div className="generalInfo">
  <div className="cardHeader">
    <h2>General Information</h2>
    {/* <a href="#" className="btn">View All</a> */}
  </div>
    <table>
    {/* {isEmployee ? (  */}
     <thead>
      <tr>
        <td> 
       <p>
        <Link to="/dash/teams/noticeList">Notices</Link>
        </p> 
        </td>
        </tr>
        {isManager || isAdmin ? (
           <tr>
           <td>
           <p>
             <Link to="/dash/notices/createNotice">create Notice</Link>
             </p>
           </td>
           </tr>
       ) : null}
        <tr>
        <td>
        <p>
          <Link to="/dash/forms">View Forms</Link>
          </p>
        </td>
        </tr>
        </thead>
          {/* ) : null} */}
      {isManager || isAdmin ? ( 
        <tbody>
       <tr>
          <td>
            <label className="form__label" htmlFor="team-title">
              Title:
            </label>
          </td>
          <td>
            <input
              className={`form__input ${validTitleClass}`}
              id="team-title"
              name="title"
              type="description"
              autoComplete="off"
              value={title}
              onChange={onTitleChanged}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label className="team-catagory" htmlFor="team-category">
              Category:
            </label>
          </td>
          <td>
            <select
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="iphone">Cleaning Service</option>
              <option value="samsung">Dish Washing Service</option>
              <option value="xiomi">Cooking Service</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label className="team-description" htmlFor="team-description">
              Description:
            </label>
          </td>
          <td>
            <textarea
              className={`form__input form__input--description ${validDescriptionClass}`}
              id="team-description"
              name="description"
              value={description}
              onChange={onDescriptionChanged}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label className="team-workcompleted" htmlFor="team-workcompleted">
              WORK COMPLETE:
            </label>
          </td>
          <td>
            <input
              className="team-checkbox"
              id="team-workcompleted"
              name="completed"
              type="checkbox"
              checked={completed}
              onChange={onCompletedChanged}
            />
          </td>
        </tr>
          {/* <tr>
            <td colSpan="2">
              <button onClick={handleOpenModal}>Assign employees</button>
            </td>
          </tr> */}
        </tbody>
          ) : null}
     
    </table>

              </div>
              <div className="generalInfo">
              <div className="cardHeader">
                        <h2>Assign employees</h2>
                        <button className="btnAssignemployees" onClick={handleOpenModal}>Assign employees</button>
                     </div>
  <table className="recentEmployeesTable">
                     
                     {assignedEmployeesList}
     
                    </table>
              </div>

                {/* <div className="recentEmployees">
                    ///</div> <div className="cardHeader">
                    <div className="cardRecentEmployees">
                        <h2>Assign employees</h2>
                        <button onClick={handleOpenModal}>Assign employees</button>
                     </div>
                     <table className="recentEmployeesTable">
                     
                     {assignedEmployeesList}
     
                    </table>
                 </div> */}
            </div>
                    {/* ////////////////////// */}
                {/* <div className="form__row"> */}
                 
             
             
                    <div className="team-form-divider">
                        <p className="team-created">Created:<br />{created}</p>
                        {/* <p className="form__updated">Updated:<br />{updated}</p> */}
                    </div>
                    <div className="team-members">
                       
                       {/* <div className="team-members"> */}
                       {/* <label htmlFor="team-members">Assigned employees:</label>*/}
                       {/* <button onClick={() => setShowUserModal(true)}> Assign Employees</button> */}
                          {/* <button onClick={handleOpenModal}>Assign employees</button> */}

                       {/* </div> */}
                       {/* {assignedEmployeesList} */}
                       
                      {/* {showUserModal && ( */}
{/* {showModal && ( */}
<Modal isOpen={showModal} onRequestClose={handleCloseModal}>
    
   {/* <Modal
     isOpen={showUserModal}
     onRequestClose={() => setShowUserModal(false)}
   >   */}
     <button onClick={handleCloseModal}>Close</button>
     <h2>Assign employees</h2>
   <Select
     options={options}
     isMulti
     closeMenuOnSelect={false}
     onChange={handleUserSelection}
     defaultValue={options.filter((option) =>
       employeeIdsSelected.includes(option.value)
     )}
   />
   {/* <button onClick={() => setShowUserModal(false)}>Close</button> */}
 
 </Modal>
{/* )} */}

                   </div>
                {/* </div> */}
            </form>
        </>
    )

    return content
}

export default EditTeamForm

import { useState, useEffect } from "react"
import { useUpdateEmployeeMutation, useDeleteEmployeeMutation } from "./employeesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"

const EMPLOYEE_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditEmployeeForm = ({ employee }) => {

    const [updateEmployee, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateEmployeeMutation()

    const [deleteEmployee, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteEmployeeMutation()

    const navigate = useNavigate()

    const [employeename, setEmployeename] = useState(employee.employeename)
    const [validEmployeename, setValidEmployeename] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(employee.roles)
    const [active, setActive] = useState(employee.active)

    useEffect(() => {
        setValidEmployeename(EMPLOYEE_REGEX.test(employeename))
    }, [employeename])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setEmployeename('')
            setPassword('')
            setRoles([])
            navigate('/dash/employees')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onEmployeenameChanged = e => setEmployeename(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveEmployeeClicked = async (e) => {
        if (password) {
            await updateEmployee({ id: employee.id, employeename, password, roles, active })
        } else {
            await updateEmployee({ id: employee.id, employeename, roles, active })
        }
    }

    const onDeleteEmployeeClicked = async () => {
        await deleteEmployee({ id: employee.id })
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    let canSave
    if (password) {
        canSave = [roles.length, validEmployeename, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validEmployeename].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validEmployeeClass = !validEmployeename ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Employee</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveEmployeeClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteEmployeeClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="employeename">
                    Employeename: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validEmployeeClass}`}
                    id="employeename"
                    name="employeename"
                    type="text"
                    autoComplete="off"
                    value={employeename}
                    onChange={onEmployeenameChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

                <label className="form__label form__checkbox-container" htmlFor="employee-active">
                    ACTIVE:
                    <input
                        className="form__checkbox"
                        id="employee-active"
                        name="employee-active"
                        type="checkbox"
                        checked={active}
                        onChange={onActiveChanged}
                    />
                </label>

                <label className="form__label" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select ${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )

    return content
}
export default EditEmployeeForm
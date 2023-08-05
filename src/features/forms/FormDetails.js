import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectFormById } from './formApiSlice'
//import { selectAllForms } from '../forms/formsApiSlice'
import FormDetailsShow from './FormDetailsShow'
import useAuth from "../../hooks/useAuth";
//EditTeam
const FormDetails = () => {
    const { id } = useParams()

    const form = useSelector(state => selectFormById(state, id))
    const user = useAuth()

    //  const forms = useSelector(selectAllForms)

    const content = form && user.email ? <FormDetailsShow form={form} /> : <p>Loading...</p>

    return content
}
export default FormDetails
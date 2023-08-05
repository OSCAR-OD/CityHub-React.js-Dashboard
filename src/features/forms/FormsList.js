import { useGetFormsQuery } from "./formApiSlice"
import FormsListDetails from "./FormsListDetails"
import useAuth from "../../hooks/useAuth"

const FormsList = () => {

    const { email, isManager, isAdmin } = useAuth()

    const {
        data: forms,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetFormsQuery('formsList', {
       
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = forms

        let filteredIds
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
           // filteredIds = ids.filter(formId => entities[formId].email === email)
         //  filteredIds = ids.filter(formId => email.includes(entities[formId].email))
         filteredIds = ids.filter(formId => entities[formId].emails.includes(email))
        }

        const tableContent = ids?.length && filteredIds.map(formId => <FormsListDetails key={formId} formId={formId} />)

        content = (
            <table className="table table--forms">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th form__status">Status</th>
                        <th scope="col" className="table__th form__created">Created</th>
                        <th scope="col" className="table__th form__updated">Completed</th>
                        <th scope="col" className="table__th form__title">Title</th>
                        <th scope="col" className="table__th form__username">Email</th>
                        <th scope="col" className="table__th form__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default FormsList
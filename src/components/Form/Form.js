import FormInputs from './FormInputs'
import useFormContext from "../../hooks/useFormContext"
import { useSubmitFormMutation } from "../../features/forms/formApiSlice";
//import useSubmitFormMutation from "../../features/gforms/formApiSlice"
import {useNavigate} from 'react-router-dom';
const Form = () => {
    const navigate = useNavigate();
    const [submitForm, {
        isLoading,
        isSuccess,
        isError,
        error
        }] = useSubmitFormMutation();
    const {
        page,
        setPage,
        data,
        checkboxes,
        title,
        canSubmit,
        disablePrev,
        disableNext,
        prevHide,
        nextHide,
        submitHide
    } = useFormContext()

    const handlePrev = () => setPage(prev => prev - 1)

    const handleNext = () => setPage(prev => prev + 1)


    const handleSubmit = async e => {
        e.preventDefault()
        console.log(JSON.stringify(data))
        console.log(JSON.stringify(checkboxes))
    await submitForm({
        ...data,
        ...checkboxes,
    });
       navigate('/dash');
    };

    // const progressBarWidth = ((page - 1) / (title.length - 1)) * 100; // Calculate the width based on the current page
    const progressBarWidth = ((page - 1) / (Object.keys(title).length - 1)) * 100;


    const content = (
        <form className="form flex-col" onSubmit={handleSubmit}>

            <header className="form-header">
     
 <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progressBarWidth}%` }}></div>
        </div>

                <h2>{title[page]}</h2>
                </header>
                <div className="button-container">

                    <button type="button" className={`button ${prevHide}`} onClick={handlePrev} disabled={disablePrev}>Prev</button>

                    <button type="button" className={`button ${nextHide}`} onClick={handleNext} disabled={disableNext}>Next</button>

                    <button type="submit" className={`button ${submitHide}`} disabled={!canSubmit}>Submit</button>
                </div>
           
            

            <FormInputs />

        </form>
    )

    return content
}
export default Form
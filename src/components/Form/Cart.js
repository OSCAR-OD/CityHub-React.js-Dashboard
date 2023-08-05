import FormInputs from './FormInputs'
import useFormContext from "../../hooks/useFormContext"
//import useSubmitFormMutation from "../../features/gforms/formApiSlice"
const Cart = () => {
    const { data, handleChange } = useFormContext()

      const content = (
        <>
        <div className="cart">
                <div className="head"><p>My Cart</p></div>
               <div className="foot">
                    <h3>Total</h3>
                    {/* <input type="checkbox" checked={checkboxes[name]} onChange={handleChange} />
                */}
                    {/* <input type="checkbox"  onChange={handleChange} />
                     */}
                    <h2 id="total"><p>Amount: {data.amount}</p></h2>
                   
                
                </div> 
            </div>
            </>
    )

    return content
}
export default Cart
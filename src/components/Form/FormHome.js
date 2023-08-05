import Form from './Form'
import Cart from './Cart'
import './FormHome.css'
import { FormProvider } from '../../context/FormContext'
const FormHome = () => {
    return (
        // <div className="home">
            <FormProvider>   
            <div className="formDetails">
           <div className="formGeneralInfo">
           <div className="formCardHeader">
               <Form />
            </div>
          </div>
        
          
        <div className="formCartInfo">
        <div className="formCartHeader">
              <Cart />
                </div>
        </div>
          </div>
          </FormProvider>  
        // </div>
      );
}
export default FormHome




// import { createContext, useContext, useState, useEffect } from "react";

// export const CheckboxContext = createContext();

// export const CheckboxProvider = ({ children }) => {
//   const [checkboxes, setCheckboxes] = useState({});

//   const toggleCheckbox = (name, value) => {
//     setCheckboxes((prevCheckboxes) => ({
//       ...prevCheckboxes,
//       [name]: value,
//     }));
//   };

//   const totalValue = Object.values(checkboxes)
//     .filter(Boolean)
//     .reduce((total, value) => total + parseInt(value), 0);

//   return (
//     <CheckboxContext.Provider value={{ checkboxes, toggleCheckbox, totalValue }}>
//       {children}
//     </CheckboxContext.Provider>
//   );
// };

// const Checkbox = ({ name, value }) => {
//   const { checkboxes, toggleCheckbox } = useContext(CheckboxContext);

//   const handleChange = (event) => {
//     const isChecked = event.target.checked;
//     toggleCheckbox(name, isChecked ? value : undefined);
//   };

//   return (
//     <div>
//       <label>
//         <input
//           type="checkbox"
//           name={name}
//           value={value}
//           checked={!!checkboxes[name]}
//           onChange={handleChange}
//         />
//         {name}
//       </label>
//     </div>
//   );
// };

// const CheckboxList = () => {
//   const { totalValue } = useContext(CheckboxContext);
//   const [data, setData] = useState({
//     amount: 0,
//   });

//   useEffect(() => {
//     setData(prevData => ({ ...prevData, amount: totalValue }));
//   }, [totalValue]);

//   return (
//     <div>
//       <Checkbox name="checkbox1" value={5} />
//       <Checkbox name="checkbox2" value={8} />
//       <Checkbox name="checkbox3" value={10} />
//       <Checkbox name="checkbox4" value={15} />
//       <Checkbox name="checkbox5" value={20} />
//       <p>Total value: {totalValue}</p>
//       <p>Amount: {data.amount}</p>
//     </div>
//   );
// };


// const FormHome = () => {
//   return (
//     <CheckboxProvider>
//       <CheckboxList />
//     </CheckboxProvider>
//   );
// };

// export default FormHome;







// //ncode
//  import { createContext, useContext, useState, useEffect } from "react";
//  import CheckboxContext from './CheckboxContext'
//  import CheckboxProvider from './CheckboxContext'
 
//  const Checkbox = ({ name, value }) => {
//   const { checkboxes, setCheckboxes } = useContext(CheckboxContext);

//   const handleChange = (event) => {
//     const isChecked = event.target.checked;
//     setCheckboxes((prevCheckboxes) => ({
//       ...prevCheckboxes,
//       [name]: isChecked ? value : undefined,
//     }));
//   };

//   return (
//     <div>
//       <label>
//         <input
//           type="checkbox"
//           name={name}
//           value={value}
//           checked={!!checkboxes[name]}
//           onChange={handleChange}
//         />
//         {name}
//       </label>
//     </div>
//   );
// };

// const CheckboxList = () => {
//   const { totalValue, checkboxes, data } = useContext(CheckboxContext);

//   return (
//     <div>
//       <Checkbox name="checkbox1" value={5} />
//       <Checkbox name="checkbox2" value={8} />
//       <Checkbox name="checkbox3" value={10} />
//       <Checkbox name="checkbox4" value={15} />
//       <Checkbox name="checkbox5" value={20} />
//       <p>Total value: {totalValue}</p>
//       <p>Amount: {data.amount}</p>
//     </div>
//   );
// };

// const FormHome = () => {
//   return (
//     <CheckboxProvider>
//       <CheckboxList />
//     </CheckboxProvider>
//   );
// };

// export default FormHome;
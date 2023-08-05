import React, { useContext, useEffect } from 'react';
import  useFormContext  from '../../context/FormContext';

const Checkbox = ({ name, value }) => {
  const { data, setData, checkboxes, toggleCheckbox, totalValue } = useFormContext();

  const handleChkChange = (event) => {
    const isChecked = event.target.checked;
    toggleCheckbox(name, isChecked ? value : undefined);
  };

  useEffect(() => {
    setData(prevData => ({ ...prevData, amount: totalValue }));
  }, [totalValue]);

  return (
 
      <label>
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={!!checkboxes[name]}
          onChange={handleChkChange}
        />
        {name}
      </label>
  
  );
};

export default Checkbox;

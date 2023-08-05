import React, { useContext } from 'react';
import { CheckboxContext } from './CheckboxContext';

const Checkbox = ({ name }) => {
  const { checkboxes, toggleCheckbox } = useContext(CheckboxContext);

  const handleChange = () => {
    toggleCheckbox(name);
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={checkboxes[name]} onChange={handleChange} />
        {name}
      </label>
    </div>
  );
};

const CheckboxList = () => {
  const { totalValue } = useContext(CheckboxContext);

  return (
    <div>
      <Checkbox name="checkbox1" />
      <Checkbox name="checkbox2" />
      <Checkbox name="checkbox3" />
      <Checkbox name="checkbox4" />
      <Checkbox name="checkbox5" />
      <p>Total value: {totalValue}</p>
    </div>
  );
};



export default CheckboxList;

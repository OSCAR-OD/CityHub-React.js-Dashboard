import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField } from './formSlice';
const  Page2= () => {
  const dispatch = useDispatch();
  const { address, city, state, zip } = useSelector((state) => state.form.page2);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateFormField({ page: 'page2', field: name, value }));
  };

  return (
    <div>
      <input type="text" name="address" value={address} onChange={handleInputChange} />
      <input type="text" name="city" value={city} onChange={handleInputChange} />
      <input type="text" name="state" value={state} onChange={handleInputChange} />
      <input type="text" name="zip" value={zip} onChange={handleInputChange} />
    </div>
  );
}

export default Page2
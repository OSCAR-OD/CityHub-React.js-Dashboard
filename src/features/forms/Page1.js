import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField } from './formSlice';
import { memo } from 'react'


const  Page1 = () => {
  const dispatch = useDispatch();
  const { firstName, lastName, email } = useSelector((state) => state.formSlice.page1);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateFormField({ page: 'page1', field: name, value }));
  };

  return (
    <div>
      <input type="text" name="firstName" value={firstName} onChange={handleInputChange} />
      <input type="text" name="lastName" value={lastName} onChange={handleInputChange} />
      <input type="text" name="email" value={email} onChange={handleInputChange} />
    </div>
  );
}
//const memoizedUser = memo(Page1)

//export default memoizedUser
export default Page1
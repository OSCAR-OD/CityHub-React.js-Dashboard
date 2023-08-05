import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField } from './formSlice';

function Page3() {
  const dispatch = useDispatch();
  const { username, password, confirmPassword } = useSelector((state) => state.form.page3);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateFormField({ page: 'page3', field: name, value }));
};

return (
<div>
<input type="text" name="username" value={username} onChange={handleInputChange} />
<input type="password" name="password" value={password} onChange={handleInputChange} />
<input type="password" name="confirmPassword" value={confirmPassword} onChange={handleInputChange} />
</div>
);
}

export default Page3
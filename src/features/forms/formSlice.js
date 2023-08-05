import { createSlice } from '@reduxjs/toolkit';

const initialFormState = {
  page1: {
    firstName: '',
    lastName: '',
    email: '',
  },
  page2: {
    address: '',
    city: '',
    state: '',
    zip: '',
  },
  page3: {
    username: '',
    password: '',
    confirmPassword: '',
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState: initialFormState,
  reducers: {
    updateFormField(state, action) {
      const { page, field, value } = action.payload;
      state[page][field] = value;
    },
  },
});

export const { updateFormField } = formSlice.actions;
export default formSlice.reducer;

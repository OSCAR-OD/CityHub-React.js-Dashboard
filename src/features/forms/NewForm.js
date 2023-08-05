import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { useSubmitFormMutation } from './formApiSlice';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
//import { memo } from 'react'

const MultiPageForm= () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [submitForm, { isLoading }] = useSubmitFormMutation();
  const formState = useSelector((state) => state.form);

  const handleNextClick = () => {
    setCurrentPage((page) => page + 1);
  };

  const handlePreviousClick = () => {
    setCurrentPage((page) => page - 1);
  };

  const handleSubmit = async () => {
    try {
      await submitForm(formState);
      alert('Form submitted successfully');
    } catch (error) {
      alert('Error submitting form');
    }
  };

  return (
    <div>
      {currentPage === 1 && <Page1 />}
      {currentPage === 2 && <Page2 />}
      {currentPage === 3 && <Page3 />}

      {currentPage > 1 && <button onClick={handlePreviousClick}>Previous</button>}
      {currentPage < 3 && <button onClick={handleNextClick}>Next</button>}
      {currentPage === 3 && (
        <button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      )}
    </div>
  );
}


//const memoizedMultiPageForm = memo(MultiPageForm)

//export default memoizedMultiPageForm
export default MultiPageForm;
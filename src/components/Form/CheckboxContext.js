import React, { createContext, useContext, useState, useEffect } from "react";

const CheckboxContext = createContext({
  checkboxes: {},
  setCheckboxes: () => {},
  totalValue: 0,
});

const CheckboxProvider = ({ children }) => {
  const [checkboxes, setCheckboxes] = useState({});
  
  const toggleCheckbox = (name, value) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: value,
    }));
  };
  
  const totalValue = Object.values(checkboxes)
    .filter(Boolean)
    .reduce((total, value) => total + parseInt(value), 0);

  const [data, setData] = useState({
    amount: 0,
  });

  useEffect(() => {
    setData((prevData) => ({ ...prevData, amount: totalValue }));
  }, [totalValue]);

  return (
    <CheckboxContext.Provider
      value={{ checkboxes, setCheckboxes, totalValue }}
    >
      {children}
    </CheckboxContext.Provider>
  );
};

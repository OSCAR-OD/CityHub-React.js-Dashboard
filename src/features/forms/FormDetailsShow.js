import React from 'react';
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { selectAllEmployees } from '../employees/employeesApiSlice'
import { useSelector } from 'react-redux'
import useAuth from "../../hooks/useAuth"
import { useReactToPrint } from "react-to-print";

//EditTeamForm
const FormDetailsShow = ({ form }) => {

    const { email, isManager, isAdmin } = useAuth()
    const employees = useSelector(selectAllEmployees)
    
  const ref = React.useRef(null);

    const handlePrint = useReactToPrint({
        content: () => ref.current
    });
    const navigate = useNavigate()

    const content = (
        <>
       
  <button onClick={handlePrint}>Print</button>
            <div ref={ref}>
                <h2>Form Details</h2>
                <p>billFirstName: {form.billFirstName}</p>
                 <p>billLastName: {form.billLastName}</p>
                 <p>billAddress1: {form.billAddress1}</p>


                <p>Title: {form.user}</p>
                <p>Title: {form.amount}</p>
               
              <p>Title: {form.billFirstName}</p>
          <p>Title: {form.billFirstName}</p>
               
                <p>Title: {form.billFirstName}</p>
                <p>Title: {form.billFirstName}</p>
                <p>Title: {form.billFirstName}</p>
                <p>Title: {form.billFirstName}</p>
                <p>Title: {form.billFirstName}</p>
         </div>
        </>
    )

    return content
}

export default FormDetailsShow

import React, {useEffect, useState} from 'react'
import {  fetchUpdateCustomers,fetchDataCustomers} from '../redux/customerSlice'
import { useDispatch, useSelector } from 'react-redux'

const Modal = ({setEditModal, editData}) => {
    const [data, setData] = useState({
        id : editData.id,
        companyName:editData.companyName,
        taxNumber:editData.taxNumber, 
        taxOffice:editData.taxOffice, 
        invoiceCount:editData.invoiceCount,
         contactNumber:editData.contactNumber
        })
    const dispatch = useDispatch() 
    const {language} = useSelector(state => state.language)  
  
    const close = () => {
        setEditModal(false)
        document.body.classList.remove('modal-active');
    }
    const addCustomerHandle = (e) => {
        e.preventDefault()
        dispatch(fetchUpdateCustomers({data}))
        setData({companyName:'',taxNumber:'', taxOffice:'', invoiceCount:'', contactNumber:''})   
        setEditModal(false)
        document.body.classList.remove('modal-active');
    }
   
  
  return (
    <div  className="modal">
        <div className="modal__content">
            <div className='modal__header'>
                <h3>{language[0].editCustomer}</h3>  
                <div className='underline  mb-3'></div> 
                <button className='modal__close' onClick={close} ><i class="fa fa-close"></i></button>               
            </div>         
            <div className="modal__body">
                <div className="formbold-form-wrapper">
                    <form onSubmit={addCustomerHandle} >
                    <div className="formbold-mb-5">
                        <label htmlFor="companyName" className="formbold-form-label">{language[0].companyName} </label>
                        <input
                        type="text"
                        name="companyName"
                        placeholder={language[0].companyName}
                        className="formbold-form-input"
                        value={data.companyName}
                        onChange={(e) => setData({...data, companyName : e.target.value})}
                        />
                    </div>

                    <div className="formbold-mb-5">
                        <label htmlFor="taxNumber" className="formbold-form-label"> {language[0].taxNumber} </label>
                        <input
                        type="text"
                        name="taxNumber"
                        placeholder={language[0].taxNumber}
                        className="formbold-form-input"
                        value={data.taxNumber}
                        onChange={(e) => setData({...data, taxNumber : e.target.value})}
                        />
                    </div>

                    <div className="formbold-mb-5">
                        <label htmlFor="taxOffice" className="formbold-form-label"> {language[0].taxOffice} </label>
                        <input
                        type="text"
                        name="taxOffice"
                        placeholder={language[0].taxOffice}
                        className="formbold-form-input"
                        value={data.taxOffice}
                        onChange={(e) => setData({...data, taxOffice : e.target.value})}
                        />
                    </div>

                    <div className="formbold-mb-5">
                        <label htmlFor="invoiceCount" className="formbold-form-label">{language[0].invoiceCount} </label>
                        <input
                        type="text"
                        name="invoiceCount"
                        placeholder={language[0].invoiceCount}
                        className="formbold-form-input"
                        value={data.invoiceCount}
                        onChange={(e) => setData({...data, invoiceCount : e.target.value})}
                        />
                    </div>

                    <div className="formbold-mb-5">
                        <label htmlFor="contactNumber" className="formbold-form-label">{language[0].contactNumber} </label>
                        <input
                        type="text"
                        name="contactNumber"
                        placeholder={language[0].contactNumber}
                        className="formbold-form-input"
                        value={data.contactNumber}
                        onChange={(e) => setData({...data, contactNumber : e.target.value})}
                        />
                    </div>

                    <div className='modal__footer'>
                        <button type='submit' className="btn btn-danger">{language[0].update}</button>
                    </div>
                    </form>
                </div>
            </div> 
        </div>
    </div>
  )
}

export default Modal
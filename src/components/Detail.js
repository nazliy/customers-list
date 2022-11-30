import React, {useEffect} from 'react'
import {fetchGetCustomerId} from '../redux/customerSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Detail = () => {
    const {detailCustomer, loading} = useSelector(state => state.customers) 
    const dispatch = useDispatch()
    const {id} = useParams()
    const {language} = useSelector(state => state.language)  

    useEffect(()=> {
        dispatch( fetchGetCustomerId(id))
      },[])

  return (
    <main>        
        <div className='row mb-3'>
            <h2>{language[0].customerDetail}</h2>
            <div className='underline'></div>
        </div>
        <div className='row detail-table'>
            <table>
                <thead>
                    <tr>
                    <th>{language[0].companyName}</th>
                    <th>{language[0].taxNumber}</th>
                    <th>{language[0].taxOffice}</th>
                    <th>{language[0].invoiceCount}</th>
                    <th>{language[0].contactNumber}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{detailCustomer.companyName}</td>
                    <td>{detailCustomer.taxNumber}</td>
                    <td>{detailCustomer.taxOffice}</td>
                    <td>{detailCustomer.invoiceCount}</td>
                    <td>{detailCustomer.contactNumber}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
  )
}

export default Detail
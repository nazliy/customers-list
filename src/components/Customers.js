import React, {useEffect, useState} from 'react'
import { fetchDataCustomers, fetchDeleteCustomers, searchItem, sortByItemAZ, sortByItemZA} from '../redux/customerSlice'
import { useDispatch, useSelector } from 'react-redux'
import NewModal from './NewModal'
import EditModal from './EditModal'
import  {Link} from 'react-router-dom'

const Customers = () => {
  const [showModal, setShowModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState(true)

  const [editData, setEditData] = useState({companyName:'',taxNumber:'', taxOffice:'', invoiceCount:'', contactNumber:''})
  const {customer, loading, searchMsg} = useSelector(state => state.customers) 
  const {language} = useSelector(state => state.language)     
  const dispatch = useDispatch()  
 
  const newCustomer = () => {
    setShowModal(true)
    document.body.classList.add('modal-active');
  }
  const deleteCustomer = (id) => {
    dispatch(fetchDeleteCustomers(id))
  }
  const editCustomer = (item) => {
   const {id, companyName, taxNumber, taxOffice, invoiceCount, contactNumber } = item
    setEditModal(true)
    setEditData({
      id : id,
      companyName : companyName,
      taxNumber : taxNumber,
      taxOffice : taxOffice,
      invoiceCount : invoiceCount,
      contactNumber : contactNumber
    })
    window.scrollTo(0, 0);
    document.body.classList.add('modal-active');
  }

  const searchHandle = (search) => {
    if(search === ''){
      dispatch(fetchDataCustomers())
    }else{
      dispatch(searchItem(search))
    }
  }
  const sortBy = () => {   
    if(sort){
      dispatch(sortByItemAZ())
      setSort(false)
    }else
    {
      dispatch(sortByItemZA())  
      setSort(true)
    }
  }
  
  useEffect(()=> {
    dispatch(fetchDataCustomers())
  },[])
  
  return (
    <div className="container">
        <div className='row text-align'>
          <button className='btn btn-success' onClick={newCustomer}>{language[0].newCustomer}</button>
        </div>
        <div className='row'>
          <h1>{language[0].customerList}</h1>
        </div>
        <div className='row row-customer'>
          <div className='search mb-3' >
            <input type="text" className="textbox" 
              value={search} 
              placeholder= {language[0].companyName + `  &&  ` + language[0].taxNumber}  
              onChange={(e) => setSearch(e.target.value) }
            />
            <button type="submit" className="button" onClick={() => searchHandle(search)}>
              <i className="fa fa-search"></i>
            </button>
          </div>
          <div>
            <table className="rwd-table">
                <tbody>
                    <tr>
                        <th className='sort-icon'>
                          {language[0].companyName}
                          <button onClick={sortBy}>
                            {
                              sort ? <i className="fa fa-arrow-up-a-z"></i> : <i className="fa fa-arrow-up-z-a"></i>
                            }
                          </button>                          
                        </th>
                        <th>{language[0].taxNumber}</th>
                        <th>{language[0].taxOffice}</th>
                        <th>{language[0].invoiceCount}</th>
                        <th>{language[0].contactNumber}</th>
                        <th></th>
                    </tr>
                    {
                      customer && customer.map((item, index) => {
                        return(
                          <tr key={index}>
                            <td>{item.companyName}</td>
                            <td>{item.taxNumber}</td>
                            <td>{item.taxOffice}</td>
                            <td>{item.invoiceCount}</td>
                            <td>{item.contactNumber}</td>
                            <td className='tableBtn'>
                              <Link className='btn btn-info' to={`/customer/${item.id}`} >{language[0].detail}</Link>
                              <button className='btn btn-default' onClick={() => editCustomer(item )}>{language[0].edit}</button>
                              <button className='btn btn-primary' onClick={() => deleteCustomer(item.id)}>{language[0].delete}</button>
                            </td>
                          </tr>
                        )
                      })
                    }
                </tbody>
            </table>
          </div>
        </div>
        {
          loading && (
            <div className='row text-center mt-3'> 
              <p>{language[0].loading}</p>
            </div>
          )
        }
        {
          showModal && <NewModal  setShowModal={setShowModal}/>
        }
        {
          editModal && <EditModal  setEditModal={setEditModal} editData={editData} />
        }
        {
          searchMsg && (
            <div className='row text-center mt-3'> 
              <p> {language[0].searchWarning}</p>
            </div>
          )
        }
    </div>
  )
}

export default Customers
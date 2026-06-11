import { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { getCustomerDetails } from '../../services/admin-api-service/customerApi'


const Customers = () => {

    const [customers, setCustomers] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const itemPerPage = 6


    const indexOfLastItem = currentPage * itemPerPage
    const indexOfFirstItem = indexOfLastItem - itemPerPage
    const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(customers.length / itemPerPage)


    useEffect(() => {
        try {
            const loadCustomers = async () => {
                const data = await getCustomerDetails()
                setCustomers(data || [])
            }
            loadCustomers()
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <>
         <div className="admin_products_table-container">

            <div className="customers-container">
                <div className="customers_table_heading">
                    <h1 className="customers_table_title">Customers List</h1>
                    <p>Manage All Your Caustomers</p>
                </div>
                <div className="customers-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Joined On</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map(cust => (
                                <tr key={cust._id}>
                                    <td>{cust.name}</td>
                                    <td>{cust.email}</td>
                                    <td>{cust.phone || `"Not added"`}</td>
                                    <td>{cust.createdAt ? cust.createdAt.split('T')[0] : ''}</td>
                                    <td>
                                        <button className="action-btn show-btn"><FaEye /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                <div className="admin_products_pagination">
                    <button className="pagination_arrow" onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1}>&lt;</button>
                    <div className="pagination_numbers">

                        {[...Array(totalPages)].map((_, i) => (
                            <button key={i} className={`pagination_number ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                        ))}
                    </div>
                    <button className="pagination_arrow" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>&gt;</button>
                </div>
            </div >
         </div>
        </>
    )
}

export default Customers
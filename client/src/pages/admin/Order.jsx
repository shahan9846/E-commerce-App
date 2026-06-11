import React from 'react'
import { useEffect, useState } from 'react'
import { FaEdit, FaEye } from 'react-icons/fa'
import { getOrderDetails, addDeliveryStatus } from '../../services/admin-api-service/OrdersApi'

const Order = () => {
    const [orders, setOrders] = useState([])
    const [edit, setEdit] = useState(false)
    const [status, setStatus] = useState({});

    const [currentPage, setCurrentPage] = useState(1)
    const itemPerPage = 6


    const indexOfLastItem = currentPage * itemPerPage
    const indexOfFirstItem = indexOfLastItem - itemPerPage
    const currentItems = orders?.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(orders?.length / itemPerPage)

    const deliveryStatus = (orderId,productId, e) => {
        setStatus({ orderId,productId, status: e.target.value });
    }
        ;


    useEffect(() => {
        if (!status.orderId) return;
        const update = async () => {
            try {
                await addDeliveryStatus(status.orderId,status.productId, status.status);
                const data = await getOrderDetails();
                setOrders(data);
            } catch (error) {
                console.log(error.message);
            }
        };
        update();
    }, [status]);


    useEffect(() => {
        try {
            const loadOrders = async () => {
                const data = await getOrderDetails()
                console.log(data)
                setOrders(data)
            }
            loadOrders()
        } catch (error) {
            console.log(error.message)
        }
    }, [])
    return (
        <>
            <div className="admin_products_table-container">

                <div className="admin_order_table-container">
                    <div className="admin_order_table_table_heading">
                        <h1 className="admin_order_table_table_title">Orders List</h1>
                        <p>Manage All Orders</p>
                    </div>
                    <div className="admin_order_table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Total Amount</th>
                                    <th>Payment</th>
                                    <th>status</th>
                                    <th>Order Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems?.map(order => (

                                    order?.orderItems.map(item => (

                                        <tr key={`${order._id}-${item._id}`}>
                                            <td>#{order._id}</td>
                                            <td>{order.user.name}</td>
                                            <td>{order.user.email}</td>
                                            <td>{order.user.phone || "'Not added'"}</td>
                                            <td>₹{item.price}</td>
                                            <td>{order.paymentStatus}</td>
                                            <td>
                                                {/* {edit && */}
                                                <select name="" id="" style={{ width: '100px', borderRadius: '3px', padding: '3px', fontSize: '10px' }} value={item.deliveryStatus} onChange={(e) => deliveryStatus(order._id, item._id, e)}>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Processing">Processing</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Out for Delivery">Out of Delivery</option>
                                                    <option value="Delivered">Delivered</option>
                                                    {/* <option value="Cancelled">Cancelled</option> */}
                                                </select>
                                                {/* } */}
                                            </td>
                                            <td>{order.createdAt.split('T')[0]}</td>
                                            <td>
                                                <button className="action-btn edit-btn" onClick={() => setEdit(true)}><FaEdit /></button>

                                                <button className="action-btn show-btn"><FaEye /></button>
                                            </td>
                                        </tr>
                                    ))

                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="admin_products_pagination">
                        <button className="pagination_arrow" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>&lt;</button>
                        <div className="pagination_numbers">
                            {[...Array(totalPages || 1)].map((_, i) => (
                                <button key={i} className={`pagination_number ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                            ))}
                        </div>
                        <button className="pagination_arrow" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages || 1))} disabled={currentPage === totalPages}>&gt;</button>
                    </div>
                </div >
            </div >
        </>
    )
}

export default Order
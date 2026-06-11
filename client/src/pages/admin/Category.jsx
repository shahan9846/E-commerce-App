import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import { addCategory, fetchCategory, deleteCategory, categoryEditId } from '../../services/admin-api-service/categoryApi'

const Category = () => {

    const [receiveData, setReceiveData] = useState([])
    const [isActive, setIsActive] = useState(false)
    const [editId, setEditId] = useState(null)

    const [categoryData, setCategoryData] = useState({
        name: '',
        description: ''
    })

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    
    const inputValue = (event) => {
        setCategoryData(previous => ({ ...previous, [event.target.name]: event.target.value }))
    }

    const submitCategory = async (event) => {
        // console.log(categoryData);
        event.preventDefault()

        try {
            if (editId) {
                const data = await categoryEditId(editId, categoryData)
                console.log(data)
                setReceiveData(receiveData.map(cat => cat._id === editId ? data.category : cat))
                setEditId(null)
                alert(data.message)

            } else {

                const resp = await addCategory(categoryData);
                const newCat = resp.category || resp;
                setReceiveData(prev => [...prev, newCat]);
                setCategoryData({ name: '', description: '' });
                setIsActive(false);
                setEditId(null);
                // Use message if provided
                if (resp.message) {
                    alert(resp.message);
                }
            }



        } catch (err) {
            console.log(err);
        }
    }

    const categoryDelete = async (id) => {
        console.log(id)
        try {
            const data = await deleteCategory(id)
            setReceiveData(receiveData.filter(cat => cat._id !== id))
            alert(data.message)
        } catch (error) {
            console.log(error.message)

        }
    }

    const categoryEdit = async (id) => {

        try {
            const categoryToEdit = receiveData.find(cat => cat._id === id)

            setCategoryData({
                name: categoryToEdit.name,
                description: categoryToEdit.description,
            })
            setIsActive(!isActive)

            setEditId(id)

            // const data = await editCategory(id)
        } catch (error) {

        }
    }



    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = receiveData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(receiveData.length / itemsPerPage);

  
    const closePopup = () => {
        if (!categoryData.name || !categoryData.description) {
            // validation failed, keep popup open
            return;
        }
        setIsActive(false);
    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCategory()
                setReceiveData(data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, [])

    return (
        <>
            <div className="admin_products_table-container">
                <div className="admin_products_table_top">
                    <div className="admin_products_table_heading">
                        <h1 className="admin_products_table_title">Category</h1>
                        <p>Manage All Your Categories</p>
                    </div>
                    <div className="admin_products_add_btn">
                        <button onClick={() => setIsActive(!isActive)}>Add Category +</button>
                    </div>
                </div>

                {/* <div className="category-filter_section">
                    <input type="text" placeholder='Search Category' />
                    <button>Filter</button>
                    <button>Reset</button>
                </div> */}

                <div className="admin_products_table_body">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((category) => (
                                    <tr key={category._id}>
                                        <td>{category.name}</td>
                                        <td>{category.description}</td>
                                        <td>
                                            <button className="action-btn edit-btn" onClick={() => categoryEdit(category._id)}><FaEdit /></button>
                                            {/* <button className="action-btn show-btn"><FaEye /></button> */}
                                            <button className="action-btn delete-btn" onClick={() => categoryDelete(category._id)}><FaTrash /></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ color: '#919191ff' }}>No categories found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="admin_products_pagination">
                    <button
                        className="pagination_arrow"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </button>

                    <div className="pagination_numbers">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                className={`pagination_number ${currentPage === i + 1 ? 'active' : ''}`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        className="pagination_arrow"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        &gt;
                    </button>
                </div>
            </div>

            <div className={`category-slider ${isActive ? 'open' : ''}`}>
                <div className="category-header_section">
                    <h2>Add Category</h2>
                    <button onClick={() => setIsActive(!isActive)}>×</button>
                </div>
                <form action="" onSubmit={submitCategory} className='category-slider_form'>
                    <div className="category-input-groups">
                        <label >Name</label><br />
                        <input type="text" name='name' value={categoryData.name} onChange={inputValue} required />
                    </div>
                    <div className="category-input-groups">
                        <label >Description</label><br />
                        <input type="text" name='description' value={categoryData.description} onChange={inputValue} required />
                    </div>
                    <button type="submit" className='category-slider_form-btn' onClick={closePopup}>Add</button>
                </form>

            </div>
        </>
    )
}

export default Category
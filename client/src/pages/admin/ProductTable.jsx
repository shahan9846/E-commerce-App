import react, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchProducts, productDelete, fetchProductById } from '../../services/admin-api-service/productApi'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import perfume from '../../assets/images/perfume.png'
const ProducTable = () => {

    const [products, setProducts] = useState([])
    const [singleProduct, setSingleProduct] = useState(null)

    const [openModal, setOpenModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const navigate = useNavigate()

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts();
            console.log(data)
            setProducts(data)
        }
        loadProducts();

    }, [])

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const deleteProduct = async (id) => {
        try {
            await productDelete(id)
            alert('Successfully Delete')
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (id) => {
        navigate(`/product-add/${id}`)
    }

    const openProductModal = async (id) => {
        const openedProduct = await fetchProductById(id)
        console.log(openedProduct)
        setSingleProduct(openedProduct)
        setOpenModal(true)
    }

    return (
        <>
            <div className="admin_products_table-container">
                <div className="admin_products_table_top">
                    <div className="admin_products_table_heading">
                        <h1 className="admin_products_table_title">Products</h1>
                        <p>Manage All Your Products</p>
                    </div>
                    <div className="admin_products_add_btn">
                        <Link to="/product-add">Add Product +</Link>
                    </div>
                </div>
                <div className="admin_products_table_body">
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Stock</th>
                                <th>Price</th>
                                <th>Sale Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((product) => (
                                    <tr key={product._id}>
                                        <td>
                                            <div className="product-info-cell">
                                                <div className="product_image_section">

                                                    <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} />
                                                </div>
                                                <span>{product.name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            {product.category ? product.category.name : "No Category"}
                                        </td>
                                        <td>{product.stock}</td>
                                        <td>₹{product.price}</td>
                                        <td>₹{product.salePrice}</td>
                                        <td>{product.stock > 0 ? "In Stock" : "Out of Stock"}</td>
                                        <td>
                                            <button className="action-btn edit-btn" onClick={() => handleEdit(product._id)}><FaEdit /></button>
                                            <button className="action-btn show-btn" onClick={() => openProductModal(product._id)}><FaEye /></button>
                                            <button className="action-btn delete-btn" onClick={() => deleteProduct(product._id)}><FaTrash /></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={{ color: '#919191ff' }}>No products found</td>
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

            {openModal &&
                <div className="admin_product_table_overlay">
                    <div className="admin_product_table_box">
                        <div className="admin_product_table_top">
                            <h1 className="admin_product_table_title">View Product Details</h1>
                            <button className="admin_product_table_btn" onClick={() => setOpenModal(false)}>×</button>
                        </div>
                        <div className="admin_product_table_body">
                            <div className="admin_product_table_image">
                                <img src={`http://localhost:5000/uploads/${singleProduct.image}`} alt="" />
                            </div>
                            <div className="admin_product_table_info">
                                <div className="admin_product_table_rows">
                                    <h1>Product *</h1>
                                    <p>{singleProduct.name}</p>
                                </div>
                                <div className="admin_product_table_rows">
                                    <h1>Category *</h1>
                                    <p>{singleProduct.category ? singleProduct.category.name : 'No Category added'}</p>
                                </div>

                                <div className="admin_product_table_rows columns">
                                    <div className="admin_product_table_columns">
                                        <h1>Stock *</h1>
                                        <p>{singleProduct.stock}</p>
                                    </div>
                                    <div className="admin_product_table_columns">
                                        <h1>Status *</h1>
                                        <p>{singleProduct.stock > 0 ? 'In Stock' : 'Out Of Stock'}</p>
                                    </div>
                                </div>

                                <div className="admin_product_table_rows columns">
                                    <div className="admin_product_table_columns">
                                        <h1>Price *</h1>
                                        <p>₹{singleProduct.price}</p>
                                    </div>
                                    <div className="admin_product_table_columns">
                                        <h1>Sale Price *</h1>
                                        <p>₹{singleProduct.salePrice}</p>
                                    </div>
                                </div>

                                <div className="admin_product_table_rows">
                                    <h1>Description *</h1>
                                    <p>{singleProduct.description}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default ProducTable
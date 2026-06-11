import react, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCategory } from '../../services/admin-api-service/categoryApi'
import { fetchProductById, createProduct, updateProduct } from '../../services/admin-api-service/productApi'

const ProductAdd = () => {

    const navigate = useNavigate()

    const { id } = useParams()

    const [category, setCategory] = useState([])

    const [formData, setFormData] = useState({
        name: '',
        stock: '',
        price: '',
        salePrice: '',
        category: '',
        description: '',
        image: null

    })

    const inputValue = (event) => {
        setFormData(previous => ({ ...previous, [event.target.name]: event.target.value }))
    }

    const inputFile = (e) => {
        setFormData(previous => ({ ...previous, image: e.target.files[0] }))
    }

    const formSubmit = async (event) => {
        event.preventDefault()
        try {
            if (id) {
                const data = new FormData()
                data.append("name", formData.name)
                data.append("stock", formData.stock)
                data.append("price", formData.price)
                data.append("salePrice", formData.salePrice)
                data.append("category", formData.category)
                data.append("description", formData.description)
                data.append("image", formData.image)

                // setFormData(formData)

                const response = await updateProduct(id, data)

                alert(response.data.message)

                setFormData({
                    name: '',
                    stock: '',
                    price: '',
                    salePrice: '',
                    category: '',
                    description: '',
                    image: null
                })

                navigate('/product-table')

            } else {

                const data = new FormData()
                data.append("name", formData.name)
                data.append("stock", formData.stock)
                data.append("price", formData.price)
                data.append("salePrice", formData.salePrice)
                data.append("category", formData.category)
                data.append("description", formData.description)
                data.append("image", formData.image)

                await createProduct(data)

                setFormData({
                    name: '',
                    stock: '',
                    price: '',
                    salePrice: '',
                    category: '',
                    description: '',
                    image: null
                })
                alert("Product uploaded successfully");

                navigate('/product-table')
            }
        } catch (error) {
            console.error(error.response?.data?.message || "Upload failed");
            alert("Upload failed");
        }

    }

    useEffect(() => {
        if (id) {
            const loadProduct = async () => {
                const product = await fetchProductById(id);
                // console.log(product)
                setFormData({
                    ...product,
                    category: product.category._id
                }); // This fills the form automatically
            }
            loadProduct();
        }
    }, [id]);

    useEffect(() => {
        const loadCategory = async () => {
            try {
                const data = await fetchCategory()
                setCategory(data)
            } catch (error) {
                console.log(error.data.message);
            }
        }
        loadCategory()
    }, [])


    return (
        <>
            <div className="product_add-page" style={{
                width: '100%',
                overflow: 'auto',
                height:'100vh'
            }}>
                <div className="product_add-container">
                    <form action="" onSubmit={formSubmit} className='product_add-form'>
                        <div className="product_add-wrapper">
                            <div className="product_add-wrapper-name">
                                <h5>Product Name</h5>
                                <input type="text" onChange={inputValue} name='name' value={formData.name} required />
                            </div>
                            <div className="product_add-wrapper-qty">
                                <h5>Product Stock</h5>
                                <input type="number" onChange={inputValue} name='stock' value={formData.stock} required />
                            </div>
                        </div>
                        <div className="product_add-wrapper">
                            <div className="product_add-wrapper-price">
                                <h5>Product Price</h5>
                                <input type="text" onChange={inputValue} name='price' value={formData.price} required />
                            </div>
                            <div className="product_add-wrapper-offer-price">
                                <h5>Product Sale Price</h5>
                                <input type="number" onChange={inputValue} name='salePrice' value={formData.salePrice} required />
                            </div>
                            <div className="product_add-wrapper-category">
                                <h5>Product Category</h5>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={inputValue}
                                    required>
                                    <option value="">Select Category</option>
                                    {category.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="product_add-wrapper">
                            <div className="product_add-wrapper-description">
                                <h5>Description</h5>
                                <textarea cols="0" rows="8" onChange={inputValue} name='description' value={formData.description} required></textarea>
                            </div>
                        </div>
                        <div className="product_add-wrapper">
                            <div className="product_add-wrapper-image">
                                <h5>Image</h5>
                                <input type="file" accept='image' onChange={inputFile} required={!id} />
                            </div>
                        </div>
                        <button type='submit' className='product_add-form-btn'>Add</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProductAdd
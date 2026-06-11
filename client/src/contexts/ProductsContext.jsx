import React from 'react'
import { createContext, useEffect, useState } from 'react'
import { fetchProducts } from '../services/user-api-service/productApi'

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {

    const [products, setProducts] = useState([]);
    const [searchProducts, setSearchProducts] = useState([])

    const [input, setInput] = useState('')

    const onSelectProduct = () => {
        setInput('')
    }

    const onHandleInput = (event) => {
        setInput(event.target.value)
        console.log(event.target.value)
        let result = products.filter((data) => data.name && data.name.toLowerCase().includes(event.target.value.toLowerCase()))
        setSearchProducts(result)
    }

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts();
            setProducts(data), setSearchProducts(data)
        }
        loadProducts();

    }, [])

    return (
        <ProductsContext.Provider value={{ products, input, searchProducts, onHandleInput, onSelectProduct }}>  {children} </ProductsContext.Provider>
    )
}
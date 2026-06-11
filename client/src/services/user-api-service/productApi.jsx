import axios from '../../axios';

export const fetchProductsById = async (productId) => {
  try {
    const single_product = await axios.get(`/product/${productId}`);
    return single_product.data;
  } catch (error) {
    console.log("Cannot fetch product ID", error);
  }
};

export const fetchProducts = async () => {
  try {
    const all_products = await axios.get('/product');
    return all_products.data;
  } catch (error) {
    console.log("Cannot fetch products", error);
    return [];
  }
};
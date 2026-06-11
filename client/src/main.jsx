import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ProductsProvider } from './contexts/ProductsContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import { WishlistProvider } from './contexts/WishlistContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  </>,
)

import './styles/global.css'
import './styles/variables.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/user/home/Home'
import Product from './pages/user/products/Product'
import Cart from './pages/user/cart/Cart'
import PaymentPage from './pages/user/checkouts/PaymentPage'
import MainLayout from './components/layouts/MainLayout'
import MinimalLayout from './components/layouts/MinimalLayout'
import AboutPage from './pages/user/about/AboutPage'
import SignUp from './pages/user/auth/SignUp'
import Login from './pages/user/auth/Login'
import Auth from './components/layouts/Authlayout'
import AllProducts from './pages/user/products/AllProducts'
import Wishlist from './pages/user/wishlist/Wishlist'
import Dashboard from './pages/admin/Dashboard'
import Sidebar from './components/admin/Sidebar'
import Dashlayout from './components/layouts/Dashlayout'
import ProducTable from './pages/admin/ProductTable'
import Category from './pages/admin/Category'
import Customers from './pages/admin/Customers'
import ProductAdd from './pages/admin/ProductAdd'
import ProfileSection from './pages/user/profile/ProfileSection'
import Profile from './pages/user/profile/Profile'
import Address from './pages/user/profile/Address'
import Order from './pages/user/profile/Order'
import OrderTable from './pages/admin/Order'
import UserProtectedRoute from './components/protected-route/UserProtectedRoute'
import { Toaster, toast } from 'sonner'

function App() {

  return (
    <>
      <BrowserRouter>
        <Toaster richColors position="top-center" /> 
        <Routes>

          <Route element={<Dashlayout />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/product-table' element={<ProducTable />} />
            <Route path='/category' element={<Category />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/orders-table' element={<OrderTable />} />
            <Route path='/product-add' element={<ProductAdd />} />
            <Route path='/product-add/:id' element={<ProductAdd />} />
          </Route >

          <Route element={<Auth />}>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/sidebar' element={<Sidebar />} />
          </Route>



          <Route element={<MainLayout />}>
            <Route element={
              <UserProtectedRoute>
                <ProfileSection />
              </UserProtectedRoute>
            }>
              <Route path='/profile' element={<Profile />} />
              <Route path='/address' element={<Address />} />
              <Route path='/order' element={<Order />} />
            </Route>
            <Route path='/' element={<Home />} />
            <Route path='/all-products' element={<AllProducts />} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='/cart' element={
              <UserProtectedRoute>
                <Cart />
              </UserProtectedRoute>
            } />
            <Route path='/wishlist' element={
              <UserProtectedRoute>
                <Wishlist />
              </UserProtectedRoute>
            } />
            <Route path='/about' element={<AboutPage />} />
          </Route>

          <Route element={<MinimalLayout />}>
            <Route path='/payment' element={
              <UserProtectedRoute>
                <PaymentPage />
              </UserProtectedRoute>
            } />
            <Route path='/payment/:id' element={
              <UserProtectedRoute>
                <PaymentPage />
              </UserProtectedRoute>} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

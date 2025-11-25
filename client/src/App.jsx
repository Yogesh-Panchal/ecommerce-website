import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/ui/auth/layout'
import './App.css'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminProduct from './pages/admin-view/product'
import AdminFeatures from './pages/admin-view/features'
import AdminOrders from './pages/admin-view/orders'
import AdminLayout from './components/admin-view/layout'
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './pages/not-found'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingAccount from './pages/shopping-view/account'
import ShoppingListing from './pages/shopping-view/listing'
import CheckAuth from './pages/common/check-auth'
import UnauthPage from './pages/Unauth-page'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

function App() {
  // const isAuthenticated =false;
  // const user =null; 
  
  const {user,isAuthenticated,isLoading} = useSelector(state => state.auth)

  const dispatch = useDispatch();
  useEffect(()=>{
   // dispatch(CheckAuth());
  },[dispatch])  

  if(isLoading)return  <div>Loading...</div>
  

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      {/* <h1>Header Component</h1> */}
      <Routes>       
        {/* Use `/auth` instead of `./auth` */}
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout/>
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="product" element={<AdminProduct/>} />  
          <Route path="Orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />        
        </Route>  
        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/>
          </CheckAuth>
        }>
          <Route path='home' element={<ShoppingHome />} />
          <Route path='checkout' element={<ShoppingCheckout />} />
          <Route path='account' element={<ShoppingAccount />} />
          <Route path='listing' element={<ShoppingListing />} />
        </Route>       
        <Route path='*' element={<NotFound/>}></Route>    
        <Route path='/Unauth-page' element={<UnauthPage/>}></Route>  
      </Routes>
    </div>
  );
}

export default App;

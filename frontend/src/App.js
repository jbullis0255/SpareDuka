import {BrowserRouter as Router, Route} from 'react-router-dom'

import { useSelector } from 'react-redux'
import {useEffect} from 'react'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import AboutUs from './components/AboutUs'

import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails'

//cart imports
import Cart from './components/cart/Cart'
import Delivery from './components/cart/Delivery'
import ConfirmOrder from './components/cart/ConfirmOrder'
import Payment from './components/cart/Payment'
import OrderSuccess from './components/cart/OrderSuccess'

//user imports
import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import ProtectedRoute from './components/route/ProtectedRoute'
import NewPassword from './components/user/NewPassword'
import LegalDocuments from './components/user/LegalDocuments'

//admin imports
import Dashboard from './components/admin/Dashboard'
import ProductList from './components/admin/ProductList'
import NewProduct from './components/admin/NewProduct'
import UpdateProduct from './components/admin/UpdateProduct'
import OrdersList from './components/admin/OrdersList'
import ProcessOrder from './components/admin/ProcessOrder'
import UsersList from './components/admin/UsersList'
import UpdateUser from './components/admin/UpdateUser'
import ProductReviews from './components/admin/ProductReviews'
import MapSearch from './components/admin/MapSearch'

//seller routes
import SellerDashboard from './components/seller/SellerDashboard'
import SellerProductList from './components/seller/SellerProductList'
import SellerNewProduct from './components/seller/SellerNewProduct'
import RegisterSeller from './components/seller/RegisterSeller'
import SellerUpdateProduct from './components/seller/SellerUpdateProduct'
import SellerProductReviews from './components/seller/SellerProductReviews'
import SellerOrders from './components/seller/SellerOrders'
import SellerProcessOrder from './components/seller/SellerProcessOrder'
import SellerProfile from './components/seller/SellerProfile'

//orders imports
import ListOrders from './components/Orders/ListOrders'
import OrderDetails from './components/Orders/OrderDetails'


import { loadUser } from './actions/userActions'
import store from './store'


import './App.css';

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  const {loading,isAuthenticated, user} = useSelector(state => state.auth)
  
  return (
    <Router>
    <div className="App">
     <Header/>
     <div className="container container-fluid">
     <Route path="/" component={Home} exact />
     <Route path="/about-us" component={AboutUs} exact />
     <Route path="/search/:keyword" component={Home} exact />
     <Route path="/product/:id" component={ProductDetails} exact />
     <Route path="/seller/name" component={SellerProfile} exact />

     <Route path="/cart" component={Cart} exact />

     <Route path="/login" component={Login} />
     <Route path="/register" component={Register} />
     <Route path="/seller/register"   component={RegisterSeller} exact />
     <Route path="/password/forgot" component={ForgotPassword} exact/>
     <Route path="/password/reset/:token" component={NewPassword} exact/>

     <ProtectedRoute path="/me" component={Profile} exact />
     <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
     <ProtectedRoute path="/password/update" component={UpdatePassword} exact />
     <ProtectedRoute path="/seller/docs" component={LegalDocuments} exact />

     <ProtectedRoute path="/delivery" component={Delivery} />
     <ProtectedRoute path="/confirm" component={ConfirmOrder} />
     <ProtectedRoute path="/payment" component={Payment} />
     <ProtectedRoute path="/success" component={OrderSuccess} />

     <ProtectedRoute path="/orders/me" component={ListOrders} />
     <ProtectedRoute path="/order/:id" component={OrderDetails} />

     </div>
     <div className="mt-1">
     <ProtectedRoute path="/dashboard" isAdmin={true}  component={Dashboard} exact />
     <ProtectedRoute path="/seller/dashboard" isSeller={true} component={SellerDashboard} />
     </div>

     <ProtectedRoute path="/admin/products"   component={ProductList} exact />
     <ProtectedRoute path="/admin/product"  component={NewProduct} exact />
     <ProtectedRoute path="/admin/product/:id"  component={UpdateProduct} exact />
     <ProtectedRoute path="/admin/orders"   component={OrdersList} exact />
     <ProtectedRoute path="/admin/order/:id"  component={ProcessOrder} exact />
     <ProtectedRoute path="/admin/users"   component={UsersList} exact />
     <ProtectedRoute path="/admin/user/:id"   component={UpdateUser} exact />
     <ProtectedRoute path="/admin/reviews"   component={ProductReviews} exact />
     <ProtectedRoute path="/map"   component={MapSearch} exact />
 
     <ProtectedRoute path="/seller/products"   component={SellerProductList} exact />
     <ProtectedRoute path="/seller/product"   component={SellerNewProduct} exact />
     <ProtectedRoute path="/seller/product/:id"  component={SellerUpdateProduct} exact />
     <ProtectedRoute path="/seller/reviews"   component={SellerProductReviews} exact />
     <ProtectedRoute path="/seller/orders"   component={SellerOrders} exact />
     <ProtectedRoute path="/seller/order/:id"  component={SellerProcessOrder} exact /> 

     {!loading && (!isAuthenticated || user.role !== 'admin') && (
       <Footer /> 
       )}
    </div>
    </Router>
  );
}

export default App;

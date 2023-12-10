import React from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import OurStore from './pages/OurStore';
import Blog from './pages/Blog';
import CompareProduct from './pages/CompareProduct';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoute } from './routing/OpenRoute';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import SingleBlog from './pages/SingleBlog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import TermsAndCondition from './pages/TermsAndCondition';
import RefundPolicy from './pages/RefundPolicy';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='about' element={<About/>}/>
          <Route path='contact' element={<PrivateRoutes><Contact/></PrivateRoutes>}/>
          <Route path='store' element={<OurStore/>}/>
          <Route path='blogs' element={<Blog/>}/>
          <Route path='blog/:id' element={<SingleBlog/>}/>
          <Route path='compare-product' element={<PrivateRoutes><CompareProduct/></PrivateRoutes>}/>
          <Route path='wishlist' element={<PrivateRoutes><Wishlist/></PrivateRoutes>}/>
          <Route path='login' element={<OpenRoute><Login/></OpenRoute>}/>
          <Route path='forgot-password' element={<ForgotPassword/>}/>
          <Route path='signup' element={<OpenRoute><SignUp/></OpenRoute>}/>
          <Route path='profile' element={<PrivateRoutes><Profile/></PrivateRoutes>}/>
          <Route path='reset-password/:token' element={<ResetPassword/>}/>
          <Route path='privacypolicy' element={<PrivacyPolicy/>}/>
          <Route path='shippingpolicy' element={<ShippingPolicy/>}/>
          <Route path='termsandconditions' element={<TermsAndCondition/>}/>
          <Route path='refundpolicy' element={<RefundPolicy/>}/>
          <Route path='product/:id' element={<SingleProduct/>}/>
          <Route path='cart' element={<PrivateRoutes><Cart/></PrivateRoutes>}/>
          <Route path='checkout' element={<PrivateRoutes><Checkout/></PrivateRoutes>}/>
          <Route path='checkout/:id' element={<PrivateRoutes><Checkout/></PrivateRoutes>}/>
          <Route path='/:pagenotfound'element={<Home/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

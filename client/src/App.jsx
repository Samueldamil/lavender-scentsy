import { Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import Contact from "./pages/Contact";
import Men from './pages/Men';
import Women from "./pages/Women"
import Kids from './pages/Kids';
import Unisex from './pages/Unisex';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProtectedRoute from './components/ProtectedRoute';
import Payment from './pages/Payment';
import Search from './pages/Search';
import Profile from './pages/Profile';


function App() {
    return (
        <Routes>
           <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop/men" element={<Men />} />
            <Route path="/shop/women" element={<Women />} />
            <Route path="/shop/kids" element={<Kids />} />
            <Route path="/shop/unisex" element={<Unisex />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route 
                path="/checkout" 
                element={
                    <ProtectedRoute>
                        <Checkout />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/payment" 
                element={
                    <ProtectedRoute>
                        <Payment />
                    </ProtectedRoute>
                } 
            />
            <Route path="/search" element={<Search />} />
            <Route 
                path='/profile' 
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } 
            />
        </Routes>
    )
}

export default App

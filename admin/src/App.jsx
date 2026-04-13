import './App.css';
import { Route, Routes } from "react-router-dom";
import AdminLayout from './layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Orders from './pages/Orders';
import AdminProfile from './pages/AdminProfile';
import OrderDetails from './pages/OrderDetails';
import AdminUsers from "./pages/AdminUsers";
import Settings from './pages/Settings';
import Messages from './pages/Messages';
import MessageDetail from './pages/MessageDetail';
import Notification from './pages/Notification';


export default function App() {
    return(
        <Routes>
            <Route path="/" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path='/products/edit/:id' element={<EditProduct />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/admin-users' element={<AdminUsers />} />
                <Route path="/admin-profile" element={<AdminProfile />} />
                <Route path="/orders/:id" element={<OrderDetails />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/messages/:id" element={<MessageDetail />} />
                <Route path='/notification' element={<Notification />} />
            </Route>
        </Routes>
    );
}
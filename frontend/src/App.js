import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./components/home/Home";
import NavbarLayout from "./components/navbar/Navbar";
import ProductsPage from "./components/products/ProductsPage";
import Cart from "./components/cart/Cart";
import {CartProvider} from "./components/cart/CartContext";
import {AuthProvider} from "./AuthContext";
import {Login} from "./components/account/Login";
import {Register} from "./components/account/Register";
import {AlertProvider} from "./components/alerts/AlertContext";
import CategoryPage from "./components/categories/CategoryPage";
import {ProductDetails} from "./components/products/ProductDetails";
import {Checkout} from "./components/cart/Checkout";

export default function App() {
    return (
        <AlertProvider>
            <AuthProvider>
                <CartProvider>
                    <BrowserRouter>
                        <NavbarLayout/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="login" element={<Login/>}/>
                            <Route path="register" element={<Register/>}/>
                            <Route path="product" element={<ProductsPage/>}/>
                            <Route path="product/:slug" element={<ProductsPage/>}/>
                            <Route path="product/details/:product_id" element={<ProductDetails/>}/>
                            <Route path="category" element={<CategoryPage/>}/>
                            <Route path="checkout" element={<Checkout/>}/>
                            <Route path="*" element={<div>404</div>}/>
                        </Routes>
                        <Cart/>
                    </BrowserRouter>
                </CartProvider>
            </AuthProvider>
        </AlertProvider>
    )
}
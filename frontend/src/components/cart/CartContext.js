import {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "../../AuthContext";
import {useFetch} from "../../hooks/useApi";
import {useAlert} from "../alerts/AlertContext";


const CartContext = createContext();

export function CartProvider({ children }) {
    const { user } = useAuth();
    const { showAlert } = useAlert();
    const [cartOpen, setCartOpen] = useState(false);
    const [cart, setCart] = useState([]);

    const openCart = () => setCartOpen(true);
    const closeCart = () => setCartOpen(false);

    const {data: cartData, error} = useFetch(user ? '/cart/' : null);

    useEffect(() => {
        if (user && cartData?.[0]?.items) {
            const normalized = cartData[0].items.map(item => ({
                product: item.product,
                quantity: item.quantity,
                unit_price: item.unit_price
            }));
            setCart(normalized);
        } else {
            setCart([])
        }
    }, [user, cartData]);

    const addToCart = (product) => {
        setCart(currentCart => {
            const productAlreadyInCart = currentCart.find(item => item.product.id === product.id);
            if (productAlreadyInCart) {
                showAlert('success', 'Increased Amount in Cart');
                return currentCart.map(item =>
                    item.product.id === product.id
                        ? {...item, quantity: item.quantity + 1}
                        : item
                )
            } else {
                showAlert('success', `Added ${product.title} to Cart`);
                return [...currentCart, {product: { ...product }, quantity: 1, unit_price: product.price}];
            }
        });
    }

    const increaseQuantity = (product) => {
        setCart(currentCart => {
            return currentCart.map(item =>
                item.product.id === product.product.id
                    ? {...item, quantity: item.quantity + 1}
                    : item
            )
        })
        showAlert('success', 'Increased Quantity');
    }

    const decreaseQuantity = (product) => {
        setCart(currentCart => {
            return currentCart.map(item =>
                item.product.id === product.product.id
                    ? {...item, quantity: item.quantity - 1}
                    : item
            ).filter(item => item.quantity > 0);
        })
        showAlert('danger', 'Decreased Quantity');
    }

    return (
        <CartContext.Provider
            value={{
                cartOpen,
                openCart,
                closeCart,
                cart,
                addToCart,
                increaseQuantity,
                decreaseQuantity
        }}>
            {children}
        </CartContext.Provider>
    );

}

export function useCart() {
    return useContext(CartContext);
}
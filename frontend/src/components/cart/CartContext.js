import {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "../../AuthContext";
import {useFetch, usePost} from "../../hooks/useApi";
import {useAlert} from "../alerts/AlertContext";


const CartContext = createContext();

export function CartProvider({children}) {
    const {user} = useAuth();
    const {showAlert} = useAlert();
    const [cartOpen, setCartOpen] = useState(false);
    const [cart, setCart] = useState([]);

    const openCart = () => setCartOpen(true);
    const closeCart = () => setCartOpen(false);

    const {data: cartData} = useFetch(user ? 'cart/' : null);
    const {postData} = usePost('cart-items/');

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

    const addToCart = async (product) => {
        const existing = cart.find(item => item.product.id === product.id)
        let quantity = null;
        if (user) {
            const res = await postData(cartProduct(product, 1))
            const data = res?.data;
            quantity = data.quantity;
        } else {
            quantity = existing
                ? existing.quantity + 1
                : 1;
        }

        setCart(currentCart => {
            if (existing) {
                showAlert('success', 'Increased Amount in Cart');
                return currentCart.map(item =>
                    item.product.id === product.id
                        ? {...item, quantity: quantity}
                        : item
                )
            } else {
                showAlert('success', `Added ${product.title} to Cart`);
                return [...currentCart,
                    {
                        product:
                            {...product},
                        quantity: quantity,
                        unit_price: product.price
                    }
                ];
            }
        })
    }

    const increaseQuantity = async (product) => {
        if (user) await postData(cartProduct(product.product, 1));
        setCart(currentCart => {
            return currentCart.map(item =>
                item.product.id === product.product.id
                    ? {...item, quantity: item.quantity + 1}
                    : item
            )
        })
        showAlert('success', 'Increased Quantity');
    }

    const decreaseQuantity = async (product) => {
        if (user) await postData(cartProduct(product.product, -1));
        setCart(currentCart => {
            return currentCart.map(item =>
                item.product.id === product.product.id
                    ? {...item, quantity: item.quantity - 1}
                    : item
            ).filter(item => item.quantity > 0);
        })
        showAlert('danger', 'Decreased Quantity');
    }

    const cartProduct = (product, quantity) => {
        return {
            "product_id": product.id,
            "quantity": quantity,
            "unit_price": product.price,
        }
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
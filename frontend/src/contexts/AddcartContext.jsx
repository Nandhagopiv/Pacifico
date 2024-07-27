import axios from "axios";
import { createContext, useEffect, useState } from "react";

const CartContext = createContext();

const getStoredUser = () => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
};

const parseCartData = (userData) => {
    if (userData?.cart) {
        return userData.cart.map((data) => JSON.parse(data));
    }
    return [];
};

const AddcartContext = (props) => {
    const [user, setUser] = useState(getStoredUser);
    const [cartList, setCartList] = useState(parseCartData(user));
    const [history, setHistory] = useState(user?.history || []);
    const [userSts, setUserSts] = useState(!!user);

    useEffect(() => {
        async function refresh() {
            if (user) {
                try {
                    const response = await axios.get(`https://pacifico.onrender.com/getuserforcart?email=${user.email}`);
                    const userDet = response.data;
                    userDet.cart = parseCartData(userDet);
                    localStorage.setItem('user', JSON.stringify(userDet));
                    setUser(userDet);
                    setCartList(userDet.cart);
                    setHistory(userDet.history || []);
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                }
            }
            setUserSts(!!user);
        }

        refresh();
    }, []);

    const login = (userData) => {
        const userDet = {
            ...userData,
            cart: parseCartData(userData)
        };
        localStorage.setItem('user', JSON.stringify(userDet));
        setUser(userDet);
        setCartList(userDet.cart);
    };

    const addingUserDataToUpdateCart = (userData) => {
        const userDet = {
            ...userData,
            cart: parseCartData(userData)
        };
        localStorage.setItem('user', JSON.stringify(userDet));
        setUser(userDet);
        setCartList(userDet.cart);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setCartList([]);
        setHistory([]);
        setUserSts(false);
    };

    return (
        <CartContext.Provider value={{ logout, history, setHistory, addingUserDataToUpdateCart, cartList, setCartList, login, userSts, user, setUser, setUserSts }}>
            {props.children}
        </CartContext.Provider>
    );
};

export default AddcartContext;
export { CartContext };

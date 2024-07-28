import axios from "axios";
import { createContext, useEffect, useState } from "react"

const CartContext = createContext()

const AddcartContext = (props) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null
    });
    
    const [cartList, setCartList] = useState(() => {
        const storedUser = localStorage.getItem('user');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null
        return parsedUser?.cart || []
    });
    
    const [history, setHistory] = useState(() => {
        const storedUser = localStorage.getItem('user');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null
        return parsedUser?.history || []
    });
    
    const [userSts, setUserSts] = useState(false)

    useEffect(() => {
        async function refresh() {
            if (user) {
                try {
                    const { data } = await axios.get(`https://pacifico.onrender.com/getuserforcart?email=${user.email}`);
                    const userDet = {
                        ...data,
                        cart: data.cart.map((item) => JSON.parse(item)) || [],
                        history: data.history || []
                    };
                    localStorage.setItem('user', JSON.stringify(userDet));
                    setUser(userDet);
                    setCartList(userDet.cart);
                    setHistory(userDet.history);
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                }
            }
            setUserSts(!!user);
        }
        refresh();
    }, []);

    const login = (userData) => {
        const userCart = userData.cart
        const userDet = userData
        const tempArr = userCart.map((data) => {
            return JSON.parse(data)
        })
        userDet.cart = tempArr
        console.log(userDet);
        localStorage.setItem('user', JSON.stringify(userDet))
        setUser(userDet)
    }

    const addingUserDataToUpdateCart = (userData) => {
        const userCart = userData.cart
        const userDet = userData
        const tempArr = userCart.map((data) => {
            return JSON.parse(data)
        })
        userDet.cart = tempArr
        console.log(userDet)
        localStorage.setItem('user', JSON.stringify(userDet))
        setUser(userDet)
        setCartList(userDet.cart)
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null);
    }

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <CartContext.Provider value={{ logout,history, setHistory, addingUserDataToUpdateCart, cartList, setCartList, login, userSts, user, setUser, setUserSts }}>
            {
                props.children
            }
        </CartContext.Provider>
    )
}

export default AddcartContext
export { CartContext }

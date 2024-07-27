import axios from "axios";
import { createContext, useEffect, useState } from "react"

const CartContext = createContext()

const AddcartContext = (props) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    })
    const [cartList, setCartList] = useState(() => {
        const storedUser = localStorage.getItem('user');
        const parsedUser = JSON.parse(storedUser)
        return parsedUser.cart
    })

    const [history, setHistory] = useState(() => {
        const storedUser = localStorage.getItem('user');
        const parsedUser = JSON.parse(storedUser)
        return parsedUser.history
    })
    const [userSts, setUserSts] = useState(false)

    useEffect(() => {
        async function refresh() {
            console.log(user.cart);
            if (user === null) {
                setUserSts(false)
            } else {
                axios.get(`https://pacifico.onrender.com/getuserforcart?email=${user.email}`).then((data) => {
                    const userCart = data.data.cart
                    const userDet = data.data
                    const tempArr = userCart.map((data) => {
                        return JSON.parse(data)
                    })
                    userDet.cart = tempArr
                    console.log(userDet);
                    localStorage.setItem('user', JSON.stringify(userDet))
                })
                setUserSts(true)
            }
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

import axios from "axios";
import { createContext, useEffect, useState } from "react"

const CartContext = createContext()

const AddcartContext = (props) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    })
    const [userSts, setUserSts] = useState(false)

    useEffect(() => {
        async function refresh() {
            console.log(user.cart);
            if (user === null) {
                setUserSts(false)
            } else {
                axios.get(`http://localhost:5000/getuserforcart?email=${user.email}`).then((data)=>{
                    const userCart = data.data.cart
                    const userDet = data.data
                    const tempArr = userCart.map((data)=>{
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
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const addingUserDataToUpdateCart = (userData)=>{
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null);
    }

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <CartContext.Provider value={{logout,addingUserDataToUpdateCart, login, userSts, user, setUser, setUserSts }}>
            {
                props.children
            }
        </CartContext.Provider>
    )
}

export default AddcartContext
export { CartContext }

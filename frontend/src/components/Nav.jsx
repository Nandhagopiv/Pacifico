import { Fragment } from "react"
import { useNavigate } from "react-router-dom"
import logo from '../Assets/Logo.png'
import { useState } from "react"

const Nav = () => {
    const Navigate = useNavigate()
    const [sideNav, setSideNav] = useState(false)
    const handleSearch = () => {
        Navigate('/searchproducts')
    }

    const handleHome = () => {
        Navigate('/')
    }

    const handleCategory = () => {
        Navigate('/category')
    }

    const handleUser = () => {
        Navigate('/myaccount')
    }

    const handleCart = async () => {
        Navigate('/cart')
    }

    const handleSideNav = () =>{
        setSideNav(true)
    }

    const handleClose = ()=>{
        setSideNav(false)
    }
    return (
        <Fragment>
            <nav className="bg-white sticky z-30 top-0 p-4 shadowNav flex justify-between items-center">
                <img className="md:h-10 h-7" src={logo} alt="PACIFICO Logo" />
                <div className="hidden md:flex gap-10">
                    <p onClick={handleHome} className="font-semibold text-xl cursor-pointer  hover:text-black hover:underline">Home</p>
                    <p onClick={handleCategory} className="font-semibold text-xl cursor-pointer hover:text-black hover:underline">Shop by Categories</p>
                </div>
                <div className="hidden md:flex gap-5">
                    <i onClick={handleSearch} className="fa-solid fa-magnifying-glass fa-xl"></i>
                    <i onClick={handleUser} className="fa-solid fa-user fa-xl"></i>
                    <i onClick={handleCart} className="fa-solid fa-cart-shopping fa-xl"></i>
                </div>
                <div className="md:hidden block">
                    <i onClick={handleSideNav} className="fa-solid fa-bars fa-xl"></i>
                </div>
            </nav>
            <sidenav style={{right:sideNav?'0':'-100%'}} className="p-5 sidenav md:hidden fixed top-0 w-[75%] h-[100%] z-50 font-bold text-white flex gap-7 flex-col bg-sky-950">
                <div className="text-right">
                    <i onClick={handleClose} className="fa-solid fa-x text-white"></i>
                </div>
                <p onClick={handleHome} className="hover:underline w-fit cursor-pointer">Home</p>
                <p onClick={handleSearch} className="hover:underline w-fit cursor-pointer">Search</p>
                <p onClick={handleCategory} className="hover:underline w-fit cursor-pointer">Shop by category</p>
                <p onClick={handleCart} className="hover:underline w-fit cursor-pointer">Your Cart</p>
                <p onClick={handleUser} className="hover:underline w-fit cursor-pointer">Your Account</p>
            </sidenav>
        </Fragment>
    )
}

export default Nav
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Verify from "./components/Verify";
import Landing from "./components/Landing";
import Products from "./components/Products";
import Overview from "./components/Overview"
import Category from "./components/Category";
import MyAccount from "./components/MyAccount";
import AddcartContext from "./contexts/AddcartContext";
import AddCart from "./components/AddCart";
import Checkout from "./components/Checkout";
import SuccessPage from "./components/SuccessPage";

function App() {
  return (
    <div className="App">
      <AddcartContext>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/verify" element={<Verify/>}></Route>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/searchproducts" element={<Products/>}></Route>
        <Route path="/overview" element={<Overview/>}></Route>
        <Route path="/category" element={<Category/>}></Route>
        <Route path="/myaccount" element={<MyAccount/>}></Route>
        <Route path="/cart" element={<AddCart/>}></Route>
        <Route path="/checkout" element={<Checkout/>}></Route>
        <Route path="/paymentsuccess" element={<SuccessPage/>}></Route>
      </Routes>
      </BrowserRouter>
      </AddcartContext>
    </div>
  );
}

export default App;

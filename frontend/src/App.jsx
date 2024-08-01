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
import ListOfProducts from "./components/ListOfProducts";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from "./components/PaymentForm";
import FailedPage from "./components/Failed";

const stripePromise = loadStripe('pk_test_51Pj12HP1mnBMkZyDYc25VGCjOBOfE3xzqRlpmAPeoKxFAKgjaKgFxSej0c5WrxdTXY15lA0fDTlB5c0k8NZm7w0r00BCxL9YcP')

function App() {
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <AddcartContext>
          <BrowserRouter>
            <Routes>
              <Route path="/failed" element={<FailedPage/>}></Route>
              <Route path="/processpayment" element={<PaymentForm />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/verify" element={<Verify />}></Route>
              <Route path="/" element={<Landing />}></Route>
              <Route path="/searchproducts" element={<Products />}></Route>
              <Route path="/overview" element={<Overview />}></Route>
              <Route path="/category" element={<Category />}></Route>
              <Route path="/myaccount" element={<MyAccount />}></Route>
              <Route path="/cart" element={<AddCart />}></Route>
              <Route path="/checkout" element={<Checkout />}></Route>
              <Route path="/paymentsuccess" element={<SuccessPage />}></Route>
              <Route path="/list" element={<ListOfProducts />}></Route>
            </Routes>
          </BrowserRouter>
        </AddcartContext>
      </Elements>
    </div>
  );
}

export default App;

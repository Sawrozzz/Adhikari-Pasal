import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import AllUsers from "./pages/AllUsers/AllUsers";
import Profile from "./pages/Profile/Profile";
import AddProducts from "./pages/Products/AddProducts";
import SearchedProducts from "./pages/Products/SearchedProducts";
import Dashboard from "./pages/AdminDashboard/Dashboard";
import Cart from "./pages/Cart/Cart";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/all-users" element={<AllUsers />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/product/add-product" element={<AddProducts />} />
        <Route path="/product/search" element={<SearchedProducts />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

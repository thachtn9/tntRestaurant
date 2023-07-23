import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./scss/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Restaurant from "./components/Restaurant";
import Customer from "./components/Customer";
import Table from "./components/Table";
import Product from "./components/Product";
import { ToastContainer } from "react-toastify";
import Order from "./components/Order";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="restaurant" element={<Restaurant />}></Route>
        <Route path="customer" element={<Customer />}></Route>
        <Route path="table" element={<Table />}></Route>
        <Route path="product" element={<Product />}></Route>
        <Route path="order" element={<Order />}></Route>
      </Route>
    </Routes>
    <ToastContainer
      position="top-right"
      autoClose={500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      theme="light"
    ></ToastContainer>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

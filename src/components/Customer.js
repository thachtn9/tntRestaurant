import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
const Customer = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [listRestaurant, setListRestaurant] = useState({});
  const handleAddClick = () => {
    console.log(customerName, customerEmail);
  };
  useEffect(() => {
    setListData();
  });
  const setListData = () => {};
  return (
    <div className="restaurant-container container">
      <div className="restaurant-top">
        <div className="restaurant-top-title"> Thêm mới nhà hàng </div>
        <form className="row g-3">
          <div className="col-md-2">
            <label className="form-label">Tên khách hàng</label>
            <input
              type="text"
              className="form-control"
              value={customerName}
              onChange={(event) => {
                setCustomerName(event.target.value);
              }}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={customerEmail}
              onChange={(event) => {
                setCustomerEmail(event.target.value);
              }}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Số điện thoại</label>
            <input
              type="phone"
              className="form-control"
              value={customerName}
              onChange={(event) => {
                setCustomerName(event.target.value);
              }}
            />
          </div>
          <div className="col-md-2">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                handleAddClick();
              }}>
              Thêm mới
            </button>
          </div>
        </form>
      </div>
      <div className="restaurant-content">
        <div className="restaurant-title"> Danh sách khách h</div>
        <div className="restaurant-list"></div>
      </div>
    </div>
  );
};
export default Customer;

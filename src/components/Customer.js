import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import {
  entity,
  getListbyEntity,
  postInsertUpdateEntity,
} from "../services/appServices";
import { toast } from "react-toastify";
import _ from "lodash";

const Customer = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [listCustomer, setListCustomer] = useState([]);

  const validatePhone = (phoneNumber) => {
    // Define the regular expression for phone numbers
    const phoneRegex = /^\d{10}$/; // This regex expects a 10-digit number

    // Test the phoneNumber against the regex pattern
    return phoneRegex.test(phoneNumber);
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleAddClick = async () => {
    toast.error("email validate");
    if (_.isEmpty(customerName)) {
      console.log("name validate");
      toast.error("name validate");
      return;
    }
    if (!validateEmail(customerEmail)) {
      console.log("email validate");
      toast.error("email validate");
      return;
    }
    if (!validatePhone(customerPhone)) {
      console.log("phone validate");
      toast.error("phone validate");
      return;
    }
    var cusNew = {
      customerName: customerName,
      customerPhone: customerPhone,
      customerEmail: customerEmail,
    };
    let iu = await postInsertUpdateEntity(entity.Customer, cusNew);
    if (iu.code === 200) {
      getListData();
    }
  };

  useEffect(() => {
    getListData();
  }, []);
  const getListData = async () => {
    let res = await getListbyEntity(entity.Customer);
    if (res.code === 200) {
      setListCustomer(res.data);
    }
  };
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
              type="text"
              className="form-control"
              value={customerPhone}
              onChange={(event) => {
                setCustomerPhone(event.target.value);
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
        <div className="restaurant-title"> Danh sách khách hàng</div>
        <div className="restaurant-list">
          <div className="card-list">
            {listCustomer.map((item, index) => {
              return (
                <div className="card-item" key={`item-${index}`}>
                  <div className="card-top d-flex">
                    <div>
                      <FiEdit />
                    </div>
                    <div>
                      <TiDelete />
                    </div>
                  </div>
                  <div className="card-content">
                    <div> #{item.customerID}</div>
                    <div> {item.customerName}</div>
                    <div> {item.customerEmail} </div>
                    <div> {item.customerPhone} </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Customer;

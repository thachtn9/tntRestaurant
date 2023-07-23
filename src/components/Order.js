import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import {
  convertStringVND,
  entity,
  getListbyEntity,
} from "../services/appServices";
const Order = () => {
  const [listRestaurant, setListRestaurant] = useState([]);
  const [listTable, setListTable] = useState([]);
  const [listCustomer, setListCustomer] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [listOrderDetail, setListOrderDetail] = useState([]);

  const [totalPriceOrder, setTotalPriceOrder] = useState(0);
  const [restaurantId, setRestaurantId] = useState([]);
  const [tableId, setTableId] = useState([]);
  const [customerId, setCustomerId] = useState([]);
  const [orderInfo, setOrderInfo] = useState([]);
  const [order, setOrder] = useState([]);

  const handleAddClick = () => {
    console.log("Add order");
  };
  const handleDelProduct = (idDel) => {
    const updatedList = listOrderDetail.filter(
      (item) => item.productID !== idDel
    );
    setListOrderDetail(updatedList);

    setTotalPriceOrder(
      updatedList.reduce((accumulator, i) => {
        return accumulator + i.productPrice * i.productCount;
      }, 0)
    );
  };
  const handleAddProduct = (item) => {
    let itemOder = {
      productID: item.productID,
      productName: item.productName,
      productCount: 1,
      productPrice: item.productPrice,
      totalPrice: 111000,
    };
    let newList = addItemToOrderDetail(listOrderDetail, itemOder);
    setListOrderDetail([...newList]);
    setTotalPriceOrder(
      listOrderDetail.reduce((accumulator, i) => {
        return accumulator + i.productPrice * i.productCount;
      }, 0)
    );
  };
  // Hàm để thêm một item mới hoặc tăng productCount nếu item đã tồn tại
  const addItemToOrderDetail = (listDetail, itemOder) => {
    let found = false;

    for (let i = 0; i < listDetail.length; i++) {
      if (listDetail[i].productID === itemOder.productID) {
        listDetail[i].productCount++;
        found = true;
        break;
      }
    }

    if (!found) {
      listDetail.push(itemOder);
    }
    return listDetail;
  };

  useEffect(() => {
    getListData();
  }, []);
  const getListData = async () => {
    let listR = await getListbyEntity(entity.Table);
    if (listR.code === 200) {
      setListRestaurant(listR.data);
    }
    let listC = await getListbyEntity(entity.Customer);
    if (listC.code === 200) {
      setListCustomer(listC.data);
    }
    let listP = await getListbyEntity(entity.Product);
    if (listP.code === 200) {
      setListProduct(listP.data);
    }
  };
  return (
    <div className="restaurant-container container">
      <div className="restaurant-top">
        <div className="restaurant-top-title"> Thông tin Order</div>
        <form className="row g-3">
          <div className="col-md-2">
            <label className="form-label">Nhà hàng</label>
            <select
              className="form-select"
              value={restaurantId}
              onChange={(e) => {
                setRestaurantId(e.target.value);
                if (e.target.value !== 0) {
                  let r = listRestaurant.filter(
                    (i) => i.restaurantID == e.target.value
                  )[0].tables;
                  setListTable(r);
                } else {
                  setListTable([]);
                }
              }}
            >
              <option value={0} selected>
                Chọn nhà hàng
              </option>
              {listRestaurant.map((restaurant) => (
                <option
                  key={"res-" + restaurant.restaurantID}
                  value={restaurant.restaurantID}
                >
                  {restaurant.restaurantName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">Bàn</label>
            <select
              className="form-select"
              value={tableId}
              onChange={(e) => setTableId(e.target.value)}
            >
              <option value={0} selected>
                Chọn bàn
              </option>
              {listTable.map((t) => (
                <option key={"table-" + t.tableID} value={t.tableID}>
                  {t.tableName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">Khách hàng</label>
            <select
              className="form-select"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            >
              <option value={0} selected>
                Chọn khách hàng
              </option>
              {listCustomer.map((c) => (
                <option key={"cus-" + c.customerID} value={c.customerID}>
                  {c.customerName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                handleAddClick();
              }}
            >
              Tạo mới Order
            </button>
          </div>
        </form>
      </div>
      <div className="restaurant-content">
        <div className="restaurant-title"> Chi tiết order</div>
        <div className="restaurant-info ">
          <div className="order-container">
            <div className="order-left-product">
              <div className="card-list">
                {listProduct.map((item, index) => {
                  return (
                    <div
                      className="card-item product-item"
                      key={`product-${index}`}
                      onClick={() => handleAddProduct(item)}
                    >
                      <div className="card-content">
                        <div> #{item.productID}</div>
                        <div className="product-name">{item.productName}</div>
                        <div className="product-price">
                          {convertStringVND(item.productPrice)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="order-right-detail">
              <div className="order-detail-content">
                <div className="order-list">
                  <div className="order-item item-header">
                    <div className="product-name">Tên món</div>
                    <div className="quantity">Số lượng</div>
                    <div className="unit-price">Đơn giá</div>
                    <div className="total-price">Thành tiền</div>
                    <div className="quantity"></div>
                  </div>
                  {listOrderDetail.map((item, index) => {
                    return (
                      <div className="order-item" key={"key-" + index}>
                        <div className="product-name">{item.productName}</div>
                        <div className="quantity">{item.productCount}</div>
                        <div className="unit-price">
                          {convertStringVND(item.productPrice)}
                        </div>
                        <div className="total-price">
                          {convertStringVND(
                            item.productPrice * item.productCount
                          )}
                        </div>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelProduct(item.productID)}
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="order-detail-bottom">
                <div className="lbl-totalPrice">
                  Tổng tiền : <span>{convertStringVND(totalPriceOrder)}</span>
                </div>
                <button className="btn" disabled={totalPriceOrder === 0}>
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Order;

import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
const Table = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantLocation, setRestaurantLocation] = useState("");
  const [listRestaurant, setListRestaurant] = useState({});
  const handleAddClick = () => {
    console.log(restaurantName, restaurantLocation);
  };
  useEffect(() => {
    setListData();
  });
  const setListData = () => {};
  return (
    <div className="restaurant-container container">
      <div className="restaurant-top">
        <div className="restaurant-top-title"> Thêm mới bàn </div>
        <form className="row g-3">
          <div className="col-md-2">
            <label className="form-label">Nhà hàng</label>
            <input
              type="text"
              className="form-control"
              value={restaurantName}
              onChange={(event) => {
                setRestaurantName(event.target.value);
              }}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Tên bàn</label>
            <input
              type="text"
              className="form-control"
              value={restaurantLocation}
              onChange={(event) => {
                setRestaurantLocation(event.target.value);
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
        <div className="restaurant-title"> Danh sách nhà hàng</div>
        <div className="restaurant-list"></div>
      </div>
    </div>
  );
};
export default Table;

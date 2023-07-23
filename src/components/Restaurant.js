import _ from "lodash";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import { toast } from "react-toastify";
import {
  entity,
  getListbyEntity,
  postInsertUpdateEntity,
} from "../services/appServices";
const Restaurant = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantLocation, setRestaurantLocation] = useState("");
  const [listRestaurant, setListRestaurant] = useState([]);
  const handleAddClick = async () => {
    var resNew = {
      restaurantName: restaurantName,
      restaurantLocation: restaurantLocation,
    };
    let res = await postInsertUpdateEntity(entity.Restaurant, resNew);
    if (res.code === 200) {
      getListData();
    }
  };

  useEffect(() => {
    getListData();
  }, []);
  const getListData = async () => {
    let res = await getListbyEntity(entity.Restaurant);
    console.log(res);
    if (res.code === 200) {
      setListRestaurant(res.data);
    }
  };
  return (
    <div className="restaurant-container container">
      <div className="restaurant-top">
        <div className="restaurant-top-title"> Thêm mới nhà hàng </div>
        <form className="row g-3">
          <div className="col-md-2">
            <label className="form-label">Tên nhà hàng</label>
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
            <label className="form-label">Địa chỉ</label>
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
              }}
            >
              Thêm mới
            </button>
          </div>
        </form>
      </div>
      <div className="restaurant-content">
        <div className="restaurant-title"> Danh sách nhà hàng</div>
        <div className="restaurant-list">
          <div className="card-list">
            {listRestaurant.map((item, index) => {
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
                    <div> #{item.restaurantID}</div>
                    <div> {item.restaurantName}</div>
                    <div> {item.restaurantLocation} </div>
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
export default Restaurant;

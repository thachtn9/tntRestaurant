import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import Accordion from "react-bootstrap/Accordion";
import {
  entity,
  getListbyEntity,
  postInsertUpdateEntity,
} from "../services/appServices";
const Table = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const [restaurantId, setRestaurantId] = useState(0);
  const [tableName, setTableName] = useState("");
  const [listRes_Table, setListRes_Table] = useState([]);
  const [listRestaurant, setListRestaurant] = useState([]);
  const handleAddClick = async () => {
    var resT = {
      restaurantId: restaurantId,
      tableName: tableName,
    };
    let res = await postInsertUpdateEntity(entity.Table, resT);
    if (res.code === 200) {
      getListData();
    }
  };

  useEffect(() => {
    getListData();
  }, []);
  const getListData = async () => {
    let listR = await getListbyEntity(entity.Restaurant);
    if (listR.code === 200) {
      setListRestaurant(listR.data);
    }
    let res = await getListbyEntity(entity.Table);
    console.log(res);
    if (res.code === 200) {
      setListRes_Table(res.data);
    }
  };
  return (
    <div className="restaurant-container container">
      <div className="restaurant-top">
        <div className="restaurant-top-title"> Thêm mới bàn </div>
        <form className="row g-3">
          <div className="col-md-2">
            <label className="form-label">Nhà hàng</label>
            {/* <input
              type="text"
              className="form-control"
              value={restaurantName}
              onChange={(event) => {
                setRestaurantName(event.target.value);
              }}
            /> */}
            <select
              className="form-select"
              value={restaurantId}
              onChange={(e) => setRestaurantId(e.target.value)}
            >
              <option value={0}>Chọn nhà hàng</option>
              {listRestaurant.map((restaurant) => (
                <option
                  key={restaurant.restaurantID}
                  value={restaurant.restaurantID}
                >
                  {restaurant.restaurantName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">Tên bàn</label>
            <input
              type="text"
              className="form-control"
              value={tableName}
              onChange={(event) => {
                setTableName(event.target.value);
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
        <div className="restaurant-title"> Danh sách nhà hàng - bàn</div>
        <div className="restaurant-list">
          <Accordion defaultActiveKey="0">
            {listRes_Table.map((item) => {
              return (
                <Accordion.Item eventKey={item.restaurantID}>
                  <Accordion.Header>
                    #{item.restaurantID} {item.restaurantName}
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="card-list">
                      {item.tables.map((t) => {
                        return (
                          <div className="card-item">
                            <div className="card-top d-flex">
                              <div>
                                <FiEdit />
                              </div>
                              <div>
                                <TiDelete />
                              </div>
                            </div>
                            <div className="card-content">
                              <div> #{t.tableID}</div>
                              <div className="fs-3"> {t.tableName}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
export default Table;

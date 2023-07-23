import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import {
  convertStringVND,
  entity,
  getListbyEntity,
  postInsertUpdateEntity,
} from "../services/appServices";
const Product = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [listProduct, setListProduct] = useState([]);

  const handleAddClick = async () => {
    var proNew = {
      productName: productName,
      productPrice: productPrice,
    };
    let res = await postInsertUpdateEntity(entity.Product, proNew);
    if (res.code === 200) {
      getListData();
    }
  };

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    let res = await getListbyEntity(entity.Product);
    console.log(res);
    if (res.code === 200) {
      setListProduct(res.data);
    }
  };
  return (
    <div className="restaurant-container container">
      <div className="restaurant-top">
        <div className="restaurant-top-title"> Thêm mới hàng hóa </div>
        <form className="row g-3">
          <div className="col-md-2">
            <label className="form-label">Tên hàng hóa</label>
            <input
              type="text"
              className="form-control"
              value={productName}
              onChange={(event) => {
                setProductName(event.target.value);
              }}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Giá</label>
            <input
              type="text"
              className="form-control"
              value={productPrice}
              onChange={(event) => {
                setProductPrice(event.target.value);
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
        <div className="restaurant-title"> Danh sách hàng hóa</div>
        <div className="restaurant-list">
          <div className="card-list">
            {listProduct.map((item, index) => {
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
                    <div> #{item.productID}</div>
                    <div> {item.productName}</div>
                    <div>{convertStringVND(item.productPrice)}</div>
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
export default Product;

import axios from "./axiosCustom.js";
export const entity = {
  Restaurant: "Restaurant",
  Customer: "Customer",
  Order: "Order",
  OrderDetail: "OrderDetail",
  Table: "Table",
  Product: "Product",
};
export const convertStringVND = (i) => {
  return parseFloat(i).toLocaleString();
};
const getListbyEntity = (entity) => {
  let res = axios.get(`api/${entity}`);
  return res;
};

const postInsertUpdateEntity = (entity, model) => {
  let res = axios.post(`api/${entity}`, model);
  return res;
};

export { getListbyEntity, postInsertUpdateEntity };

import http from "../../constants/http-common";

const getAll = () => {
  return http.get("/api/getAll");
};
const create = data => {
  return http.post("/create", data);
};
const update = (id, data) => {
  return http.put(`/update/${id}`, data);
};
const remove = id => {
  return http.delete(`/delete/${id}`);
};

const productService = {
  getAll,
  create,
  update,
  remove,
};

export default productService;

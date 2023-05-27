import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// requests
const requests = {
  logIn(data) {
    return apiClient.post("user/login", data);
  },
  signUp(data) {
    return apiClient.post("user", data);
  },
  getUser(id) {
    return apiClient.get(`user/${id}`);
  },
  deleteUser(id) {
    return apiClient.delete(`user/${id}`);
  },
  addFoodItem(data) {
    return apiClient.post("food", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  getFoodList(page) {
    return apiClient.get(`food?page=${page}`);
  },
  getFoodItem(id) {
    return apiClient.get(`food/find/${id}`);
  },
  deleteFoodItem(id) {
    return apiClient.delete(`food/${id}`);
  },
  addRole(data) {
    return apiClient.post("role", data);
  },
  getRoles() {
    return apiClient.get("role/");
  },
  deleteRole(id) {
    return apiClient.delete(`role/${id}`);
  },
  addRestaurant(data) {
    return apiClient.post("restaurant", data);
  },
  getRestaurants(page) {
    return apiClient.get(`restaurant?page=${page}`);
  },
  deleteRestaurant(id) {
    return apiClient.delete(`restaurant/${id}`);
  },
  addRating(data) {
    return apiClient.post("rating", data);
  },
  getRatings(page) {
    return apiClient.get(`rating?page=${page}`);
  },
  getRating(id) {
    return apiClient.get(`rating/find/${id}`);
  },
  deleteRating(id) {
    return apiClient.delete(`rating/${id}`);
  },
  addOrder(data) {
    return apiClient.post("order", data);
  },
  getOrder(id) {
    return apiClient.get(`order/${id}`);
  },
  editOrder(id, data) {
    return apiClient.patch(`order/${id}`, data);
  },
  confirmOrder(id, data) {
    return apiClient.patch(`order/confirm/${id}`, data);
  },
  deleteOrder(id) {
    return apiClient.delete(`order/${id}`);
  },
  addComment(data) {
    return apiClient.post("comment", data);
  },
  getComments(page, limit) {
    return apiClient.get(`comment?page=${page}&limit=${limit}`);
  },
  deleteComment(id) {
    return apiClient.delete(`comment/${id}`);
  },
};

export default requests;

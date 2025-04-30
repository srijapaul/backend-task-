import axios from "axios";

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "todo" | "doing" | "done" | "all"; // Assuming these are the possible statuses
  dueDate: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // Replace with your backend API base URL
  timeout: 5000, // Optional: Set a timeout for requests (in milliseconds)
  headers: {
    
    "Content-Type": "application/json", // Default headers
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get the token from local storage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Set the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request error
  }
)

export default axiosInstance;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const axiosInstance = axios_1.default.create({
    baseURL: "http://localhost:4000",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
exports.default = axiosInstance;
//# sourceMappingURL=axiosInstance.js.map
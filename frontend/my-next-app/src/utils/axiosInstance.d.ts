export interface Task {
    _id: string;
    title: string;
    description: string;
    status: "todo" | "doing" | "done" | "all";
    dueDate: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
declare const axiosInstance: import("axios").AxiosInstance;
export default axiosInstance;

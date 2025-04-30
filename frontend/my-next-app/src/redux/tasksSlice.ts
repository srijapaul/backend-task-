import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import {checkToken} from "../utils/checktoken";

// Fetch tasks from NestJS with pagination
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async ({ page, limit, status }: { page: number; limit: number; status?: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/task?page=${page}&limit=${limit}${status ? `&status=${status}` : ''}`);
      return { tasks: response.data, page }; // Return tasks and page number
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: number, { dispatch,rejectWithValue }) => {
    try {
      const token = checkToken();
      if (!token) return;
     
      console.log("deleteTask",id)
      const response = await axiosInstance.delete(`/task/${id}`, {
        headers: {
         Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200) {
      dispatch(fetchTasks({
        page: 1, limit: 5,
        status: "all" // Fetch all tasks after deletion
        })); // Fetch tasks again after deletion with all statuses
      return id; // Return the deleted task ID
    } else {
      throw new Error("Failed to delete task");
    }
  }catch(error: any) {
    console.log("deleteTask error", error);
    return rejectWithValue(error.response?.data?.message || error.message);
  }}
);

// Update task status
export const updateTaskStatus = createAsyncThunk(
  "tasks/updateTaskStatus",
  async ({ id, status }: { id: string; status: string }, { dispatch,rejectWithValue }) => {
    try {
      const token=checkToken();
      if(!token) return;
      
      console.log("updateTaskStatus",id,status)
      const response = await axiosInstance.patch(`/task/${id}`, 
        { status }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to update task status");
        
      }else{
        dispatch(fetchTasks({ page: 1, limit: 5 , status: status})); // Fetch tasks again after updating status with all statuses
        return { id, status: response.data.status }; // Fetch tasks again after updating status
      }
       // Return the updated task status
    } catch (error: any) {
      console.log("updateTaskStatus error",error)
      return rejectWithValue(error.message);
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [] as { id: number; status: string }[], // All tasks
    filteredTasks: [] as { id: number; status: string }[], // Filtered tasks
    filter: "all", // Current filter
    error: null as string | null, // Error message
    hasMore: true, // Whether there are more tasks to load
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload; // Update the filter
      state.filteredTasks =
        state.filter === "all"
          ? state.tasks // Show all tasks if the filter is "all"
          : state.tasks.filter((task: any) => task.status === state.filter); // Filter tasks by status
    },
  },
  extraReducers: (builder) => {
    // Handle fetchTasks
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      const { tasks, page } = action.payload;
      console.log("tasks",tasks);
      console.log("page",page);
      if (page === 1) {
        // Replace tasks if it's the first page
        state.tasks = tasks;
        state.filteredTasks = tasks;
      } else {
        // Append tasks for subsequent pages
        state.tasks = [...state.tasks, ...tasks];
      }
      state.hasMore = tasks.length > 0; 
      console.log(state.hasMore)// Set hasMore to true if there are more tasks to fetch
    });

    // Handle deleteTask
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const id = action.payload;
      state.tasks = state.tasks.filter((task: any) => task.id !== id);
      state.filteredTasks =
        state.filter === "all"
          ? state.tasks
          : state.filteredTasks.filter((task: any) => task.status === state.filter);
    });

    // Handle updateTaskStatus
    builder.addCase(updateTaskStatus.fulfilled, (state, action) => {
      if (!action.payload) return;
      const { id, status } = action.payload;
      state.tasks = state.tasks.map((task: any) =>
        task.id === id ? { ...task, status } : task
      );
      state.filteredTasks =
        state.filter === "all"
          ? state.tasks
          : state.filteredTasks.filter((task: any) => task.status === state.filter);
    });

    // Handle errors
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(updateTaskStatus.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;
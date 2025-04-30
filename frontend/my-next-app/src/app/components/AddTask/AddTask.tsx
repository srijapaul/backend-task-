"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { fetchTasks } from "@/redux/tasksSlice";
import styles from "./AddTask.module.scss";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";


export const AddTask = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [status, setStatus] = useState("todo");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const router = useRouter();

  const handleAddTask = async () => {
    
    if (title.trim() === "") {
      alert("Task title cannot be empty");
      return;
    }
    if (dueDate === "") {
      alert("Due date cannot be empty");
      return;
    }
    const formattedDueDate = new Date(dueDate).toISOString().split("T")[0];
    try {
      // Send the new task to the backend
      const response = await axiosInstance.post("http://localhost:4000/task/add", 
        {
          title,
          status,
          description,
          dueDate: formattedDueDate, // Send the formatted due date
        },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            
          },
        }
      );

      if (response.status) {
        // Fetch the updated tasks from the backend
        dispatch(fetchTasks({ page: 1, limit: 5 })); // Fetch the first page of tasks again
        setTitle(""); 
        setDescription("");// Clear the input field
        setStatus("todo"); 
        setDueDate("")// Reset the status
        console.log("Task added successfully:", response.data);
        router.push("/tasks/all") // Redirect to the tasks page
      } else {
        throw new Error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert("An error occurred while adding the task");
    }
  };

  return (
    <div
      className={styles["add-task-container"]}
    >
      <h2 className={styles.title}>Add Task</h2>
      <form className={styles["add-task-form"]} onSubmit={async (e) => {
          e.preventDefault(); // Prevent default form submission
          try {
            await handleAddTask(); // Call the function to add the task
          } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while adding the task");
          }
        
      }}>
      <input 
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
        data-cy="add-task-title"
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)} data-cy="add-task-status">
        <option value="todo">Todo</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
        </select>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter task description"
        data-cy="add-task-desc"
      ></textarea>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        data-cy="add-task-date"
      />
      
      <button type="submit" data-cy="add-task-submit">Add Task</button>
      </form>
    </div>
  );
};
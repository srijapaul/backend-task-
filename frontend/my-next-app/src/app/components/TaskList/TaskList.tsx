"use client";

import { useState,useEffect} from "react";
import moment from "moment";
import styles from "./TaskList.module.scss";
import axios from "axios";
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query"; // Import react-query hooks
import { Task } from "@/utils/axiosInstance";


export const TaskList = ({
 
  category,
}: {
  
  category: string;
}) => {

  const [tasks, setTasks] = useState<Task[]>([]); // Initialize with prerendered tasks
  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState<boolean>(); // Track if there are more tasks to load
  const queryClient = useQueryClient(); // Initialize the query client
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"; // Use the environment variable for the API URL

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks", category, page], // Query key
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/task`, {
        params: {
          page,
          limit: 5,
          status: category,
        },
      });

      console.log('incoming', response.data)
      setHasMore((response.data.hasMore))
      if (page > 1) {
        setTasks((prevTasks) => {
          //making a copy of tasks in prevTasks array
          const updatedTasks: Task[] = [...prevTasks]
          //check if ttasks are having duplicates if so add them in the updatedTasks array 
          for (const task of response.data.tasks) {
            if ((prevTasks.findIndex((prevTask) => prevTask._id === task._id)) > 1) {
              updatedTasks[prevTasks.findIndex((prevTask) => prevTask._id === task._id)] = task; // Update existing task
            } else {
              updatedTasks.push(task);
            }
          }

          return updatedTasks
        }); // Append new tasks
      } else {
        setTasks(response.data.tasks); // Set tasks for the first page
      }

      return response.data.tasks as Task[];
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await axios.patch(`${API_URL}/task/${id}`, { status });
      return { id, status };
    },
    onSuccess: ({ id, status }: { id: string; status: string }) => {
      //updating stts of the tasks in the current page without page parameter 
      queryClient.refetchQueries({queryKey: ["tasks", category]});
      // removes the task from the current page based on the category
      //setTasks([]); 
      //queryClient.invalidateQueries({queryKey: ["tasks", category, page]});
      //queryClient.

     
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      const role= localStorage.getItem("role");
      if (role!=="admin"){
        throw new Error("Not authorized to delete tasks");}
        //authentication token checking for admins
      await axios.delete(`${API_URL}/task/${id}`,
        {headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },}
      );
      return id;
    },
    onSuccess: (id: string) => {
      // remove the task from the current page without page parameter
      queryClient.refetchQueries({queryKey: ["tasks", category]});
      //setTasks((prevTasks) => [...prevTasks, ...(data ?? [])])
      // queryClient.setQueryData(["tasks", category, page], (oldData: any) => {
      //   if (!oldData) return oldData;
      //   return {
      //     ...oldData,
      //     tasks: oldData.tasks.filter((task: any) => task._id !== id),
      //   };
      // });
    },
    onError: (error: any) => {
      console.error("error",error);
    }
  });
  const loadMoreTasks = () => {
    // const nextPage = page + 1; // Increment the page number
    // try {
    //   const response = await axios.get(`${API_URL}/task`, {
    //     params: {
    //       page: nextPage,
    //       limit: 5,
    //       status: category,
    //     },
    //   });
  
    //   setTasks((prevTasks) => [...prevTasks, ...response.data.tasks]); // Append new tasks
    //   setHasMore(response.data.hasMore); // Update hasMore state
    //   setPage(nextPage); // Update the page state
    // } catch (error) {
    //   console.error("Failed to load more tasks:", error);
    // }
    setPage((prevPage) => prevPage + 1);
  };
 
  // useEffect(() => {
  //   const tasks = (data ?? []) as Task[]
  //   if (tasks.length > 0) {
  //    // setTasks(tasks); // Update tasks state with fetched data
  //     setTasks((prevTasks) => [...prevTasks, ...tasks]); 
  //     // setHasMore(); // Update hasMore state
  //     // console.log("tasks",data.tasks)
  //     // console.log("hassMore",data.hasMore)
  //   }
  // }, [data]);
  
  
  if (isLoading) return <p>Loading tasks...</p>;
  if (isError) return <p>Failed to load tasks.</p>;

  


 
  return (
    <div className={styles["task-list-container"]}>
      <div className={styles["task-container"]}>
        {tasks.map((task: any) => (
          <div key={task._id} className={styles["task-card"]} data-cy="task-card">
            <h3 data-cy="task-title">{task.title}</h3>
            <p data-cy="task-desc">{task.description}</p>
            <p data-cy="task-status">Current Status: {task.status}</p>
            <p data-cy="task-date">Due Date: {moment(task.dueDate).format("MMMM DD, YYYY")}</p>
            <div className={styles["task-buttons"]}>
              {localStorage.getItem("role") === "admin" && (<button data-cy="task-delete" onClick={() => deleteTaskMutation.mutate(task._id)}>Delete</button>)}
              <button data-cy="task-todo" onClick={() => updateTaskMutation.mutate({ id: String(task._id), status: "todo" })}>Mark as Todo</button>
              <button data-cy="task-doing" onClick={() => updateTaskMutation.mutate({ id: String(task._id), status: "doing" })}>Mark as Doing</button>
              <button data-cy="task-done" onClick={() => updateTaskMutation.mutate({ id: String(task._id), status: "done" })}>Mark as Done</button>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <button onClick={loadMoreTasks} className={styles["load-more-button"]}>
          Load More
        </button>
      )}
    </div>
  );
};
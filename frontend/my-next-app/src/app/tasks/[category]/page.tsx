"use client";
import { Sidebar } from "@/app/components/Sidebar/Sidebar";
import styles from "../../dashboard/Dashboard.module.scss";
import { TaskList } from "@/app/components/TaskList/TaskList";
import React ,{useEffect, useContext, useRef} from "react";
import { useThemeContext } from "@/app/context/ThemeContext";
import {motion } from "framer-motion";
 

// Fetch tasks on the server
// async function fetchTasks(category: string) {
//   const API_URL = process.env.API_URL || "http://localhost:4000";
//   console.log("API_URL:", API_URL); // Debugging

//   const response = await fetch(`${API_URL}/task?page=1&limit=5&status=${category || "all"}`, {
//     cache: "no-store",
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     console.error("API Error Response:", errorText);
//    //hrow new Error("Failed to fetch tasks");
//   }

//   return response.json();

//   // try {
//   //   const response = await fetch(`${API_URL}/task?page=1&limit=5&status=${category || "all"}`, {
//   //     cache: "no-store",
//   //   });

//   //   if (!response.ok) {
//   //     const errorText = await response.text();
//   //     console.error("API Error Response:", errorText);
//   //    //hrow new Error("Failed to fetch tasks");
//   //   }

//   //   console.log(response);
//   //   return response;
//   // } catch (error) {
//   //   console.error("Fetch Tasks Error:", error);
//   //  //hrow error;
//   // }
// }

export default function CategoryPage({params}: { params: { category: string } }) {
  const { category } = params; // Extract category from the URL
  const { theme,toggleTheme} = useThemeContext(); // Use the theme context
  const ref=useRef(null); // Create a reference for the drag constraints
 // const data = await fetchTasks(category); // Fetch tasks on the server
//  const { hasMore } = data;

 // console.log(data);

 useEffect(() => {
  const pageTitle = category.charAt(0).toUpperCase() + category.slice(1);
  document.title = `${pageTitle} Tasks`;
}, [category]);

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <h2 className={styles.title}>{category.charAt(0).toUpperCase()+category.slice(1)}</h2>
        <motion.button drag dragConstraints={ref} ref={ref} onClick={toggleTheme} className="themeToggleButton">
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </motion.button>
        <div className={styles.taskList}>
          {/* Pass prerendered tasks and hasMore to TaskList */}
          <TaskList  category={category}  />
          {/* initialTasks={data} initialHasMore={hasMore} 
          */}
        </div>
      </div>
    </div>
  );
}
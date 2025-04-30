"use client"
import { AddTask } from '../components/AddTask/AddTask';
import { Sidebar } from '../components/Sidebar/Sidebar';
import styles from './Dashboard.module.scss'
import { useThemeContext } from "../context/ThemeContext"; // Import the theme context
import { motion } from 'framer-motion';
import { useRef } from 'react';

  export default function RegisterPage() {
    const {theme, toggleTheme} = useThemeContext(); // Default theme is light
    const ref = useRef(null); // Create a reference for the drag constraints
    return(
        <div className={`${styles.dashboard} ${
          theme === "light" ? "light-theme" : "dark-theme"
        }`}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={styles.mainContent} >
          <motion.button drag dragConstraints={ref} onClick={toggleTheme} ref={ref} className="themeToggleButton">
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </motion.button>
        {/* <h2 className={styles.title}>Task Manager</h2> */}
        <div className={styles.addTask}>
          <AddTask />
        </div>
      </div>
    </div>
    )
  }
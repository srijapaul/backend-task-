'use client';
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import styles from "./Sidebar.module.scss";

export const Sidebar = () => {
  const router = useRouter();

  const handleNavigation = (category: string) => {
    router.push(`/tasks/${category}`); // Navigate to the respective category page
  };

  return (
    <div className={styles["sidebar"]}>
      <button className={styles['sidebar-item']} onClick={() => handleNavigation("all")}>All</button>
      <button className={styles['sidebar-item']} onClick={() => handleNavigation("todo")}>Todo</button>
      <button className={styles['sidebar-item']} onClick={() => handleNavigation("doing")}>Doing</button>
      <button className={styles['sidebar-item']} onClick={() => handleNavigation("done")}>Done</button>
    </div>
  );
};
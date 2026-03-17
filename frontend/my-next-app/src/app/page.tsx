"use client"
import React, { useRef } from 'react'
import { useRouter } from 'next/navigation'
import {motion} from 'framer-motion'
const Page = () => {
  const router = useRouter();
  const ref=useRef(null);
  return (
    <div ref={ref}>
      <h1 data-testid="cypress-title">Task Manager</h1>
      
      <motion.button drag dragConstraints={ref} className="themeToggleButton" ref={ref} onClick={() => router.push('/login')}>Login to see your Dashboard</motion.button>
    </div>
  )
}

export default Page

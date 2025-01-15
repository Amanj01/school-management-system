'use client'

import { useState } from 'react'
import Menu from './Menu'

export default function MenuWrapper() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-primary"
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>
      
      <div className={`
        fixed lg:relative
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out
        bg-background lg:bg-transparent
        w-64 lg:w-auto
        h-screen lg:h-auto
        z-40
        shadow-lg lg:shadow-none
      `}>
        <Menu />
      </div>
    </>
  )
}

'use client'
import React, { useState, useEffect } from 'react'

const EnhancedSpinner = () => {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) return ''
        return prevDots + '.'
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-t-primary border-r-secondary border-b-accent border-l-transparent animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full"></div>
      </div>
      <p className="text-foreground font-medium text-sm pl-8">
        Loading<span className="inline-block w-8">{dots}</span>
      </p>
    </div>
  )
}

export { EnhancedSpinner }

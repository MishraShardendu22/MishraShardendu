"use client"
import React from 'react'
import { useCodeEditorStore } from '../store/useCodeEditor'
import { Play, Loader2 } from 'lucide-react'

const RunButton = () => {
  const { runCode, isRunning } = useCodeEditorStore()

  const handleRunCode = () => {
    if (!isRunning) {
      runCode()
    }
  }

  return (
    <button
      onClick={handleRunCode}
      disabled={isRunning}
      className={`
        flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md
        transition-all duration-200 
        ${isRunning 
          ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
          : 'bg-green-600 text-white hover:bg-green-700 active:scale-95'
        }
      `}
    >
      {isRunning ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Running...</span>
        </>
      ) : (
        <>
          <Play className="w-4 h-4" />
          <span>Run Code</span>
        </>
      )}
    </button>
  )
}

export default RunButton
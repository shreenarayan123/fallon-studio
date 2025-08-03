"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"

interface AddTodoFormProps {
  onAddTodo: (text: string, priority: "high" | "medium" | "low") => void
}

export function AddTodoForm({ onAddTodo }: AddTodoFormProps) {
  const [text, setText] = useState("")
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAddTodo(text.trim(), priority)
      setText("")
      setPriority("medium")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Priority:</span>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as "high" | "medium" | "low")}
            className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          >
            <option value="low" className="bg-white">
              Low
            </option>
            <option value="medium" className="bg-white">
              Medium
            </option>
            <option value="high" className="bg-white">
              High
            </option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!text.trim()}
          className="ml-auto px-6 py-2 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-medium transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>
    </form>
  )
}

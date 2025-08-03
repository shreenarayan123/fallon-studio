"use client"

import { Check, Trash2, AlertCircle, Circle, Minus } from "lucide-react"
import type { Todo } from "@/hooks/useBackendTodos"

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      case "medium":
        return "text-amber-400 bg-amber-500/20 border-amber-500/30"
      case "low":
        return "text-sky-400 bg-sky-500/20 border-sky-500/30"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-4 h-4" />
      case "medium":
        return <Circle className="w-4 h-4" />
      case "low":
        return <Minus className="w-4 h-4" />
      default:
        return <Circle className="w-4 h-4" />
    }
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <Check className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-600 text-lg">No tasks yet</p>
        <p className="text-gray-500 text-sm mt-1">Add your first task to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`group p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
            todo.completed
              ? "bg-gray-50 border-gray-200 opacity-60"
              : "bg-white border-gray-200 hover:bg-gray-50 shadow-sm"
          }`}
        >
          <div className="flex items-start gap-3">
            <button
              onClick={() => onToggle(todo.id)}
              className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                todo.completed
                  ? "bg-gradient-to-r from-sky-500 to-blue-500 border-transparent"
                  : "border-gray-300 hover:border-sky-400 hover:bg-sky-50"
              }`}
            >
              {todo.completed && <Check className="w-4 h-4 text-white" />}
            </button>

            <div className="flex-1 min-w-0">
              <p
                className={`text-gray-800 font-medium transition-all duration-300 ${todo.completed ? "line-through opacity-60" : ""}`}
              >
                {todo.text}
              </p>
              
              {/* Description */}
              {todo.description && (
                <p
                  className={`text-sm text-gray-600 mt-1 transition-all duration-300 ${todo.completed ? "line-through opacity-60" : ""}`}
                >
                  {todo.description}
                </p>
              )}
              
              {/* Tags */}
              {todo.tags && todo.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {todo.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full transition-all duration-300 ${
                        todo.completed ? "opacity-60" : ""
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${getPriorityColor(todo.priority)}`}
                >
                  {getPriorityIcon(todo.priority)}
                  {todo.priority}
                </span>
                <span className="text-xs text-gray-500">{todo.createdAt.toLocaleDateString()}</span>
              </div>
            </div>

            <button
              onClick={() => onDelete(todo.id)}
              className="opacity-0 group-hover:opacity-100 p-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 transition-all duration-300"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

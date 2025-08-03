"use client"

import { useState, useEffect } from "react"
import { Plus, Brain, Zap, Target } from "lucide-react"
import { TodoList } from "@/components/todo-list"
import { ChatPanel } from "@/components/chat-panel"
import { ProgressBar } from "@/components/progress-bar"
import { AddTodoForm } from "@/components/add-todo-form"

export interface TodoType {
  id: string
  text: string
  completed: boolean
  priority: "high" | "medium" | "low"
  createdAt: Date
}

export default function Todo() {
  const [todos, setTodos] = useState<TodoType[]>([])
  const [isChatOpen, setIsChatOpen] = useState(false)

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("ai-todos")
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
      }))
      setTodos(parsedTodos)
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("ai-todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string, priority: "high" | "medium" | "low") => {
    const newTodo: TodoType = {
      id: Date.now().toString(),
      text,
      completed: false,
      priority,
      createdAt: new Date(),
    }
    setTodos((prev) => [newTodo, ...prev])
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const completedCount = todos.filter((todo) => todo.completed).length
  const totalCount = todos.length
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-50 to-slate-50"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-sky-100/80 backdrop-blur-md border border-sky-200">
              <Brain className="w-8 h-8 text-sky-600" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-slate-600 bg-clip-text text-transparent">
              AI Todo Manager
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Organize your tasks with AI-powered assistance</p>
        </div>

        {/* Progress Bar */}
        <ProgressBar completed={completedCount} total={totalCount} percentage={completionPercentage} />

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Left Column - Todo Management */}
          <div className="space-y-6">
            {/* Add Todo Form */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-gray-200 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Plus className="w-6 h-6 text-sky-600" />
                <h2 className="text-xl font-semibold text-gray-800">Add New Task</h2>
              </div>
              <AddTodoForm onAddTodo={addTodo} />
            </div>

            {/* Quick Actions */}
           

            {/* Todo List */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-gray-200 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
                <span className="ml-auto text-sm text-gray-500">
                  {completedCount} of {totalCount} completed
                </span>
              </div>
              <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
            </div>
          </div>

          {/* Right Column - AI Chat */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">AI Assistant</h2>
                  <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <ChatPanel todos={todos} isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

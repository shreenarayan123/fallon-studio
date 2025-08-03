"use client"

import { useState } from "react"
import { Plus, Brain, Zap, Target, Loader2 } from "lucide-react"
import { TodoList } from "@/components/todo-list"
import { ChatPanel } from "@/components/chat-panel"
import { ProgressBar } from "@/components/progress-bar"
import { AddTodoForm } from "@/components/add-todo-form"
import { useBackendTodos, Todo } from "@/hooks/useBackendTodos"

export type { Todo }
export default function TodoManager() {
  const { todos, loading, addTodo, toggleTodo, deleteTodo } = useBackendTodos()
  const [isChatOpen, setIsChatOpen] = useState(false)

  const completedCount = todos.filter((todo) => todo.completed).length
  const totalCount = todos.length
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
          <span className="text-xl text-gray-600">Loading your tasks...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-50 to-slate-50"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
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
       <div className="w-full md:flex justify-center "> <ProgressBar completed={completedCount} total={totalCount} percentage={completionPercentage} /></div>
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
            </div>            {/* Todo List */}
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

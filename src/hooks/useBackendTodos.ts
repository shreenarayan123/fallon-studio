'use client';

import { useState, useEffect } from 'react';

export interface Todo {
  id: string;
  text: string;
  description?: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  tags: string[];
  createdAt: Date;
}

// Backend priority mapping
const priorityMap = {
  high: 'HIGH',
  medium: 'MEDIUM', 
  low: 'LOW'
} as const;

const reversePriorityMap = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
} as const;

export function useBackendTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/todos');
      if (response.ok) {
        const backendTodos = await response.json();
        
        // Convert backend format to frontend format
        const frontendTodos: Todo[] = backendTodos.map((todo: any) => ({
          id: todo.id,
          text: todo.title,
          description: todo.description,
          completed: todo.completed,
          priority: reversePriorityMap[todo.priority as keyof typeof reversePriorityMap],
          tags: todo.tags || [],
          createdAt: new Date(todo.createdAt),
        }));
        
        setTodos(frontendTodos);
      } else {
        console.error('Failed to fetch todos');
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (
    text: string, 
    priority: "high" | "medium" | "low",
    description?: string,
    tags: string[] = []
  ) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: text,
          description: description || '',
          priority: priorityMap[priority],
          tags: tags,
        }),
      });

      if (response.ok) {
        const newBackendTodo = await response.json();
        const newFrontendTodo: Todo = {
          id: newBackendTodo.id,
          text: newBackendTodo.title,
          description: newBackendTodo.description,
          completed: newBackendTodo.completed,
          priority: reversePriorityMap[newBackendTodo.priority as keyof typeof reversePriorityMap],
          tags: newBackendTodo.tags || [],
          createdAt: new Date(newBackendTodo.createdAt),
        };
        
        setTodos(prev => [newFrontendTodo, ...prev]);
      } else {
        console.error('Failed to add todo');
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (response.ok) {
        setTodos(prev =>
          prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
        );
      } else {
        console.error('Failed to toggle todo');
      }
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(prev => prev.filter(todo => todo.id !== id));
      } else {
        console.error('Failed to delete todo');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return {
    todos,
    loading,
    addTodo,
    toggleTodo,
    deleteTodo,
    refreshTodos: fetchTodos,
  };
}

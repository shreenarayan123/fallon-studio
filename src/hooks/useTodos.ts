'use client';

import { useState, useEffect } from 'react';
import { Todo, CreateTodoInput, UpdateTodoInput } from '@/types/todo';
import { Priority } from '@prisma/client';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      if (response.ok) {
        const todosData = await response.json();
        // Convert date strings back to Date objects
        const todosWithDates = todosData.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
        }));
        setTodos(todosWithDates);
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
    title: string, 
    description?: string, 
    priority: Priority = 'MEDIUM', 
    tags: string[] = []
  ) => {
    try {
      const todoData: CreateTodoInput = {
        title,
        description,
        priority,
        tags,
      };

      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      });

      if (response.ok) {
        const newTodo = await response.json();
        const todoWithDates = {
          ...newTodo,
          createdAt: new Date(newTodo.createdAt),
          updatedAt: new Date(newTodo.updatedAt),
        };
        setTodos(prev => [todoWithDates, ...prev]);
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
        const updatedTodo = await response.json();
        const todoWithDates = {
          ...updatedTodo,
          createdAt: new Date(updatedTodo.createdAt),
          updatedAt: new Date(updatedTodo.updatedAt),
        };
        setTodos(prev =>
          prev.map(t => t.id === id ? todoWithDates : t)
        );
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
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const updateTodo = async (id: string, updates: UpdateTodoInput) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        const todoWithDates = {
          ...updatedTodo,
          createdAt: new Date(updatedTodo.createdAt),
          updatedAt: new Date(updatedTodo.updatedAt),
        };
        setTodos(prev =>
          prev.map(t => t.id === id ? todoWithDates : t)
        );
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return {
    todos,
    loading,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    refreshTodos: fetchTodos,
  };
}

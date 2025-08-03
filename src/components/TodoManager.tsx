'use client';

import { useState } from 'react';
import { Plus, MessageCircle, Trash2, Check, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTodos } from '@/hooks/useTodos';
import { Priority } from '@prisma/client';

export default function TodoManager() {
  const { todos, loading, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTodo, setNewTodo] = useState({ 
    title: '', 
    description: '', 
    priority: 'MEDIUM' as Priority, 
    tags: '' 
  });
  const [question, setQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const handleAddTodo = async () => {
    if (newTodo.title.trim()) {
      const tags = newTodo.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      await addTodo(newTodo.title, newTodo.description, newTodo.priority, tags);
      setNewTodo({ title: '', description: '', priority: 'MEDIUM', tags: '' });
      setShowAddForm(false);
    }
  };

  const handleAskAI = async () => {
    if (!question.trim()) return;
    
    setIsLoadingAI(true);
    try {
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiResponse(data.response);
      } else {
        setAiResponse('Sorry, I encountered an error while processing your question. Please try again.');
      }
    } catch (error) {
      setAiResponse('Sorry, I encountered an error while processing your question. Please try again.');
    } finally {
      setIsLoadingAI(false);
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-500';
      case 'MEDIUM': return 'bg-yellow-500';
      case 'LOW': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const completedTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading todos...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Todo Manager</h1>
        <p className="text-gray-600">
          {totalTodos === 0 ? 'No todos yet' : `${completedTodos} of ${totalTodos} completed`}
        </p>
      </div>

      {/* AI Question Section */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Ask AI About Your Todos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about your todos... (e.g., 'How many high priority tasks do I have?')"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAskAI()}
              className="flex-1"
            />
            <Button 
              onClick={handleAskAI} 
              disabled={isLoadingAI || !question.trim()}
              className="whitespace-nowrap"
            >
              {isLoadingAI ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Thinking...
                </>
              ) : (
                'Ask AI'
              )}
            </Button>
          </div>
          {aiResponse && (
            <div className="bg-white p-4 rounded-lg border">
              <p className="text-gray-800">{aiResponse}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Todo Section */}
      <div className="space-y-4">
        {!showAddForm ? (
          <Button 
            onClick={() => setShowAddForm(true)} 
            className="w-full"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Todo
          </Button>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Add New Todo
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowAddForm(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Todo title"
                value={newTodo.title}
                onChange={(e) => setNewTodo(prev => ({ ...prev, title: e.target.value }))}
              />
              <Textarea
                placeholder="Description (optional)"
                value={newTodo.description}
                onChange={(e) => setNewTodo(prev => ({ ...prev, description: e.target.value }))}
              />
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select
                    value={newTodo.priority}
                    onChange={(e) => setNewTodo(prev => ({ ...prev, priority: e.target.value as Priority }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                  <Input
                    placeholder="work, urgent, home"
                    value={newTodo.tags}
                    onChange={(e) => setNewTodo(prev => ({ ...prev, tags: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddTodo} className="flex-1">
                  Add Todo
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Todos List */}
      <div className="space-y-4">
        {todos.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 text-lg">No todos yet. Add one to get started!</p>
            </CardContent>
          </Card>
        ) : (
          todos.map((todo) => (
            <Card key={todo.id} className={`transition-opacity ${todo.completed ? 'opacity-60' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleTodo(todo.id)}
                    className={`mt-1 ${todo.completed ? 'text-green-600' : 'text-gray-400'}`}
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {todo.title}
                      </h3>
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(todo.priority)}`} title={`${todo.priority.toLowerCase()} priority`} />
                    </div>
                    
                    {todo.description && (
                      <p className={`text-sm ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                        {todo.description}
                      </p>
                    )}
                    
                    {todo.tags.length > 0 && (
                      <div className="flex gap-1 flex-wrap">
                        {todo.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-400">
                      Created: {todo.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

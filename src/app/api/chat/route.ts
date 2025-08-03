import { NextRequest, NextResponse } from 'next/server';
import { GeminiService } from '@/lib/gemini';

const geminiService = new GeminiService();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, todos } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const formattedTodos = todos.map((todo: any) => ({
      id: todo.id,
      title: todo.text,
      description: todo.description || '',
      completed: todo.completed,
      priority: todo.priority.toUpperCase(),
      tags: todo.tags || [],
      createdAt: new Date(todo.createdAt), 
      updatedAt: new Date(todo.createdAt),
    }));

    // Get AI response 
    const response = await geminiService.askAboutTodos(message, formattedTodos);

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Error getting AI response:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { GeminiService } from '@/lib/gemini';
import { prisma } from '@/lib/prisma';

const geminiService = new GeminiService();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question } = body;

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    // Fetch all todos from database
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Get AI response
    const response = await geminiService.askAboutTodos(question, todos);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error getting AI response:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    );
  }
}

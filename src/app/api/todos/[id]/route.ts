import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Priority } from '@prisma/client';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const todo = await prisma.todo.findUnique({
      where: { id: params.id }
    });

    if (!todo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todo' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, description, completed, priority, tags } = body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;
    if (priority !== undefined) updateData.priority = priority as Priority;
    if (tags !== undefined) updateData.tags = tags;

    const todo = await prisma.todo.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.todo.delete({
      where: { id: params.id }
    });

    return NextResponse.json(
      { message: 'Todo deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}

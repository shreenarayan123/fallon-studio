import { GoogleGenerativeAI } from '@google/generative-ai';
import { Todo } from '@/types/todo';

const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBhMugAN4LGc2EVRNNEbkp0Z7gQNdktxtI';
const genAI = new GoogleGenerativeAI(API_KEY);

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  async askAboutTodos(question: string, todos: Todo[]): Promise<string> {
    try {
      const todosContext = todos.map(todo => ({
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
        priority: todo.priority.toLowerCase(),
        tags: todo.tags,
        createdAt: todo.createdAt instanceof Date 
          ? todo.createdAt.toISOString() 
          : new Date(todo.createdAt).toISOString(),
      }));

      const prompt = `
You are a helpful assistant that can answer questions about a user's to-do list. 
Here is the current list of todos with full details:

${JSON.stringify(todosContext, null, 2)}

User question: ${question}

Please provide a helpful answer based on the todo data above. You have access to:
- Task titles and descriptions
- Completion status
- Priority levels (high, medium, low)
- Tags for categorization
- Creation dates

Be concise and specific. If the question is about statistics, provide numbers. 
If it's about specific todos, mention them by title and include relevant details like descriptions or tags when helpful.
If there are no todos relevant to the question, let the user know politely.
Format your response in a friendly, conversational way and use the rich data available (descriptions, tags) to provide more context.
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error('Failed to get response from AI. Please try again.');
    }
  }
}

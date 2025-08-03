import { GoogleGenerativeAI } from '@google/generative-ai';
import { Todo } from '@/types/todo';

const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBhMugAN4LGc2EVRNNEbkp0Z7gQNdktxtI';
const genAI = new GoogleGenerativeAI(API_KEY);

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  async askAboutTodos(question: string, todos: Todo[]): Promise<string> {
    try {
      // Format todos for context
      const todosContext = todos.map(todo => ({
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
        priority: todo.priority.toLowerCase(),
        tags: todo.tags,
        createdAt: todo.createdAt.toISOString(),
      }));

      const prompt = `
You are a helpful assistant that can answer questions about a user's to-do list. 
Here is the current list of todos:

${JSON.stringify(todosContext, null, 2)}

User question: ${question}

Please provide a helpful answer based on the todo data above. Be concise and specific. 
If the question is about statistics, provide numbers. If it's about specific todos, mention them by title.
If there are no todos relevant to the question, let the user know politely.
Format your response in a friendly, conversational way.
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

# 🚀 AI Todo Manager

A modern, intelligent todo application built with Next.js, featuring AI-powered assistance through Google's Gemini API and persistent data storage with PostgreSQL and Prisma.

![AI Todo Manager](https://img.shields.io/badge/Next.js-15.4.5-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Prisma](https://img.shields.io/badge/Prisma-6.13.0-2D3748) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-NeonDB-336791)

## ✨ Features

### 🎯 **Core Todo Management**
- ✅ **Create, Read, Update, Delete** todos with full CRUD operations
- ✅ **Rich todo details** including title, description, priority levels, and tags
- ✅ **Priority system** with High, Medium, and Low levels
- ✅ **Tag-based organization** for better categorization
- ✅ **Completion tracking** with visual progress indicators
- ✅ **Persistent storage** in PostgreSQL database

### 🤖 **AI-Powered Assistant**
- ✅ **Conversational chat interface** powered by Google Gemini AI
- ✅ **Context-aware responses** based on your actual todo data
- ✅ **Intelligent suggestions** for task organization and prioritization
- ✅ **Natural language queries** about your tasks
- ✅ **Real-time AI responses** with loading indicators

### 🎨 **Modern UI/UX**
- ✅ **Glassmorphism design** with beautiful blur effects
- ✅ **Responsive layout** that works on all screen sizes
- ✅ **Smooth animations** and transitions
- ✅ **Dark/Light theme support** through Tailwind CSS
- ✅ **Intuitive interactions** with hover effects and feedback

### 🔧 **Technical Features**
- ✅ **Type-safe** with full TypeScript support
- ✅ **Real-time updates** with optimistic UI updates
- ✅ **Error handling** with graceful fallbacks
- ✅ **API-first architecture** with Next.js App Router
- ✅ **Database migrations** with Prisma
- ✅ **Environment-based configuration**

## 🏗️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (NeonDB)
- **AI**: Google Gemini API
- **Icons**: Lucide React
- **Deployment Ready**: Vercel, Railway, etc.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- PostgreSQL database (we recommend [NeonDB](https://neon.tech) for free hosting)
- Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/shreenarayan123/fallon-studio.git
cd fallon-studio
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# Gemini AI
GEMINI_API_KEY="your-gemini-api-key-here"
```

**Get your database URL:**
- Sign up at [NeonDB](https://neon.tech) (free tier available)
- Create a new project and copy the connection string

**Get your Gemini API key:**
- Visit [Google AI Studio](https://makersuite.google.com)
- Create an API key for Gemini

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) View your database
npx prisma studio
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
fallon-studio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── todos/          # Todo CRUD endpoints
│   │   │   └── chat/           # AI chat endpoint
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Main page
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── chat-panel.tsx      # AI chat interface
│   │   ├── todo-list.tsx       # Todo display component
│   │   ├── add-todo-form.tsx   # Todo creation form
│   │   └── progress-bar.tsx    # Progress visualization
│   ├── hooks/
│   │   └── useBackendTodos.ts  # Todo management hook
│   ├── lib/
│   │   ├── prisma.ts           # Prisma client
│   │   ├── gemini.ts           # AI service
│   │   └── utils.ts            # Utility functions
│   └── types/
│       └── todo.ts             # TypeScript types
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Database migrations
├── public/                     # Static assets
└── package.json
```

## 🎮 Usage Guide

### Adding Todos
1. Use the **"Add New Task"** form on the left side
2. Enter a title (required)
3. Add an optional description for more context
4. Set priority level (High, Medium, Low)
5. Add tags for organization (press Enter to add each tag)
6. Click "Add Task"

### Managing Todos
- **Complete/Uncomplete**: Click the circle button next to any todo
- **Delete**: Hover over a todo and click the trash icon
- **View Details**: All todos show title, description, tags, and creation date

### AI Assistant
1. Use the chat panel on the right side
2. Ask questions about your todos:
   - "What tasks do I have today?"
   - "Show me high priority items"
   - "What work tasks are incomplete?"
   - "How many todos are tagged with 'urgent'?"
3. Get intelligent responses based on your actual data

## 🔧 API Endpoints

### Todos
- `GET /api/todos` - Fetch all todos
- `POST /api/todos` - Create a new todo
- `GET /api/todos/[id]` - Get specific todo
- `PATCH /api/todos/[id]` - Update todo
- `DELETE /api/todos/[id]` - Delete todo

### AI Chat
- `POST /api/chat` - Send message to AI assistant

## 🗄️ Database Schema

```prisma
model Todo {
  id          String   @id @default(cuid())
  title       String
  description String?
  completed   Boolean  @default(false)
  priority    Priority @default(MEDIUM)
  tags        String[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Railway
1. Connect your GitHub repository to [Railway](https://railway.app)
2. Add environment variables
3. Deploy with automatic builds

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `GEMINI_API_KEY` | Google Gemini API key | ✅ |

## 🎯 Example AI Queries

Try asking your AI assistant:

- **Statistics**: "How many todos do I have?"
- **Filtering**: "Show me high priority tasks"
- **Organization**: "What work-related tasks are pending?"
- **Planning**: "What should I focus on today?"
- **Analysis**: "Which tags do I use most?"

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for the amazing React framework
- [Prisma](https://prisma.io) for the excellent database toolkit
- [NeonDB](https://neon.tech) for serverless PostgreSQL
- [Google Gemini](https://ai.google.dev) for powerful AI capabilities
- [shadcn/ui](https://ui.shadcn.com) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com) for utility-first CSS

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/shreenarayan123">Shree Narayan</a>
</p>

<p align="center">
  <a href="#-ai-todo-manager">⬆️ Back to Top</a>
</p>

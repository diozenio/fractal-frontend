# Fractal Frontend

> Frontend for a task management application with a modern, responsive interface.

## Features

-   **Authentication**: Secure user authentication including signup, login, and Google social login.
-   **Task Management**: Full CRUD (Create, Read, Update, Delete) operations for tasks and subtasks, displayed on a drag-and-drop Kanban board.
-   **AI Subtask Generation**: Automatically break down tasks into smaller subtasks using AI.
-   **Responsive Design**: A user-friendly interface that adapts to different screen sizes.
-   **Session Management**: Uses JWT stored in cookies for managing user sessions.

---

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:
-   Node.js >= 18
-   pnpm

### Installation

```bash
git clone https://github.com/diozenio/fractal-frontend.git
cd fractal-frontend
pnpm install
```

Create a `.env` file by copying the example:

```bash
cp .env.example .env
```

Or manually create a *.env* file with the following content from the example:

```env
# Next
NEXT_PUBLIC_API_URL=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_REDIRECT_URI=

# JWT
JWT_SECRET=
```

### Running the App

Run the development server:

```bash
pnpm dev
```
---

## Folder Structure

```
fractal-frontend/
├── src/
│   ├── app/         → Routing, pages, and layouts for the Next.js application
│   ├── ui/          → Reusable UI components
│   ├── constants/   → Application constants
│   ├── container/   → Dependency injection container for services
│   ├── core/        → Core business logic, domain models, services, and use cases
│   ├── hooks/       → Custom React hooks for state management and side effects
│   ├── infra/       → Infrastructure layer (API clients, mock data)
│   ├── lib/         → Utility functions and libraries (API client, JWT, cookies)
│   ├── providers/   → React context providers for managing global state
│   └── store/       → Zustand stores for state management
└── public/          → Static assets like images and fonts
```

---

## Technologies Used

-   **Framework**: Next.js (React)
-   **Styling**: Tailwind CSS, shadcn/ui
-   **State Management**: Zustand, React Query
-   **Data Fetching**: Axios
-   **Type Checking**: TypeScript
-   **Validation**: Zod
-   **Package Manager**: pnpm

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT

# AI Agent Workflow Standard Operating Procedure

## Development Lifecycle
When assigned a new feature or task from `TODOS.md`, follow this exact workflow:

### Step 1: Read & Understand Context
1. Read `docs/PRD.md` and `docs/ARCHITECTURE.md` to ensure architectural alignment.
2. Check `TODOS.md` for current task status and dependencies.

### Step 2: Implementation Guidelines
1. Draft or update TypeScript interfaces in `types/` first.
2. Implement backend logic/API Routes or Sanity GROQ queries.
3. Build responsive UI components using Tailwind CSS and Shadcn primitives.
4. Add input validation using `zod` for all user-submitted forms.

### Step 3: Verification & Update
1. Test for TypeScript errors and broken imports.
2. Update `TODOS.md` by marking completed tasks.
3. Append a brief summary of implemented changes to `docs/PROGRESS.md`.
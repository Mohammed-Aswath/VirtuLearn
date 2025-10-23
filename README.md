# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/285c3a50-92ef-4287-bf10-8164436e0991

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/285c3a50-92ef-4287-bf10-8164436e0991) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/285c3a50-92ef-4287-bf10-8164436e0991) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## How to replace mock data with real API endpoints

This app is wired to an API layer in `src/services/api.js`. To migrate from mocks to the real Node/Express backend:

1. Set `VITE_BACKEND_URL` to your backend base URL (e.g., `http://localhost:8081`).
2. Ensure axios baseURL uses `VITE_BACKEND_URL` and JWT is attached via interceptors (already implemented).
3. Keep component contracts unchanged (shape of responses must match the frontend expectations noted in file headers). If your backend schema differs, adapt and normalize data in `services/api.js` only.
4. Sample conversion when your backend returns `{ success, data, message }`:

```js
// services/api.js
const api = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('virtulearn_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
const unwrap = (res) => (res?.data && Object.prototype.hasOwnProperty.call(res.data, 'data') ? res.data.data : res?.data);
export async function getQuizzes(params) {
  const res = await api.get('/api/quizzes', { params });
  return unwrap(res);
}
```

Developer workflow:
- Build UI against mocks → hook up real endpoints in `services/api.js` → remove mocks by switching the env flag.

Using the real backend:
- Set `VITE_BACKEND_URL=http://localhost:8081` in a `.env` at the project root
- Start backend: `cd backend && npm run start:dev`
- Seed users: `npm run seed` (backend)
  - Student: `alex@example.com / password123`
  - Teacher: `sarah@example.com / password123`
- Login via app; JWT is stored locally and sent on future requests

### AI Assistant: connect to Gemini or GPT

- Backend expects environment variables (in `backend/.env`):
  - `GEMINI_API_KEY=your_key_here`
  - optional: `GEMINI_MODEL=gemini-1.5-flash`, `GEMINI_TIMEOUT_MS=60000`, `CLIENT_URL=http://localhost:5173`
- Frontend will POST to `POST /api/ai/chat` via `src/services/api.js`.
- If `GEMINI_API_KEY` is missing, the backend returns a safe fallback response. Set the key and restart the backend to enable real model replies.

Example backend `.env`:

```
PORT=8081
MONGODB_URI=mongodb://localhost:27017/virtulearn
JWT_SECRET=change_me
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=sk-...your-key...
GEMINI_MODEL=gemini-1.5-flash
GEMINI_TIMEOUT_MS=60000
```

Example frontend `.env`:

```
VITE_BACKEND_URL=http://localhost:8081
```
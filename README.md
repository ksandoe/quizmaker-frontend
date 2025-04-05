# Quiz Maker Frontend

A React application for creating quizzes from YouTube videos using AI.

## Features

- Authentication with Supabase
- YouTube video processing
- AI-generated quiz questions
- Question editing and regeneration
- Responsive design with Tailwind CSS

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Supabase account and project
- YouTube API key

## Environment Variables

The following environment variables are required:

```env
VITE_API_URL=<backend-api-url>
VITE_SUPABASE_URL=<supabase-project-url>
VITE_SUPABASE_ANON_KEY=<supabase-anon-key>
VITE_YOUTUBE_API_KEY=<youtube-api-key>
```

## Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

## Production Build

1. Create a production build:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

## Deployment

The application is configured for deployment on AWS Amplify. Environment variables are managed through AWS Systems Manager Parameter Store.

Required SSM parameters:
- /quizmaker/dev/VITE_SUPABASE_URL
- /quizmaker/dev/VITE_SUPABASE_ANON_KEY
- /quizmaker/dev/VITE_YOUTUBE_API_KEY

## License

MIT

import { Plugin } from 'vite';

export default function envPlugin(): Plugin {
  return {
    name: 'env-plugin',
    config(_, { command }) {
      if (command === 'build') {
        return {
          define: {
            __VITE_SUPABASE_URL__: JSON.stringify(process.env.VITE_SUPABASE_URL),
            __VITE_SUPABASE_ANON_KEY__: JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY),
            __VITE_YOUTUBE_API_KEY__: JSON.stringify(process.env.VITE_YOUTUBE_API_KEY),
            __VITE_API_URL__: JSON.stringify(process.env.VITE_API_URL)
          }
        };
      }
    }
  };
}

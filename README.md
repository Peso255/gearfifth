# Gearfifth

## Environment Variables
- frontend
  - `VITE_API_URL`: URL of backend deployment, **without** trailing slash (e.g. `https://example.com/api`)
- server
  - `DB_URI`: Mongo URI of database
  - `PORT`: Port where you want your server to be accessible from (defaults to `3000`)

## Startup
- server
  - `cd server`
  - `DBURI="<database URI>" PORT="80" node bin/www`
- frontend
  - `cd frontend`
  - `VITE_API_URL="<url of API endpoint>" npm run dev` (if running a dev build, with hot updates), OR
  - `VITE_API_URL="<url of API endpoint>" npm run build` and place `dist/` directory in publicly accessible web directory

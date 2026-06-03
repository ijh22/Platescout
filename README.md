## Live URLs

- **Client:** https://platescout-h4nq.vercel.app/
- **Server:** https://platescout-ijh22.onrender.com/
- **Server health check:** https://platescout-ijh22.onrender.com/api/health

## Local setup

1. Clone the repo
2. Copy `server/.env.example` to `server/.env` and fill in `MONGO_URI` + `JWT_SECRET`
3. From the root: `npm install` (client) and `cd server && npm install` (server)
4. Two terminals: `npm run dev` (root, client) + `npm run dev` (server)
5. Open http://localhost:5173

## What I learned during deployment

What surprised me most was that my app worked locally but broke in production for reasons I never hit on Windows, like a case-sensitive CSS import and Vite proxy rules that only run during `npm run dev`. The API URL issue took the longest to debug, because relative fetch calls worked fine in dev but on Vercel they hit the frontend host instead of my Render backend. I'm not sure what I'd do differently next time beyond endeavoring not the make these same mistakes again.

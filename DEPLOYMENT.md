# Deployment Guide

This project consists of two parts that need to be deployed separately:

1. **Frontend (React)** → Deploy to Netlify
2. **Backend (Express SSE Server)** → Deploy to a platform that supports persistent connections

## Frontend Deployment (Netlify)

### Option 1: Netlify Dashboard

1. **Build the project locally** (optional, Netlify can do this):
   ```bash
   cd client
   npm install
   npm run build
   ```

2. **Go to Netlify Dashboard**:
   - Visit [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository

3. **Configure build settings**:
   - **Base directory**: Leave empty (or set to root)
   - **Build command**: `cd client && npm install && npm run build`
   - **Publish directory**: `client/build`

4. **Set Environment Variables**:
   - Go to Site settings → Environment variables
   - Add: `REACT_APP_SERVER_URL` = `https://your-server-url.com`
   - Replace `your-server-url.com` with your deployed server URL

5. **Deploy**: Click "Deploy site"

### Option 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd client
netlify deploy --prod --dir=build
```

## Backend Deployment (Express SSE Server)

SSE requires persistent connections, so you need a platform that supports long-running processes. Here are recommended options:

### Option 1: Railway (Recommended - Easy & Free Tier)

1. **Sign up** at [railway.app](https://railway.app)
2. **Create a new project** → "Deploy from GitHub repo"
3. **Select your repository** and choose the `server` folder
4. **Set Environment Variables**:
   - `PORT` = (auto-set by Railway)
   - `CLIENT_URL` = `https://your-netlify-site.netlify.app`
5. **Deploy**: Railway will auto-deploy
6. **Get your server URL** from Railway dashboard (e.g., `https://your-app.railway.app`)
7. **Update Netlify environment variable** `REACT_APP_SERVER_URL` with Railway URL

### Option 2: Render

1. **Sign up** at [render.com](https://render.com)
2. **Create a new Web Service**
3. **Connect your repository** and configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
4. **Set Environment Variables**:
   - `CLIENT_URL` = `https://your-netlify-site.netlify.app`
5. **Deploy**: Render will auto-deploy
6. **Update Netlify** with Render URL

### Option 3: Fly.io

1. **Install Fly CLI**: `curl -L https://fly.io/install.sh | sh`
2. **Login**: `fly auth login`
3. **Initialize**: `cd server && fly launch`
4. **Set secrets**:
   ```bash
   fly secrets set CLIENT_URL=https://your-netlify-site.netlify.app
   ```
5. **Deploy**: `fly deploy`
6. **Update Netlify** with Fly.io URL

### Option 4: DigitalOcean App Platform

1. **Sign up** at [digitalocean.com](https://www.digitalocean.com)
2. **Create App** → Connect GitHub
3. **Configure**:
   - Source: `server` directory
   - Build command: `npm install`
   - Run command: `npm start`
4. **Set Environment Variables**: `CLIENT_URL`
5. **Deploy** and update Netlify

## Important Notes

- **CORS Configuration**: Make sure `CLIENT_URL` in your server matches your Netlify site URL
- **Environment Variables**: Both frontend and backend need proper environment variables set
- **HTTPS**: Both Netlify and most hosting platforms provide HTTPS automatically
- **Testing**: After deployment, test the SSE connection in your browser's developer console

## Local Development

For local development, create `.env` files:

**client/.env**:
```
REACT_APP_SERVER_URL=http://localhost:5051
```

**server/.env**:
```
PORT=5051
CLIENT_URL=http://localhost:3031
```

## Troubleshooting

- **CORS errors**: Ensure `CLIENT_URL` matches your Netlify URL exactly
- **Connection refused**: Check that your server is running and accessible
- **SSE not working**: Verify the server URL is correct and the `/events` endpoint is accessible


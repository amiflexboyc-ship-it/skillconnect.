# 🌐 SkillConnect Production Deployment Guide
### Complete Setup: GitHub • Vercel • Render • MongoDB Atlas • Custom Domain `skillconnect.com`

---

## 📋 Table of Contents
1. [Step 1: Push Code to GitHub](#step-1-push-code-to-github)
2. [Step 2: Setup MongoDB Atlas (Cloud Database)](#step-2-setup-mongodb-atlas-cloud-database)
3. [Step 3: Deploy Backend API on Render](#step-3-deploy-backend-api-on-render)
4. [Step 4: Deploy Frontend on Vercel](#step-4-deploy-frontend-on-vercel)
5. [Step 5: Connect Custom Domain `skillconnec.com`](#step-5-connect-custom-domain-skillconnectcom)

---

## Step 1: Push Code to GitHub

Open terminal in the project root (`skillconnect`):

```bash
# 1. Initialize Git repository
git init

# 2. Stage all files
git add .

# 3. Commit files
git commit -m "feat: complete SkillConnect full-stack platform with Vercel and Render deployment configs"

# 4. Set default branch to main
git branch -M main

# 5. Link to your GitHub repository
# (Create a new repository named 'skillconnect' at https://github.com/new)
git remote add origin https://github.com/amiflexboyc-ship-it/skillconnect.git

# 6. Push code to GitHub
git push -u origin main
```

---

## Step 2: Setup MongoDB Atlas (Cloud Database)

1. Go to **[MongoDB Cloud Atlas](https://cloud.mongodb.com/)** and log in or create a free account.
2. Click **Build a Database** and select the **M0 Free Shared** cluster.
3. Choose your region (e.g. Frankfurt, London, or Ireland for best European/African latency).
4. **Create a Database User**:
   - Go to **Security > Database Access** -> **Add New Database User**.
   - Authentication Method: **Password**.
   - Username: `waris` (or your chosen username).
   - Password: Click **Autogenerate Secure Password** or enter your own (e.g. `SkillConnectDb2026!`).
   - Role: **Read and write to any database**.
   - Click **Add User**.
5. **Configure Network Access (Whitelist IP)**:
   - Go to **Security > Network Access** -> **Add IP Address**.
   - Select **Allow Access From Anywhere (`0.0.0.0/0`)** so Render cloud servers can connect.
   - Click **Confirm**.
6. **Copy Connection String**:
   - Go to **Deployments > Database** and click **Connect**.
   - Select **Drivers** (Node.js).
   - Copy the URI string:
     ```
     mongodb+srv://waris:<password>@cluster0.xxxxx.mongodb.net/skillconnect?retryWrites=true&w=majority&appName=SkillConnectCluster
     ```
   - Replace `<password>` with your database user password.

---

## Step 3: Deploy Backend API on Render

1. Go to **[Render Dashboard](https://dashboard.render.com/)** and sign in with GitHub.
2. Click **New +** -> **Web Service**.
3. Select your GitHub repository: `skillconnect`.
4. Fill in the deployment settings:
   - **Name:** `skillconnect-api`
   - **Region:** Frankfurt (EU Central) or Oregon (US West)
   - **Root Directory:** `server`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** `Free`
5. **Add Environment Variables**:
   Click **Advanced > Add Environment Variable** and enter:
   | Key | Value |
   | :--- | :--- |
   | `NODE_ENV` | `production` |
   | `PORT` | `10000` |
   | `MONGO_URI` | `mongodb+srv://waris:yourPassword@cluster0.xxxxx.mongodb.net/skillconnect?retryWrites=true&w=majority` |
   | `JWT_SECRET` | `skillconnect_super_secret_jwt_token_key_2026_waris` |
   | `CLIENT_URL` | `https://skillconnect.com,https://www.skillconnect.com,http://localhost:5173` |
   | `ADMIN_EMAIL` | `amiflexboyc@gmail.com` |
   | `ADMIN_WHATSAPP` | `09077108987` |
   | `ADMIN_NAME` | `Waris (AmiFlexboy)` |
6. Click **Deploy Web Service**.
   - Once deployed, your backend will be live at:
     `https://skillconnect-api.onrender.com`
   - Health check: `https://skillconnect-api.onrender.com/api/health`

---

## Step 4: Deploy Frontend on Vercel

1. Go to **[Vercel Dashboard](https://vercel.com/dashboard)** and log in with GitHub.
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository: `skillconnect`.
4. Configure Project Settings:
   - **Framework Preset:** `Vite`
   - **Root Directory:** Click Edit and select `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. **Add Environment Variable**:
   | Key | Value |
   | :--- | :--- |
   | `VITE_API_URL` | `https://skillconnect-api.onrender.com/api` (or `https://api.skillconnect.com/api` after DNS setup) |
6. Click **Deploy**.
   - Vercel will build and deploy your app in ~30 seconds with automated SSL!

---

## Step 5: Connect Custom Domain `skillconnect.com`

### 1. In Vercel (For Frontend)
1. Go to your project on **Vercel** -> **Settings** -> **Domains**.
2. Enter `skillconnect.com` and click **Add**.
3. Vercel will recommend also adding `www.skillconnect.com` (redirecting to `skillconnect.com`).

### 2. In Render (For Backend API Subdomain)
1. Go to your `skillconnect-api` service on **Render** -> **Settings** -> **Custom Domains**.
2. Add `api.skillconnect.com` and click **Save**.

### 3. In Your Domain Registrar DNS Management (Namecheap, GoDaddy, Cloudflare, etc.)
Add the following DNS records:

| Type | Name / Host | Target / Value | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` (or blank) | `76.76.21.21` | Automatic / 300 | Routes `skillconnect.com` to Vercel |
| **CNAME** | `www` | `cname.vercel-dns.com` | Automatic / 300 | Routes `www.skillconnect.com` to Vercel |
| **CNAME** | `api` | `skillconnect-api.onrender.com` | Automatic / 300 | Routes `api.skillconnect.com` to Render API |

---

## ✅ Post-Deployment Verification

1. Visit **`https://skillconnect.com`** in your browser.
2. Verify:
   - SSL Lock icon (HTTPS) is active.
   - Waris (AmiFlexboy) spotlight card loads with professional portrait.
   - Direct WhatsApp link opens chat with `09077108987`.
   - Contact form sends inquiries directly to `amiflexboyc@gmail.com`.
   - Admin portal is accessible at `https://skillconnect.com/admin`.

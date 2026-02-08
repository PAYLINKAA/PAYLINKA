# 🚀 Netlify Deployment Guide for Paylinka

Complete step-by-step guide to deploy Paylinka frontend to Netlify.

---

## ✅ Prerequisites

- GitHub repository pushed ([PAYLINKAA/PAYLINKA](https://github.com/PAYLINKAA/PAYLINKA))
- Netlify account ([netlify.com](https://netlify.com))
- GitHub connected to Netlify

---

## 📋 Deployment Steps

### Step 1: Connect GitHub to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Select **GitHub**
4. Search for `PAYLINKAA/PAYLINKA` and connect
5. Click **Authorize Netlify**

---

### Step 2: Configure Build Settings

**Important:** Configure **before** deploying!

1. After selecting repo, you'll see **Build settings**:
   - **Base directory:** `frontend` ← **CRITICAL**
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`

2. Click **Advanced** and add environment variables:
   ```
   NEXT_PUBLIC_APP_URL = https://paylinka.netlify.app
   ```

3. Click **Deploy site**

---

### Step 3: Wait for Build

**Build takes ~2-3 minutes:**
- Netlify pulls your repo
- Runs `npm install` in `/frontend`
- Runs `npm run build`
- Deploys `.next` folder
- Assigns you a URL like `https://paylinka-xxx.netlify.app`

**Check build logs:**
- Click **Deploying** → **Deploy log**
- Look for: "✓ Generating static pages (5/5)"

---

### Step 4: Fix 404 Error (If Occurs)

If you see "Page not found" on any route:

**Root cause:** Netlify doesn't have the `@netlify/plugin-nextjs` installed

**Solution 1: Manual Install (Recommended)**
```bash
cd /Users/lavtiwari/Desktop/PayLinka/frontend
npm install -D @netlify/plugin-nextjs --legacy-peer-deps
```

Then commit and push:
```bash
cd /Users/lavtiwari/Desktop/PayLinka
git add frontend/package.json frontend/package-lock.json netlify.toml
git commit -m "Add Netlify Next.js plugin for proper deployment"
git push origin main
```

**Solution 2: Use netlify.toml (Already Configured)**
The `netlify.toml` file at root is already set up with:
```toml
[[plugins]]
package = "@netlify/plugin-nextjs"
```

Netlify will automatically install and use this on next deploy.

**Solution 3: Manual Redirect (Quick Fix)**
Go to **Site settings** → **Redirects** and add:
```
from: /*
to: /index.html
status: 200
```

---

## ✨ After Deployment

### 1. Verify All Routes Work

Test these URLs on your deployed site:
- `https://your-site.netlify.app/` ← Landing page ✅
- `https://your-site.netlify.app/create` ← Create link form ✅
- `https://your-site.netlify.app/pay/test123` ← Payment page ✅

### 2. Add Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter: `paylinka.com` (or your domain)
4. Follow DNS setup instructions

### 3. Enable Auto-Deploy

**Already enabled by default!**
- Any push to `main` → Auto-redeploy
- Builds trigger automatically
- No manual deployment needed

---

## 🔧 Troubleshooting

### Issue: "Page not found" on all routes

**Cause:** Next.js not configured for Netlify

**Fix:**
```bash
# From frontend directory
npm install -D @netlify/plugin-nextjs --legacy-peer-deps

# Commit and push
cd /Users/lavtiwari/Desktop/PayLinka
git add frontend/package.json frontend/package-lock.json
git commit -m "Add Netlify Next.js plugin"
git push origin main

# Then in Netlify UI: Click "Retry deploy" or wait for auto-redeploy
```

### Issue: Build fails with "Module not found" errors

**Solution:**
1. Netlify → **Site settings** → **Build & deploy**
2. Click **Edit settings**
3. Change **Build command** to:
   ```
   npm install --legacy-peer-deps && npm run build
   ```

### Issue: Environment variables not working

1. Netlify → **Site settings** → **Build & deploy** → **Environment**
2. Add all `.env.local` variables:
   ```
   NEXT_PUBLIC_APP_URL=https://your-site.netlify.app
   ```

---

## 📊 Deployment Checklist

- [ ] GitHub repo pushed
- [ ] Netlify account created
- [ ] GitHub connected to Netlify
- [ ] Build settings configured (`base: frontend`)
- [ ] `@netlify/plugin-nextjs` installed
- [ ] `netlify.toml` committed to root
- [ ] Environment variables set
- [ ] First deploy successful
- [ ] All routes tested (/, /create, /pay/[id])
- [ ] No 404 errors on non-existent pages

---

## 🎯 Next Steps

### Deploy Smart Contracts to Testnet

After frontend is live, deploy contracts:

```bash
cd /Users/lavtiwari/Desktop/PayLinka

# Deploy to Base Sepolia
npx hardhat run scripts/deploy.ts --network baseSepolia

# Deploy to Monad Testnet
npx hardhat run scripts/deploy.ts --network monadTestnet

# Copy contract addresses and update frontend/.env.local:
# NEXT_PUBLIC_PAYLINKA_ROUTER_BASE_SEPOLIA=0x...
# NEXT_PUBLIC_PAYLINKA_ROUTER_MONAD_TESTNET=0x...
```

### Create Payment Link (End-to-End Test)

1. Visit deployed site: `https://your-site.netlify.app`
2. Connect MetaMask wallet
3. Go to `/create`
4. Fill in:
   - **Recipient:** Your wallet address
   - **Amount:** 0.01
   - **Token:** MON (for Monad) or ETH (for Base)
   - **Chain:** Monad Testnet or Base Sepolia
5. Generate payment link
6. Scan QR code or share link
7. Open payment page and confirm

---

## 🔗 Resources

- **Netlify Docs:** https://docs.netlify.com/
- **Next.js on Netlify:** https://docs.netlify.com/integrations/frameworks/next-js/
- **Netlify Plugin:** https://github.com/netlify/next-js-plugin

---

## 📝 Deployment Log Example

```
2:31 PM:
Cloning repository...
Installing dependencies...
Running "npm install"...
Running "npm run build"...
✓ Generating static pages (5/5)
Deploying site...
Deployment complete!
Live at: https://paylinka-xyz.netlify.app ✅
```

---

**Your Paylinka frontend is now live on Netlify!** 🎉

For issues, check the **Deploy log** in Netlify dashboard or re-read the troubleshooting section above.

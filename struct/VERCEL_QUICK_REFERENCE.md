# 🚀 VERCEL FREE - QUICK REFERENCE CARD

## 🎯 THE 4 STEPS (30-40 MINUTES)

### Step 1: Database (5 min)
```
https://neon.tech
→ Sign up (GitHub)
→ Create project "gatexpress"
→ Copy connection string
Save it! ⭐
```

### Step 2: Frontend (10 min)
```
https://vercel.com
→ Sign up (GitHub)
→ New Project
→ Select gate_ai repo
→ Root: packages/frontend
→ Deploy
Frontend URL: https://gatexpress-frontend.vercel.app
```

### Step 3: Backend (15 min)
```
https://vercel.com
→ New Project again
→ Select gate_ai repo
→ Root: packages/backend
→ Environment Variables:
  DATABASE_URL = (from step 1)
  SECRET_KEY = (python -c "import secrets; print(secrets.token_urlsafe(32))")
  FRONTEND_URL = https://gatexpress-frontend.vercel.app
  API_URL = https://gatexpress-api.vercel.app
→ Deploy
Backend URL: https://gatexpress-api.vercel.app
```

### Step 4: Test (5 min)
```
1. Open https://gatexpress-frontend.vercel.app
2. Create a goal
3. Refresh page
4. Goal still there? ✅ SUCCESS!
```

---

## 💾 ENVIRONMENT VARIABLES NEEDED

### Frontend:
```
VITE_API_URL = https://gatexpress-api.vercel.app/api
```

### Backend:
```
DATABASE_URL = postgresql://user:pass@ep-xxx.neon.tech/gatexpress?sslmode=require
SECRET_KEY = (generate: python -c "import secrets; print(secrets.token_urlsafe(32))")
FRONTEND_URL = https://gatexpress-frontend.vercel.app
API_URL = https://gatexpress-api.vercel.app
```

---

## 🔗 FINAL URLS

```
App:    https://gatexpress-frontend.vercel.app
API:    https://gatexpress-api.vercel.app
Docs:   https://gatexpress-api.vercel.app/docs
```

---

## 💰 COST
```
$0/month (forever!)
```

---

## 🆘 IF YOU GET STUCK

**Problem:** Blank page
**Fix:** Check VITE_API_URL env var

**Problem:** API error 500
**Fix:** Check DATABASE_URL in backend env vars

**Problem:** Can't connect to database
**Fix:** Add ?sslmode=require to connection string

---

## 📖 FULL GUIDE

See: `VERCEL_DEPLOYMENT_COMPLETE.md`

---

**Status:** ✅ Ready  
**Time:** 30-40 min  
**Cost:** $0  
**Let's go!** 🚀

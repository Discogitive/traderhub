# ⚡ INSTANT START - 5 MINUTES TO RUNNING APP

## What You Need to Know
Everything is set up. You just need to:
1. Run ONE setup command
2. Install dependencies  
3. Start backend + frontend

---

## 🔥 DO THIS NOW

### Step 1: Run Setup (2 minutes)

**Windows:**
```cmd
cd barter-app
setup.bat
```

**Mac/Linux:**
```bash
cd barter-app
node setup.js
```

This will create all directories and copy files automatically.

---

### Step 2: Install Backend (3 minutes)

```bash
cd backend
npm install
```

---

### Step 3: Install Frontend (3 minutes)

```bash
cd frontend
npm install
```

---

### Step 4: Start Backend

**Terminal 1:**
```bash
cd backend
npm run dev
```

✅ You should see:
```
Server running on port 5000
```

---

### Step 5: Start Frontend

**Terminal 2:**
```bash
cd frontend
npm start
```

Choose platform:
- Type `w` for web browser (easiest)
- Type `i` for iOS simulator (requires macOS)
- Type `a` for Android emulator

---

## ✅ You're Done!

You now have:
- ✅ Backend API running on http://localhost:5000
- ✅ Frontend app running in browser/emulator
- ✅ All 13 API endpoints ready
- ✅ User authentication working
- ✅ Item management working
- ✅ Trade system ready

---

## 🧪 Quick Test

### Test Backend Health (Terminal 3)
```bash
curl http://localhost:5000/health
```

Should return:
```json
{"status":"OK","message":"Barter App API is running"}
```

### Test Registration
1. Open frontend app
2. Click "Don't have an account? Sign up"
3. Enter:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
4. Click Sign Up
5. You should be logged in!

---

## 📁 What Gets Created

```
barter-app/
├── backend/
│   ├── src/
│   │   ├── index.js (main server)
│   │   ├── config/jwt.js
│   │   ├── middleware/auth.js
│   │   ├── models/ (User, Item, Trade)
│   │   └── routes/ (auth, users, items, trades)
│   ├── package.json
│   ├── .env (config)
│   └── .gitignore
│
└── frontend/
    ├── src/
    │   ├── App.tsx (main app)
    │   ├── services/api.ts
    │   ├── context/AuthContext.tsx
    │   └── screens/LoginScreen.tsx
    ├── package.json
    ├── app.json (Expo config)
    └── .gitignore
```

---

## 🆘 Troubleshooting

### "setup.bat/setup.js not found"
Make sure you're in the `barter-app` directory:
```bash
cd barter-app
```

### "npm: command not found"
Install Node.js: https://nodejs.org/

### "MongoDB connection error"
This is OK in development. MongoDB will connect when you set it up later.

### Frontend won't run
Try:
```bash
cd frontend
npx expo install
npm start
```

### Already have files created?
If setup.js shows files already exist, that's fine! It will just skip them.

---

## 🎯 After Setup

1. **Create an account** - test the registration flow
2. **Create items** - test adding items to trade
3. **Browse items** - test discovering items
4. **Propose trades** - test the trade workflow
5. **Rate trades** - test the rating system

---

## 📚 Full Documentation

For more details, see:
- `README.md` - Complete setup guide
- `QUICK_REFERENCE.txt` - API endpoints
- `FILE_INDEX.md` - All files explained
- Parent directory `.txt` files - Source templates

---

**Ready? Let's go! 🚀**

```bash
cd barter-app && setup.bat  # Windows
cd barter-app && node setup.js  # Mac/Linux
```

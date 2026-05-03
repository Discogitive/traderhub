# 🚀 Barter App - Complete Setup Guide

## Quick Status
You have everything you need! All source code is in `.txt` files in the parent directory. This guide will help you get the project running in **15-20 minutes**.

---

## Option 1: Automated Setup (Recommended)

### Windows Users:
```bash
cd barter-app
setup.bat
```

This will:
- ✅ Create all directories
- ✅ Copy source files to correct locations
- ✅ Create package.json files
- ✅ Create environment files

### Mac/Linux Users:
```bash
cd barter-app
node setup.js
```

---

## Option 2: Manual Setup (If automation fails)

### Step 1: Create Backend Structure
```bash
mkdir backend/src/{config,models,middleware,routes}
```

### Step 2: Copy Backend Files
Copy these files from parent directory and paste into the paths below:

| Source File | Destination Path |
|---|---|
| BACKEND_INDEX_JS.txt | backend/src/index.js |
| BACKEND_JWT_CONFIG.txt | backend/src/config/jwt.js |
| BACKEND_AUTH_MIDDLEWARE.txt | backend/src/middleware/auth.js |
| BACKEND_USER_MODEL.txt | backend/src/models/User.js |
| BACKEND_ITEM_MODEL.txt | backend/src/models/Item.js |
| BACKEND_TRADE_MODEL.txt | backend/src/models/Trade.js |
| BACKEND_AUTH_ROUTES.txt | backend/src/routes/auth.js |
| BACKEND_USERS_ROUTES.txt | backend/src/routes/users.js |
| BACKEND_ITEMS_ROUTES.txt | backend/src/routes/items.js |
| BACKEND_TRADES_ROUTES.txt | backend/src/routes/trades.js |

### Step 3: Create Frontend Structure
```bash
mkdir frontend/src/{screens,components,services,context,navigation}
```

### Step 4: Copy Frontend Files
| Source File | Destination Path |
|---|---|
| FRONTEND_API_SERVICE.txt | frontend/src/services/api.ts |
| FRONTEND_AUTH_CONTEXT.txt | frontend/src/context/AuthContext.tsx |
| FRONTEND_LOGIN_SCREEN.txt | frontend/src/screens/LoginScreen.tsx |

### Step 5: Create Configuration Files

**backend/package.json:**
```json
{
  "name": "barter-app-backend",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "dotenv": "^16.0.3",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "cors": "^2.8.5",
    "express-validator": "^7.0.0",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

**backend/.env:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/barter-app
JWT_SECRET=dev_secret_key_change_in_production
NODE_ENV=development
```

**frontend/package.json:**
```json
{
  "name": "barter-app-frontend",
  "version": "1.0.0",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.71.8",
    "expo": "~48.0.0",
    "axios": "^1.4.0",
    "@react-navigation/native": "^6.1.6",
    "@react-navigation/bottom-tabs": "^6.5.7",
    "react-native-screens": "~3.20.0",
    "react-native-safe-area-context": "4.5.0",
    "@react-native-async-storage/async-storage": "^1.17.12"
  }
}
```

**frontend/app.json:**
```json
{
  "expo": {
    "name": "BarterApp",
    "slug": "barter-app",
    "version": "1.0.0",
    "assetBundlePatterns": ["**/*"]
  }
}
```

**frontend/src/App.tsx:**
```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './context/AuthContext';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
```

---

## Install Dependencies

### Backend:
```bash
cd backend
npm install
```

### Frontend:
```bash
cd ../frontend
npm install
```

---

## Start the Services

### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB connected (or MongoDB connection error - MongoDB not running yet is OK)
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

Choose your platform:
- Press `i` for iOS
- Press `a` for Android
- Press `w` for web

---

## Verify Backend Health

In a third terminal:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{"status":"OK","message":"Barter App API is running"}
```

---

## 🎯 Success Checklist

- [ ] All directories created
- [ ] All source files copied to correct locations
- [ ] package.json files created
- [ ] .env file created
- [ ] app.json created
- [ ] App.tsx created
- [ ] Backend `npm install` completed
- [ ] Frontend `npm install` completed
- [ ] MongoDB running (or ready to start)
- [ ] Backend server starts (npm run dev)
- [ ] Health endpoint responds
- [ ] Frontend runs (npm start)

---

## 📌 Key Files & What They Do

| File | Purpose |
|---|---|
| `backend/src/index.js` | Express server entry point |
| `backend/src/config/jwt.js` | JWT token generation/verification |
| `backend/src/middleware/auth.js` | Protected route middleware |
| `backend/src/models/{User,Item,Trade}.js` | MongoDB schemas |
| `backend/src/routes/{auth,users,items,trades}.js` | API endpoints |
| `frontend/src/services/api.ts` | Axios HTTP client with auth |
| `frontend/src/context/AuthContext.tsx` | Global auth state |
| `frontend/src/screens/LoginScreen.tsx` | Login UI component |

---

## 🚨 Troubleshooting

### "MongoDB connection error"
- Make sure MongoDB is running
- Default: `mongodb://localhost:27017/barter-app`
- Using MongoDB Atlas? Update `.env` with your connection string

### "Cannot find module 'express'"
```bash
cd backend && npm install
```

### "npm: command not found"
- Install Node.js from https://nodejs.org/
- Verify: `node --version`

### Frontend won't start
```bash
cd frontend
npm install expo expo-cli
npm start
```

---

## Next Steps

After everything is running:
1. **Test Registration** - Create an account via login screen
2. **Create Items** - Add items to trade
3. **Discover Items** - Browse available items nearby
4. **Propose Trades** - Start trading with other users
5. **Rate & Review** - Complete trades and leave feedback

---

**You're ready to build! 🎉**

Questions? Check QUICK_REFERENCE.txt for API endpoints and commands.

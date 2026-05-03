# ✅ PHASE 2 - READY TO BUILD

## Current Status
- ✅ Phase 1 Complete: Backend API with 13 endpoints
- 🔄 Phase 2 Starting: Frontend UI development
- 📦 32 tasks pending across all phases

---

## What We're Building NOW

### Step 1: Verify Backend Works (15 min)

```bash
# Navigate to project
cd c:\Users\witmer\Documents\Gitrepo.worktrees\copilot-start-implementation\barter-app

# Run setup to create directories and copy files
node setup.js

# Install backend
cd backend
npm install

# Start backend (leave running in Terminal 1)
npm run dev
```

**Expected output:**
```
Server running on port 5000
MongoDB connected (or connection error if MongoDB not set up - OK for dev)
```

### Step 2: Start Frontend (10 min)

```bash
# In new Terminal 2
cd c:\Users\witmer\Documents\Gitrepo.worktrees\copilot-start-implementation\barter-app\frontend

npm install
npm start

# When prompted, press 'w' for web (easiest)
```

**Expected:** React Native app loads in browser at `http://localhost:19000`

### Step 3: Quick Health Check (5 min)

```bash
# In Terminal 3
curl http://localhost:5000/health
```

**Expected response:**
```json
{"status":"OK","message":"Barter App API is running"}
```

---

## Screens to Build (Phase 2)

### 1. **HomeScreen** ← BUILD THIS FIRST
- Tab navigation (Discovery, My Items, Trades, Profile)
- Item grid (fetch from GET /api/items)
- Search/filter
- Tap item → go to ItemDetailScreen

**API Calls:**
- `GET /api/items` - get all items
- `GET /api/items?category=Electronics` - filter by category

### 2. **ItemDetailScreen**
- Display selected item
- Show owner profile
- "Propose Trade" button
- Item images, condition, estimated value

**API Calls:**
- `GET /api/items/:itemId` - get item details
- `GET /api/users/:userId` - get owner info
- `POST /api/trades` - propose trade (when button tapped)

### 3. **CreateItemScreen**
- Form: title, description, category, condition
- Location picker
- Image upload (mock for now)
- Submit button → POST /api/items

**API Calls:**
- `POST /api/items` - create new item
- `PUT /api/users` - update location

### 4. **ProfileScreen**
- Current user info
- Completed trades count
- Average rating (1-5 stars)
- Badges earned (if any)
- Logout button

**API Calls:**
- `GET /api/users` - get current user
- `GET /api/trades?status=completed` - get completed trades for stats

### 5. **TradeHistoryScreen**
- List of all trades (proposed, accepted, completed)
- Status badge (yellow=pending, green=accepted, blue=completed, red=declined)
- Action buttons:
  - If status="proposed" → Accept/Decline buttons
  - If status="accepted" → Mark Complete button
  - If status="completed" but not rated → Show rating form

**API Calls:**
- `GET /api/trades` - get user's trades
- `PUT /api/trades/:id/accept` - accept trade
- `PUT /api/trades/:id/decline` - decline trade
- `PUT /api/trades/:id/complete` - mark complete + add rating

---

## File Structure (After setup.js runs)

```
barter-app/
├── backend/src/
│   ├── index.js ✅
│   ├── config/jwt.js ✅
│   ├── middleware/auth.js ✅
│   ├── models/{User,Item,Trade}.js ✅
│   └── routes/{auth,users,items,trades}.js ✅
│
└── frontend/src/
    ├── App.tsx ✅
    ├── services/api.ts ✅
    ├── context/AuthContext.tsx ✅
    ├── screens/
    │   ├── LoginScreen.tsx ✅ (exists but needs integration)
    │   ├── HomeScreen.tsx ← BUILD THIS
    │   ├── CreateItemScreen.tsx ← BUILD THIS
    │   ├── ItemDetailScreen.tsx ← BUILD THIS
    │   ├── ProfileScreen.tsx ← BUILD THIS
    │   └── TradeHistoryScreen.tsx ← BUILD THIS
    └── components/
        ├── ItemCard.tsx ← BUILD THIS
        ├── TradeCard.tsx ← BUILD THIS
        └── RatingForm.tsx ← BUILD THIS
```

---

## Implementation Order

| # | Task | Est. Time | Priority |
|---|------|-----------|----------|
| 1 | Run setup.js + npm install | 10 min | 🔴 CRITICAL |
| 2 | Verify backend works | 5 min | 🔴 CRITICAL |
| 3 | Test LoginScreen + auth | 15 min | 🔴 CRITICAL |
| 4 | Build HomeScreen + ItemCard | 1.5 hrs | 🟡 HIGH |
| 5 | Build ItemDetailScreen | 1 hr | 🟡 HIGH |
| 6 | Build CreateItemScreen | 1 hr | 🟡 HIGH |
| 7 | Build ProfileScreen | 45 min | 🟠 MEDIUM |
| 8 | Build TradeHistoryScreen + RatingForm | 1.5 hrs | 🟠 MEDIUM |
| 9 | Full integration test | 1 hr | 🟠 MEDIUM |
| 10 | Bug fixes + polish | 1 hr | 🟢 LOW |

**Total: ~8 hours to complete Phase 2**

---

## Quick Test Flow (After setup)

1. **Register User A**
   ```
   - Open frontend
   - Sign up: testuser1@example.com / password123
   - Should redirect to HomeScreen
   ```

2. **Create Item**
   ```
   - Tap "My Items" tab or "Create Item" button
   - Fill form: title="Old Laptop", category="Electronics"
   - Submit → should see item in HomeScreen
   ```

3. **Open Another Browser Tab as User B**
   ```
   - Register second user: testuser2@example.com / password123
   ```

4. **User B Proposes Trade**
   ```
   - See User A's item in HomeScreen
   - Tap item → ItemDetailScreen
   - Tap "Propose Trade"
   - Select one of User B's items to trade
   - Submit proposal
   ```

5. **User A Accepts Trade**
   ```
   - Switch back to User A browser
   - Tap "Trades" tab → should see pending trade from User B
   - Tap "Accept" button
   ```

6. **Both Rate Each Other**
   ```
   - Tap "Complete" button
   - Submit rating (1-5 stars)
   - Both users' ratings should update
   ```

---

## Command Cheat Sheet

```bash
# Setup
cd barter-app && node setup.js

# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm start

# Test endpoint
curl http://localhost:5000/health

# Test register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

---

## 🎯 SUCCESS LOOKS LIKE

When Phase 2 is complete:
- ✅ User can register in app
- ✅ User can login
- ✅ User can create items
- ✅ User can see other users' items
- ✅ User can propose trades
- ✅ User can accept/decline/complete trades
- ✅ User can rate other users
- ✅ All 13 API endpoints working
- ✅ Auth persists across sessions
- ✅ No console errors

---

## NEXT ACTION: DO THIS NOW 🚀

```bash
# 1. Navigate to project
cd c:\Users\witmer\Documents\Gitrepo.worktrees\copilot-start-implementation\barter-app

# 2. Run setup
node setup.js

# 3. Install & start backend (Terminal 1)
cd backend && npm install && npm run dev

# 4. Install & start frontend (Terminal 2)
cd frontend && npm install && npm start

# 5. Test (Terminal 3)
curl http://localhost:5000/health
```

Once all 3 are running, reply with: **"Ready to build screens!"**
And we'll start building HomeScreen together. 💪

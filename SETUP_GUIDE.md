# Setup Instructions for Barter App

## Prerequisites
- Node.js 16+ installed
- npm or yarn
- MongoDB installed locally or MongoDB Atlas account
- React Native CLI or Expo CLI
- Xcode (for iOS) or Android Studio (for Android)

## Quick Start

### Step 1: Create Project Structure
```bash
cd c:\Users\witmer\Documents\Gitrepo.worktrees\copilot-start-implementation

# Create directories
mkdir barter-app
cd barter-app
mkdir backend frontend
cd backend
mkdir src
mkdir src/config src/models src/middleware src/routes
cd ../frontend
mkdir src
mkdir src/screens src/components src/navigation src/services src/context
cd ../..
```

### Step 2: Initialize Backend

```bash
cd barter-app/backend

# Create package.json
npm init -y

# Install dependencies
npm install express mongoose dotenv bcryptjs jsonwebtoken cors express-validator multer
npm install --save-dev nodemon jest supertest
```

### Step 3: Configure Environment
```bash
# Create .env file
echo PORT=5000 > .env
echo MONGODB_URI=mongodb://localhost:27017/barter-app >> .env
echo JWT_SECRET=your_jwt_secret_key_here_change_in_production >> .env
echo NODE_ENV=development >> .env
```

### Step 4: Initialize Frontend

```bash
cd ../frontend

# Using Expo (recommended for quick development)
npm install -g expo-cli
expo init --template

# Or using React Native CLI
npx react-native@latest init BarterApp --template typescript

# Install dependencies
npm install axios @react-navigation/native @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install react-native-maps react-native-geolocation-service
```

### Step 5: Start Development

**Backend Terminal 1:**
```bash
cd backend
npm run dev
```

**Frontend Terminal 2:**
```bash
cd frontend
npm start  # For Expo
# or
npm run android  # For Android
npm run ios      # For iOS
```

## Files to Copy/Create

The following backend files need to be created in the `backend/src` directory. See the generated files at the end of this setup guide.

### Backend Files Structure:
```
backend/src/
├── index.js              # Express app and server entry point
├── config/
│   ├── database.js       # MongoDB connection
│   └── jwt.js            # JWT utilities
├── models/
│   ├── User.js           # User schema
│   ├── Item.js           # Item schema
│   └── Trade.js          # Trade schema
├── middleware/
│   └── auth.js           # Authentication middleware
└── routes/
    ├── auth.js           # Auth routes (register, login)
    ├── users.js          # User routes (profile management)
    ├── items.js          # Item routes (CRUD)
    └── trades.js         # Trade routes (negotiation)
```

## Next Steps

1. Copy all backend files from the provided templates
2. Test API endpoints using Postman or curl
3. Build React Native UI screens
4. Connect frontend to API endpoints
5. Implement location-based features
6. Add rating/review system
7. Deploy to MongoDB Atlas
8. Build and deploy to app stores

## Troubleshooting

- MongoDB Connection Error: Ensure MongoDB is running (`mongod`)
- Module not found: Run `npm install` in the respective directory
- Port already in use: Change PORT in .env file
- CORS errors: Ensure frontend URL is added to CORS whitelist

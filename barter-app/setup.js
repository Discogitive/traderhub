#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const baseDir = __dirname;

// Define all directories to create
const directories = [
  'backend/src/config',
  'backend/src/models',
  'backend/src/middleware',
  'backend/src/routes',
  'frontend/src/screens',
  'frontend/src/components',
  'frontend/src/services',
  'frontend/src/context',
  'frontend/src/navigation',
  'frontend/public',
];

console.log('🚀 Creating project structure...\n');

// Create directories
directories.forEach(dir => {
  const fullPath = path.join(baseDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Created: ${dir}`);
  }
});

// Backend files mapping
const backendFiles = {
  'backend/src/index.js': 'BACKEND_INDEX_JS.txt',
  'backend/src/config/jwt.js': 'BACKEND_JWT_CONFIG.txt',
  'backend/src/middleware/auth.js': 'BACKEND_AUTH_MIDDLEWARE.txt',
  'backend/src/models/User.js': 'BACKEND_USER_MODEL.txt',
  'backend/src/models/Item.js': 'BACKEND_ITEM_MODEL.txt',
  'backend/src/models/Trade.js': 'BACKEND_TRADE_MODEL.txt',
  'backend/src/routes/auth.js': 'BACKEND_AUTH_ROUTES.txt',
  'backend/src/routes/users.js': 'BACKEND_USERS_ROUTES.txt',
  'backend/src/routes/items.js': 'BACKEND_ITEMS_ROUTES.txt',
  'backend/src/routes/trades.js': 'BACKEND_TRADES_ROUTES.txt',
};

// Frontend files mapping
const frontendFiles = {
  'frontend/src/services/api.ts': 'FRONTEND_API_SERVICE.txt',
  'frontend/src/context/AuthContext.tsx': 'FRONTEND_AUTH_CONTEXT.txt',
  'frontend/src/screens/LoginScreen.tsx': 'FRONTEND_LOGIN_SCREEN.txt',
};

console.log('\n📋 Copying source files...\n');

// Copy backend files
Object.entries(backendFiles).forEach(([destPath, srcFile]) => {
  const srcPath = path.join(path.dirname(baseDir), srcFile);
  const fullDestPath = path.join(baseDir, destPath);
  
  try {
    if (fs.existsSync(srcPath)) {
      let content = fs.readFileSync(srcPath, 'utf-8');
      // Remove line numbers if they exist
      content = content.replace(/^\d+\.\s/gm, '');
      fs.writeFileSync(fullDestPath, content);
      console.log(`✓ Copied: ${destPath}`);
    } else {
      console.log(`⚠ Missing source: ${srcFile}`);
    }
  } catch (err) {
    console.error(`✗ Error copying ${destPath}:`, err.message);
  }
});

// Copy frontend files
Object.entries(frontendFiles).forEach(([destPath, srcFile]) => {
  const srcPath = path.join(path.dirname(baseDir), srcFile);
  const fullDestPath = path.join(baseDir, destPath);
  
  try {
    if (fs.existsSync(srcPath)) {
      let content = fs.readFileSync(srcPath, 'utf-8');
      // Remove line numbers if they exist
      content = content.replace(/^\d+\.\s/gm, '');
      fs.writeFileSync(fullDestPath, content);
      console.log(`✓ Copied: ${destPath}`);
    } else {
      console.log(`⚠ Missing source: ${srcFile}`);
    }
  } catch (err) {
    console.error(`✗ Error copying ${destPath}:`, err.message);
  }
});

// Create package.json files
console.log('\n📦 Creating package.json files...\n');

const backendPackage = {
  name: 'barter-app-backend',
  version: '1.0.0',
  main: 'src/index.js',
  scripts: {
    start: 'node src/index.js',
    dev: 'nodemon src/index.js',
    test: 'jest --watch',
  },
  dependencies: {
    express: '^4.18.2',
    mongoose: '^7.0.0',
    dotenv: '^16.0.3',
    bcryptjs: '^2.4.3',
    jsonwebtoken: '^9.0.0',
    cors: '^2.8.5',
    'express-validator': '^7.0.0',
    multer: '^1.4.5-lts.1',
  },
  devDependencies: {
    nodemon: '^2.0.20',
    jest: '^29.5.0',
  },
};

const frontendPackage = {
  name: 'barter-app-frontend',
  version: '1.0.0',
  main: 'index.js',
  scripts: {
    start: 'expo start',
    android: 'expo start --android',
    ios: 'expo start --ios',
    web: 'expo start --web',
    test: 'jest',
  },
  dependencies: {
    react: '18.2.0',
    'react-native': '0.71.8',
    expo: '~48.0.0',
    axios: '^1.4.0',
    '@react-navigation/native': '^6.1.6',
    '@react-navigation/bottom-tabs': '^6.5.7',
    'react-native-screens': '~3.20.0',
    'react-native-safe-area-context': '4.5.0',
    'react-native-maps': '1.3.2',
    'react-native-geolocation-service': '^5.3.1',
    '@react-native-async-storage/async-storage': '^1.17.12',
  },
  devDependencies: {
    '@babel/core': '^7.22.0',
    jest: '^29.5.0',
  },
};

try {
  fs.writeFileSync(
    path.join(baseDir, 'backend/package.json'),
    JSON.stringify(backendPackage, null, 2)
  );
  console.log('✓ Created: backend/package.json');
} catch (err) {
  console.error('✗ Error creating backend/package.json:', err.message);
}

try {
  fs.writeFileSync(
    path.join(baseDir, 'frontend/package.json'),
    JSON.stringify(frontendPackage, null, 2)
  );
  console.log('✓ Created: frontend/package.json');
} catch (err) {
  console.error('✗ Error creating frontend/package.json:', err.message);
}

// Create .env file
console.log('\n⚙️  Creating environment files...\n');

const envContent = `PORT=5000
MONGODB_URI=mongodb://localhost:27017/barter-app
JWT_SECRET=dev_secret_key_change_in_production
NODE_ENV=development
`;

try {
  fs.writeFileSync(path.join(baseDir, 'backend/.env'), envContent);
  console.log('✓ Created: backend/.env');
} catch (err) {
  console.error('✗ Error creating backend/.env:', err.message);
}

// Create .gitignore files
const gitignoreContent = `node_modules/
.env
.env.local
*.log
.DS_Store
dist/
build/
`;

try {
  fs.writeFileSync(path.join(baseDir, 'backend/.gitignore'), gitignoreContent);
  console.log('✓ Created: backend/.gitignore');
} catch (err) {
  console.error('✗ Error creating backend/.gitignore:', err.message);
}

try {
  fs.writeFileSync(path.join(baseDir, 'frontend/.gitignore'), gitignoreContent);
  console.log('✓ Created: frontend/.gitignore');
} catch (err) {
  console.error('✗ Error creating frontend/.gitignore:', err.message);
}

// Create app.json for Expo
const appJson = {
  expo: {
    name: 'BarterApp',
    slug: 'barter-app',
    version: '1.0.0',
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTabletMode: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
  },
};

try {
  fs.writeFileSync(
    path.join(baseDir, 'frontend/app.json'),
    JSON.stringify(appJson, null, 2)
  );
  console.log('✓ Created: frontend/app.json');
} catch (err) {
  console.error('✗ Error creating frontend/app.json:', err.message);
}

// Create App.tsx for React Native
const appTsxContent = `import React from 'react';
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
`;

try {
  fs.writeFileSync(path.join(baseDir, 'frontend/src/App.tsx'), appTsxContent);
  console.log('✓ Created: frontend/src/App.tsx');
} catch (err) {
  console.error('✗ Error creating frontend/src/App.tsx:', err.message);
}

console.log('\n✅ Setup complete!\n');
console.log('📋 Next steps:');
console.log('  1. cd backend && npm install');
console.log('  2. cd ../frontend && npm install');
console.log('  3. Ensure MongoDB is running');
console.log('  4. cd ../backend && npm run dev (in one terminal)');
console.log('  5. cd ../frontend && npm start (in another terminal)');
console.log('\n🚀 Happy coding!\n');

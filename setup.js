const fs = require('fs');
const path = require('path');

const dirs = [
  'barter-app/backend/src/config',
  'barter-app/backend/src/models',
  'barter-app/backend/src/middleware',
  'barter-app/backend/src/routes',
  'barter-app/frontend/src/screens',
  'barter-app/frontend/src/components',
  'barter-app/frontend/src/navigation',
  'barter-app/frontend/src/services',
  'barter-app/frontend/src/context',
];

const baseDir = 'c:\\Users\\witmer\\Documents\\Gitrepo.worktrees\\copilot-start-implementation';

dirs.forEach(dir => {
  const fullPath = path.join(baseDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created: ${fullPath}`);
  }
});

console.log('Directory structure created successfully!');

@echo off
REM Create directory structure for barter-app
cd /d c:\Users\witmer\Documents\Gitrepo.worktrees\copilot-start-implementation

mkdir barter-app\backend\src\config
mkdir barter-app\backend\src\models
mkdir barter-app\backend\src\middleware
mkdir barter-app\backend\src\routes
mkdir barter-app\frontend\src\screens
mkdir barter-app\frontend\src\components
mkdir barter-app\frontend\src\navigation
mkdir barter-app\frontend\src\services
mkdir barter-app\frontend\src\context

echo Directories created successfully!
cd barter-app
echo Current directory: %cd%

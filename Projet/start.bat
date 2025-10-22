@echo off
echo ============================================
echo    Ayanokoji System - Starting...
echo ============================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing root dependencies...
    call npm install
)

if not exist "backend\node_modules\" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

if not exist "frontend\node_modules\" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo.
echo Starting application...
echo Backend: http://localhost:3000
echo Frontend: http://localhost:5173
echo.

npm run dev

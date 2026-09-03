@echo off
echo ========================================
echo   BrandMe - Setup Script
echo ========================================
echo.

cd /d "f:\web site comany\beandme-main\beandme-main"
echo [1/3] Removing node_modules...
if exist node_modules (
    rmdir /s /q node_modules
    echo node_modules removed.
) else (
    echo node_modules not found, skipping.
)

if exist package-lock.json (
    del /f /q package-lock.json
    echo package-lock.json removed.
)

echo.
echo [2/3] Installing packages...
npm install

echo.
echo [3/3] Starting dev server...
npm run dev

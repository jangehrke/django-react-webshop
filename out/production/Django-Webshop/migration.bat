@echo off
if exist "..\venv\Scripts\activate.bat" (
  call "..\venv\Scripts\activate.bat"
) else if exist ".\venv\Scripts\activate.bat" (
  call ".\venv\Scripts\activate.bat"
) else (
  echo [ERROR] Could not find venv activation script.
  exit /b 1
)

python manage.py makemigrations
python manage.py migrate
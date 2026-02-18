# Webshop setup

## Backend

`cd backend`

### Create virtual environment and activate it

```
py -m venv venv
.\venv\Scripts\Activate.ps1
```

### Installing required backend packages

`pip install -r requirements.txt`

### Setup the DB

Pre configured is a MySQL database connection. The DB needs manual init
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'webshop',
        'USER': 'root',
        'PASSWORD': 'root',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

### Migration + Loading DB dump

```
python manage.py migrate
python manage.py loaddata db_data.json
```

### Starting the Backend Server
```
python manage.py runserver
```
----------------------------------------------
## Frontend

```
cd frontend
```

### Install packages

`npm install`

### Start react development server

`npm start`

---------------------------------------------
# Test User
## User 1
```
Email: test@test.de
password: Lolkikjuj123!
```

## User 2
```
Email: jancg@outlook.de
password: Lolkikjuj123!
```


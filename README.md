# Webshop setup

## Backend

`cd backend`

### Create virtual environment and activate it

```
python -m venv venv
source venv/bin/activate
```

### Installing required backend packages

`pip install -r requirements.txt`

### Setup the DB

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


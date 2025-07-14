# Org Chart API

A **RESTful API** built with [Drogon](https://github.com/drogonframework/drogon), a high-performance C++ framework. This API is designed to manage organizational structures, including persons, departments, and job roles.

🔐 **All routes are protected using JWT for token-based authentication**.


## 📚 Endpoints

| Method   | URI                                                       | Action                    |
| -------- | --------------------------------------------------------- | ------------------------- |
| `GET`    | `/persons?limit={}&offset={}&sort_field={}&sort_order={}` | Retrieve all persons      |
| `GET`    | `/persons/{id}`                                           | Retrieve a single person  |
| `GET`    | `/persons/{id}/reports`                                   | Retrieve direct reports   |
| `POST`   | `/persons`                                                | Create a new person       |
| `PUT`    | `/persons/{id}`                                           | Update a person's details |
| `DELETE` | `/persons/{id}`                                           | Delete a person           |

---

### 🏢 Departments

| Method   | URI                                                           | Action                      |
| -------- | ------------------------------------------------------------- | --------------------------- |
| `GET`    | `/departments?limit={}&offset={}&sort_field={}&sort_order={}` | Retrieve all departments    |
| `GET`    | `/departments/{id}`                                           | Retrieve a department       |
| `GET`    | `/departments/{id}/persons`                                   | Retrieve department members |
| `POST`   | `/departments`                                                | Create a department         |
| `PUT`    | `/departments/{id}`                                           | Update department info      |
| `DELETE` | `/departments/{id}`                                           | Delete a department         |

---

### 💼 Jobs

| Method   | URI                                                     | Action                        |
| -------- | ------------------------------------------------------- | ----------------------------- |
| `GET`    | `/jobs?limit={}&offset={}&sort_fields={}&sort_order={}` | Retrieve all job roles        |
| `GET`    | `/jobs/{id}`                                            | Retrieve a job role           |
| `GET`    | `/jobs/{id}/persons`                                    | Retrieve people in a job role |
| `POST`   | `/jobs`                                                 | Create a job role             |
| `PUT`    | `/jobs/{id}`                                            | Update job role               |
| `DELETE` | `/jobs/{id}`                                            | Delete a job role             |

---

### 🔐 Auth

| Method | URI              | Action                              |
| ------ | ---------------- | ----------------------------------- |
| `POST` | `/auth/register` | Register a user and get a JWT token |
| `POST` | `/auth/login`    | Login and receive a JWT token       |

---

## 📦 Two Ways to Get Started

There are two ways to run the project:

### 1. **Using Docker** (Recommended for ease of setup)

Docker simplifies the setup process and ensures all dependencies are handled automatically.

### 2. **Manual Setup** (For those who prefer to run the project locally)  
Follow these steps if you want to run the application without Docker, but make sure to install dependencies and configure everything manually.

---

## 🐳 Using Docker

**1. Clone the Repository:**

```bash
git clone https://github.com/keploy/orgChartApi.git
cd orgChartApi
````

**2. Start the Docker Containers:**

Run the following command to bring up the services (PostgreSQL and the app):

```bash
docker-compose up
```

**3. Confirm Containers are Running:**

Check the status of your containers:

```bash
docker-compose ps
```

You should see two containers running: one for the PostgreSQL database and one for the application.

**4. Access the Application:**

The application will be available at `http://localhost:3000` by default. You can now interact with the API using any HTTP client.

### Note: Once the Application has started, See the usage guide to see how to interact with the application.

---

## 🖥️ Manual Setup (Without Docker)

If you prefer to manually set up the project, follow these steps.

### 📦 Prerequisites

Make sure you have the following tools installed on your system:

* Git
* GCC and G++
* CMake
* PostgreSQL
* OpenSSL
* libjsoncpp-dev
* Other dependencies (listed below)


### 📥 Install Dependencies

**For Ubuntu**, run the following commands to install necessary tools:

```bash
sudo apt install git gcc g++ cmake
sudo apt install libjsoncpp-dev     # jsoncpp
sudo apt install uuid-dev           # uuid
sudo apt install zlib1g-dev         # zlib
sudo apt install openssl libssl-dev # OpenSSL 
sudo apt-get install postgresql-all # PostgreSQL (for DB support)
```

**⚠️ Note:** Install database libraries **before** installing Drogon to avoid errors.

### 🐉 Drogon Installation

Now, let's install Drogon:

```bash
# Clone the repository
cd $WORK_PATH
git clone https://github.com/drogonframework/drogon
cd drogon
git submodule update --init
mkdir build && cd build
cmake ..
make && sudo make install
```

### ✅ Verify Drogon Installation

Once Drogon is installed, you can verify it with:

```bash
drogon_ctl -v
```

You should see the Drogon version and other relevant information.

---

**Important:**  

There are **two changes in the Application** you need to make when setting it up manually:

1. **Change the hostname** from `db` to `localhost` in the `config.json` file.
2. **Change the port** from `5432` to `5433` in the `config.json` file.


## 🗃️ Database Setup

### 1. **Start PostgreSQL**

To start the PostgreSQL database locally:

```bash
docker run --name pg -e POSTGRES_PASSWORD=password -d -p 5433:5432 postgres
```

**2. Install Postgres Client:**

If you don’t have the PostgreSQL client installed, run:

```bash
sudo apt install postgresql-client
```

**3. Create the Database:**

Log into PostgreSQL and create the `org_chart` database:

```bash
psql 'postgresql://postgres:password@127.0.0.1:5433/'
CREATE DATABASE org_chart;
```

**4. Seed the Database:**

Run the following SQL files to set up the necessary tables:

```bash
psql 'postgresql://postgres:password@127.0.0.1:5433/org_chart' -f scripts/create_db.sql
psql 'postgresql://postgres:password@127.0.0.1:5433/org_chart' -f scripts/seed_db.sql
```

---

## 🏗️ Build the Project

### 1. **Clone the Repository:**

```bash
git clone https://github.com/keploy/orgChartApi.git 
cd orgChartApi
git submodule update --init
```

### 2. **Build the Project:**

To build the project, run the following commands:

```bash
mkdir build && cd build
cmake ..
make
```

---

## ▶️ Run the Application

Once the project is built, ensure that the `config.json` file is correctly configured with your database settings, then run the application:

```bash
./org_chart
```

The app will now be running and accessible at `http://localhost:3000`.

---

## 💡 Usage Guide

### 1. **Register a User:**

Install [HTTPie](https://httpie.io/) if you haven’t already:

```bash
sudo apt install httpie
```

To register a new user, run:

```bash
http post localhost:3000/auth/register username="admin1" password="password"
```
(or)

```bash

curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin1","password":"password"}'

```

You will receive a JWT token as the response:

```json
{
  "token": "jwt_token_here",
  "username": "admin1"
}
```

### 2. **Login:**

To log in and receive a token:

```bash
http post localhost:3000/auth/login username="admin1" password="password"
```

The response will look like:

```json
{
  "token": "jwt_token_here",
  "username": "admin1"
}
```

### 3. **Access Protected Resources:**

Use the JWT token to access protected endpoints:

```bash
http --auth-type=bearer --auth="your_jwt_token" get localhost:3000/persons offset==1 limit==25 sort_field==id sort_order==asc
```

Sample response:

```json
[
  {
    "id": 2,
    "first_name": "Gary",
    "last_name": "Reed",
    "hire_date": "2018-04-07 01:00:00",
    "job": {
      "id": 2,
      "title": "M1"
    },
    "department": {
      "id": 1,
      "name": "Product"
    },
    "manager": {
      "id": 1,
      "full_name": "Sabryna Peers"
    }
  },
  ...
]
```

---

## 🧯 Troubleshooting

* **OpenSSL not found?**
  If you encounter issues with OpenSSL, point CMake to the OpenSSL installation manually:

  ```bash
  cmake -DOPENSSL_ROOT_DIR=/usr/local/opt/openssl ..
  ```

* **LSP / IntelliSense not working?**
  Enable compile commands for better LSP support:

  ```bash
  cmake -DCMAKE_EXPORT_COMPILE_COMMANDS=ON ..
  ```
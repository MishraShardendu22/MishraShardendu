# Org Chart API – Setup Documentation

## Objective

Manually set up and run a C++-based REST API (Org Chart API) built using the Drogon framework. Configure PostgreSQL, resolve build issues, and start the local server.

---

## Tech Stack

* **Framework:** Drogon (C++)
* **Database:** PostgreSQL
* **Auth:** JWT (JSON Web Token)
* **Build System:** CMake
* **Language:** C++17
* **OS Used:** Fedora Linux

---

## Dependencies Installed

### System Packages (Fedora)

```bash
sudo dnf install cmake gcc-c++ jsoncpp-devel openssl-devel libuuid-devel zlib-devel postgresql-server postgresql-devel
```

### Drogon Installation

```bash
git clone https://github.com/drogonframework/drogon
cd drogon
git submodule update --init
mkdir build && cd build
cmake ..
make -j$(nproc)
sudo make install
```

### Verification

```bash
drogon_ctl -v
```

---

## Project Setup

### Clone Project

```bash
git clone https://github.com/keploy/orgChartApi
cd orgChartApi
```

### Configuration

Edited `config.json` to:

* Set `host` to `localhost`
* Set `port` to `5433` (PostgreSQL mapped)
* Set `passwd` to `password`
* Confirmed `dbname` is `org_chart`

---

## Database Setup (via Docker)

```bash
docker run --name pg -e POSTGRES_PASSWORD=password -d -p 5433:5432 postgres
```

### PostgreSQL CLI Access

```bash
psql 'postgresql://postgres:password@127.0.0.1:5433/'
CREATE DATABASE org_chart;
```

### Seed Schema and Data

```bash
psql 'postgresql://postgres:password@127.0.0.1:5433/org_chart' -f scripts/create_db.sql
psql 'postgresql://postgres:password@127.0.0.1:5433/org_chart' -f scripts/seed_db.sql
```

---

## Build and Run Application

### Build

```bash
mkdir build && cd build
cmake ..
make -j$(nproc)
```

### Run

```bash
./org_chart
```

**Output:**

```
Load config file - main.cc:4
running on localhost:3000 - main.cc:7
```

---

## Status

* Drogon app compiled successfully
* PostgreSQL container is running
* Database created and seeded
* API server running on `http://localhost:3000`
* No requests made yet
* JWT endpoints and API calls not tested yet

---

# Docker Containerization Guide

## 1. Introduction
This document covers core Docker concepts, architecture, common commands, Dockerfile structure, Docker Compose, networking, volumes, and differences vs virtual machines. Copy and paste for reference.

## 2. Why Containerize Applications
- Ensure everyone uses the same application version and dependencies.
- Decouple application version from host environment and package manager versions.
- Avoid “it works on my machine” issues by replicating the development environment.
- Isolate dependencies and configuration to prevent conflicts across systems.
- Package, ship, and run applications consistently across environments.

## 3. Docker Architecture Overview
### 3.1 Docker Components
- **Docker Daemon (dockerd)**  
  - Background service running as root.  
  - Manages building, running, and managing containers.  
  - Manages images, volumes, networks.  
  - Listens for Docker API requests via CLI or remote.

- **Docker Client (docker CLI)**  
  - User interface to send commands to the Docker daemon.

- **Docker Registry**  
  - Storage and distribution service for Docker images (e.g., Docker Hub, private registry).

### 3.2 Images vs Containers
- **Image**  
  - Immutable blueprint for creating containers.  
  - Built in layers; each layer adds or modifies files/configuration.  
  - Smaller image size is better for distribution; reuse layers across builds.
- **Container**  
  - Runtime instance of an image.  
  - Lightweight, portable runtime environment.  
  - Own filesystem (union of image layers + writable layer), network interfaces, process space, and environment variables.

## 4. Core Docker Commands
Use hyphens for options; no long dashes.

### 4.1 Image Management
- `docker pull <image_name>:<tag>`  
  - Download image from registry.
- `docker images`  
  - List local images.
- `docker rmi <image_name>:<tag|image_id>`  
  - Remove one or more images.

### 4.2 Container Management
- `docker run [OPTIONS] <image_name> [COMMAND] [ARGS...]`  
  - Create and start a container.  
  - Common options:
    - `-it` : allocate tty and interactive mode.
    - `-d` : run container in background (detached).
    - `--name <name>` : assign a name to the container.
    - `-p <host_port>:<container_port>` : publish container port to host.
    - `-v <host_path>:<container_path>` : bind mount or volume (see Volumes section).
    - `--network <network_name>` : connect to a user-defined network.
- `docker ps`  
  - List running containers.
- `docker ps -a`  
  - List all containers (running, exited, etc.).
- `docker start <container_name|id>`  
  - Start one or more stopped containers.
- `docker stop <container_name|id>`  
  - Stop a running container.
- `docker rm <container_name|id>`  
  - Remove one or more stopped containers.
- `docker logs <container_name|id>`  
  - Fetch container logs.
- `docker exec -it <container_name|id> <command>`  
  - Run a command in a running container.
- `docker inspect <container_name|id>`  
  - Return low-level information on containers or images.

### 4.3 Daemon Control
- `systemctl start docker` / `systemctl stop docker` (Linux systems with systemd).  
- Docker daemon must be running for CLI commands to work.

### 4.4 Registry Login
- `docker login`  
  - Authenticate to a registry (Docker Hub or private registry).
- `docker logout`  
  - Remove stored credentials.

## 5. Dockerfile Structure
A Dockerfile defines how to build an image. Basic directives:
```

FROM \<base\_image>:<tag>
WORKDIR /app
COPY <src> <dest>
RUN <command>         # install packages, build steps, etc.
ENV KEY=value         # optional environment variables
EXPOSE <port>         # documentation; map at run time via -p
CMD \["executable", "param1", "param2"]  # default command
ENTRYPOINT \["executable","param1"]      # fixed entrypoint; CMD provides default args

````
### 5.1 Layering
- Each instruction creates a new layer.  
- Order matters: changes earlier invalidate cached layers for subsequent instructions.  
- Combine related steps where appropriate (but avoid premature optimization; keep commands clear).

### 5.2 Build Command
- `docker build -t <image_name>:<version> <context_path>`  
  - `-t`: tag name and version.  
  - Context path: directory containing Dockerfile and necessary files.

## 6. Docker Compose
Define and run multi-container applications.

### 6.1 Compose File (docker-compose.yml)
Basic structure:
```yaml
version: "3.8"
services:
  service-name:
    image: <image_name>:<tag>    # or build: context and Dockerfile path
    build:
      context: .
      dockerfile: Dockerfile
    container_name: <name>
    ports:
      - "<host_port>:<container_port>"
    environment:
      - KEY=value
    volumes:
      - <volume_name>:<container_path>
    networks:
      - <network_name>
    depends_on:
      - other-service
networks:
  <network_name>:
    driver: bridge
volumes:
  <volume_name>:
````

### 6.2 Commands

* `docker compose -f <filename>.yml up -d`

  * Create/start all services in detached mode.
* `docker compose -f <filename>.yml down`

  * Stop and remove containers, networks created by up.
* By default, Compose sets up a network for services in the same project. No explicit network needed for basic cases.
* Use named volumes or bind mounts for persistence; see Volumes section.

## 7. Networking

* Default network type for containers: **bridge**.
* Containers on the same user-defined bridge network can communicate via service name or container name.
* Publish ports with `-p host_port:container_port` or via Compose ports section.
* Inspect networks: `docker network ls`, `docker network inspect <network_name>`.
* Remove unused networks: `docker network rm <network_name>`.
* Other network drivers: host, none/null.

  * **host**: container shares host network stack (Linux only).
  * **none**: no network connectivity.

## 8. Volumes and Data Persistence

Persistent data storage options:

* **Named volumes**

  * Managed by Docker.
  * Create: `docker volume create <vol_name>`.
  * List: `docker volume ls`.
  * Use in run: `-v <vol_name>:<container_path>`.
  * Remove: `docker volume rm <vol_name>`.
* **Anonymous volumes**

  * Created when `-v <container_path>` without name.
  * Removed when container removed (unless reused).
* **Bind mounts**

  * Map host directory/file: `-v /host/path:/container/path`.
  * Useful for development, local code editing.
* Clean up unused volumes: `docker volume prune`.

## 9. Docker on Different Operating Systems

* On Linux:

  * Docker uses host kernel directly; Linux containers run natively without a hypervisor.
* On Windows/macOS:

  * Docker Desktop runs a lightweight VM (via Hyper-V, WSL2 on Windows; HyperKit or similar on macOS).
  * Inside VM uses Linux kernel to run containers.
* Docker Desktop provides GUI, CLI integration, and manages the VM.

## 10. Virtual Machines vs Containers

* **Containers**:

  * Use host kernel; isolate at process level.
  * Lightweight, faster startup, lower overhead.
  * Limited to same kernel type (Linux containers need Linux kernel). On Windows/macOS, run Linux kernel in lightweight VM.
* **Virtual Machines**:

  * Full guest OS on virtualized hardware via hypervisor.
  * Higher overhead, slower startup.
  * Can run different OS types (Windows on Linux host, Linux on Windows host).
* Summary:

  * Containers are lighter but require compatible kernel.
  * VMs are heavier but more isolated and cross-OS.

## 11. Hypervisor Overview

* Software layer enabling multiple OS instances on same physical machine.
* **Type 1 (bare-metal)**: runs directly on hardware (e.g., VMware ESXi, Microsoft Hyper-V).
* **Type 2 (hosted)**: runs on host OS (e.g., VirtualBox, VMware Workstation).
* Docker on Linux does not require a hypervisor for Linux containers. On Windows/macOS, Docker Desktop uses a lightweight VM via a hypervisor layer.

## 12. Port Binding

* Purpose: expose container ports to host for access from outside container.
* Syntax: `-p <host_port>:<container_port>`.
* Example: `docker run -d -p 8080:80 nginx` exposes container’s port 80 at host port 8080.
* Multiple bindings allowed: `-p 8080:80 -p 8443:443`.

## 13. Summary of Common Commands

```bash
# Image operations
docker pull <image>:<tag>
docker images
docker rmi <image>:<tag or id>

# Container operations
docker run -it --name <name> -p host:container -v host_path:container_path <image> [command]
docker ps
docker ps -a
docker start <container>
docker stop <container>
docker rm <container>
docker logs <container>
docker exec -it <container> /bin/sh

# Build image
docker build -t <image_name>:<version> .

# Compose
docker compose -f docker-compose.yml up -d
docker compose -f docker-compose.yml down

# Volume operations
docker volume ls
docker volume create <vol_name>
docker volume rm <vol_name>
docker volume prune

# Network operations
docker network ls
docker network inspect <network_name>
docker network rm <network_name>
```

## 14. Example Dockerfile

```dockerfile
# Use official Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy application source
COPY . .

# Expose port
EXPOSE 3000

# Default command
CMD ["npm", "start"]
```

## 15. Example docker-compose.yml

```yaml
version: "3.8"
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: my-app
    ports:
      - "3000:3000"
    volumes:
      - ./:/app
    environment:
      - NODE_ENV=development
    depends_on:
      - db

  db:
    image: mongo:6
    container_name: my-mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

## 16. Notes

* No explicit network configuration needed for basic Compose setups; services join the default network.
* For production, adjust Dockerfile and Compose for smaller images, non-root users, health checks, and data persistence. (Omit if strictly not needed.)
* Use version tags for images to ensure consistency.
* Clean up unused resources regularly: containers, images, volumes, networks.

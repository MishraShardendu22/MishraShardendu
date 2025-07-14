# Project-Docker

This is my first Docker project, aimed at learning how Docker works. It's a simple landing page that, when clicked, navigates you to my project and main GitHub account.

## Project Details

- **Repository:** [shardendumishra22/projectdocker](https://hub.docker.com/r/shardendumishra22/projectdocker)
- **Docker Pull Command:**
  ```bash
  docker pull shardendumishra22/projectdocker:0.0.1.release
  ```

## Technologies Used

### Docker <img src="https://imgs.search.brave.com/uBUr9BZK3jBX-im5HyUDdiwOTfmhAPRK2X04aJVnbGk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kMjlm/aHB3MDY5Y3R0Mi5j/bG91ZGZyb250Lm5l/dC9pY29uL2ltYWdl/LzM4NzcxL3ByZXZp/ZXcuc3Zn" alt="Docker Icon" height="40" width="40">


Docker is an open platform for developing, shipping, and running applications. It allows you to package an application with all its dependencies into a standardized unit called a container. 

### Key Features of Docker:
- **Isolation:** Each application runs in its own container, isolated from others.
- **Portability:** Containers can run on any system that has Docker installed, regardless of the underlying environment.
- **Scalability:** Easily scale applications by running multiple containers.

## Getting Started

1. Clone the repository or pull the Docker image using the provided command.
2. Run the container:
   ```bash
   docker run -d -p 3000:3000 shardendumishra22/projectdocker:0.0.1.release
   ```
3. Open your browser and navigate to `http://localhost:3000`.

## Contact

For any inquiries, please reach out to me on my [GitHub](https://github.com/ShardenduMishra22).

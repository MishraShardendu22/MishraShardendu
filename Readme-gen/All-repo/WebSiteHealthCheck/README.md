# Website Health Check Microservice

This MicroService checks the availability of a specified website. It is built using GoLang and COBRA.

## Tech Stack

- **Language:** GoLang
- **Framework:** COBRA

## Features

- Check if a website is up or down.
- Simple command-line interface.
- Easy to extend for additional features.

## Installation

1. Ensure you have Go installed on your machine. You can download it from [golang.org](https://golang.org/dl/).
2. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

3. Install COBRA:

   ```bash
   go get github.com/spf13/cobra
   ```

## Usage

Run the application with the following command:

```bash
go run main.go <website-url>
```

Replace `<website-url>` with the URL of the website you want to check (e.g., `http://example.com`).

### Example

```bash
go run main.go http://example.com
```

## Author
Created by Shardendu Mishra

# GitHub Repo Transfer Automation

A Go script to **automate GitHub repository transfers** between personal accounts or organizations. Built for speed, efficiency, and convenience—especially for developers using multiple GitHub accounts (e.g., one for learning with Copilot Pro, one for actual projects).

---

## 🚀 Why This Exists

Manually transferring repositories through the GitHub UI is tedious—especially when dealing with dozens of repos. This script automates the entire process:

- **One-time setup**
- **Parallel repo transfers**
- **Retry on failure**
- **Environment-based token handling**

Built as a pure **engineering solution** that leverages **Go routines, multithreading, and API efficiency**.

---

## 🔧 Features

- **Bulk transfers**: Transfer many repositories in one go  
- **Parallelism**: Uses Go routines to run transfers concurrently  
- **HTTP optimized**: Uses [Resty](https://github.com/go-resty/resty) for fast and reliable HTTP requests  
- **Retries**: Automatic retries on failures  
- **Token management**: Reads GitHub token from `.env`  
- **Lightweight**: No dependencies beyond Resty and GoDotEnv  

---

## 📁 Setup

### 1. Clone the repo

```bash
git clone https://github.com/ShardenduMishra22/Go-TransferScript.git
cd Go-TransferScript
````

### 2. Install dependencies

```bash
go get github.com/go-resty/resty/v2
go get github.com/joho/godotenv
```

### 3. Create `.env` file

```env
GITHUB_TOKEN=your_github_token
```

Ensure this token has `repo` and `admin:repo_hook` permissions.

---

## 🚀 Run

```bash
go run main.go
```

Modify the repo list and new owner as needed inside `main.go`.

---

## 🧠 Context

> *"I use two GitHub accounts—one for learning (Copilot Pro) and one for actual work. This script automates moving finished repos from the learning account to the project account."*

This might not be useful to everyone, but for devs managing multiple GitHub accounts or orgs, it saves **real time**. Think of it as a **batch GitHub transfer CLI**.

---

## 📣 GitHub Feature Request

I've submitted this as a feature request to GitHub.

* **[Discussion Link](https://github.com/orgs/community/discussions/163410)**
  Jump in, upvote, and add your use case if you want GitHub to support this natively.

---

## 🔮 Next Steps

If GitHub doesn’t implement this, I’ll build a minimal UI:

* OAuth + token input
* Repo fetch via API
* Bulk transfer via click

---

## 📎 Links

* 🔗 [Script Repository](https://github.com/MishraShardendu22/Go-TransferScript)
* 💬 [GitHub Discussion](https://github.com/orgs/community/discussions/163410)

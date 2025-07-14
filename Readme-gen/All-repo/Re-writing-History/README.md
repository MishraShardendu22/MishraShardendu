# Git Commit Metadata Rewriter with AI

This project provides a Go script to **retroactively edit Git commit metadata** (author name, email, date) for a cloned GitHub repository. It uses an AI model to generate realistic commit dates and rewrites the repository history accordingly.

---

## 🚀 Features
- **Clone any public GitHub repository**
- **Generate new commit dates** using an AI model (OpenRouter API)
- **Rewrite commit history** with new metadata
- **Force-push rewritten history** to the original repository
- **Automated cleanup** of local files after completion

---

## 🛠 How It Works
1. **Clone** the target GitHub repository
2. **Extract** the commit log to `edited_commits.txt`
3. **Generate** new commit dates using an AI model (OpenRouter API)
4. **Write** the new commit metadata to `updated_commits.txt`
5. **Rewrite** the Git history using `git filter-branch` and the new metadata
6. **Force-push** the rewritten history to the remote repository
7. **Clean up** all temporary files and the local clone

---

## ⚡️ Quickstart

### 1. **Clone this repo and install dependencies**
```bash
git clone <your-fork-or-this-repo>
cd Hackathon-Time-Script
go mod tidy
```

### 2. **Set up your API key**
- Obtain an API key from [OpenRouter](https://openrouter.ai/)
- Create a `.env` file in the project root:

```env
API_KEY=sk-xxxxxxx
```

### 3. **Edit main.go for your target repo**
- Set the `repo` variable to the repository you want to rewrite (e.g. `MishraShardendu22`)
- Set the `start` and `end` date range for the new commit dates

### 4. **Run the script**
```bash
go run main.go
```

---

## 📝 Example .env
```env
API_KEY=sk-xxxxxxx
```

---

## 🧠 AI Integration
- The script uses the OpenRouter API to generate realistic, non-uniform commit dates within your specified range.
- The AI is prompted to only change commit timestamps, not author names or messages.
- If the API key is missing or invalid, the script will exit with an error.

---

## 🐞 Troubleshooting
- **API_KEY not set**: Ensure your `.env` file exists and contains a valid key.
- **Permission denied on push**: Make sure your SSH key is added to GitHub and you have push access to the repo.
- **AI returns empty or error**: Check your API key and network connection.
- **Script panics on index out of range**: This means the AI response was empty or malformed. Check your API key and try again.
- **Branch protection**: If the remote branch is protected, you may need to temporarily disable protection to force-push.

---

## 📂 Project Structure
```
Hackathon-Time-Script/
├── main.go                # Main script
├── util/
│   ├── clone.go           # Cloning and log extraction
│   ├── run.go             # AI integration for commit date generation
│   └── edit.go            # History rewriting and push
├── edited_commits.txt     # (Generated) Original commit log
├── updated_commits.txt    # (Generated) AI-updated commit log
├── .env                   # Your API key (not committed)
├── go.mod, go.sum         # Go dependencies
```

---

## 🤝 Contributing
Pull requests and issues are welcome! Please open an issue to discuss your idea or bug before submitting a PR.

---

## 📄 License
MIT License. See [LICENSE](LICENSE) for details. 
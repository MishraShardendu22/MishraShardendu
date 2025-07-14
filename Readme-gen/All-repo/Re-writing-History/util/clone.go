package util

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

func Clone(url string) {
	repoName := strings.TrimSuffix(filepath.Base(url), ".git")
	cloneDir := "./" + repoName

	cloneRepoIfNeeded(url, cloneDir)
	commitLog := getGitLog(cloneDir)

	saveToFile("edited_commits.txt", commitLog)
}

func cloneRepoIfNeeded(url, dir string) {
	if _, err := os.Stat(dir); os.IsNotExist(err) {
		fmt.Println("Cloning repo...")
		cmd := exec.Command("git", "clone", url, dir)
		cmd.Stdout = os.Stdout
		cmd.Stderr = os.Stderr
		if err := cmd.Run(); err != nil {
			log.Fatalf("git clone failed: %v", err)
		}
	}
}

func getGitLog(dir string) []byte {
	cmd := exec.Command("git", "log", "--pretty=format:%H|%an|%ae|%ad|%s", "--date=iso")
	cmd.Dir = dir
	out, err := cmd.Output()
	if err != nil {
		log.Fatalf("git log failed: %v", err)
	}
	return out
}

func saveToFile(filename string, data []byte) {
	f, err := os.Create(filename)
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	w := bufio.NewWriter(f)
	_, err = w.WriteString(string(data))
	if err != nil {
		log.Fatal(err)
	}
	w.Flush()
}

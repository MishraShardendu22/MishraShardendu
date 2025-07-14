package util

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"os/exec"
	"strings"
)

func Edit(repo string) {
	sshRemote := "git@github.com:MishraShardendu22/" + repo + ".git"

	if err := os.Chdir(repo); err != nil {
		log.Fatalf("Failed to change directory: %v", err)
	}

	f, err := os.Open("../updated_commits.txt")
	if err != nil {
		log.Fatalf("Failed to open updated_commits.txt: %v", err)
	}
	defer f.Close()

	commitUpdates := make(map[string]struct {
		name  string
		email string
		date  string
	})

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		parts := strings.SplitN(scanner.Text(), "|", 5)
		if len(parts) < 4 {
			continue
		}
		hash, name, email, date := parts[0], parts[1], parts[2], parts[3]
		commitUpdates[hash] = struct {
			name  string
			email string
			date  string
		}{name, email, date}
	}
	if err := scanner.Err(); err != nil {
		log.Fatalf("Error reading updated_commits.txt: %v", err)
	}

	if len(commitUpdates) == 0 {
		log.Println("No commits to update found in updated_commits.txt. Exiting.")
		return
	}
	fmt.Printf("Found %d commits to update.\n", len(commitUpdates))

	var envFilter strings.Builder
	envFilter.WriteString("#!/bin/bash\n")
	for hash, update := range commitUpdates {
		envFilter.WriteString(fmt.Sprintf(`
if [ "$GIT_COMMIT" = "%s" ]; then
  echo "Updating commit %s" >&2
  export GIT_AUTHOR_NAME="%s"
  export GIT_AUTHOR_EMAIL="%s"
  export GIT_AUTHOR_DATE="%s"
  export GIT_COMMITTER_NAME="%s"
  export GIT_COMMITTER_EMAIL="%s"
  export GIT_COMMITTER_DATE="%s"
  echo "Updated commit %s" >&2
fi
`, hash, hash[:8], update.name, update.email, update.date, update.name, update.email, update.date, hash[:8]))
	}

	if err := os.WriteFile("env-filter.sh", []byte(envFilter.String()), 0755); err != nil {
		log.Fatalf("Failed to write env-filter script: %v", err)
	}

	branchCmd := exec.Command("git", "rev-parse", "--abbrev-ref", "HEAD")
	branchOutput, err := branchCmd.Output()
	if err != nil {
		log.Fatalf("Failed to get current branch: %v", err)
	}
	currentBranch := strings.TrimSpace(string(branchOutput))
	fmt.Printf("Current branch: %s\n", currentBranch)

	rewriteCmd := exec.Command("git", "filter-branch", "-f", "--env-filter", envFilter.String(), currentBranch)
	rewriteCmd.Stdout = os.Stdout
	rewriteCmd.Stderr = os.Stderr
	fmt.Println("Rewriting history...")
	if err := rewriteCmd.Run(); err != nil {
		log.Fatalf("git filter-branch failed: %v", err)
	}

	cleanupCmds := [][]string{
		{"git", "update-ref", "-d", "refs/original/refs/heads/" + currentBranch},
		{"git", "reflog", "expire", "--expire=now", "--all"},
		{"git", "gc", "--prune=now", "--aggressive"},
		{"git", "remote", "prune", "origin"},
	}
	for _, args := range cleanupCmds {
		cmd := exec.Command(args[0], args[1:]...)
		cmd.Stdout = os.Stdout
		cmd.Stderr = os.Stderr
		if err := cmd.Run(); err != nil {
			log.Printf("Warning: %s failed: %v", strings.Join(args, " "), err)
		}
	}

	fmt.Println("Setting remote to SSH...")
	setRemoteCmd := exec.Command("git", "remote", "set-url", "origin", sshRemote)
	setRemoteCmd.Stdout = os.Stdout
	setRemoteCmd.Stderr = os.Stderr
	if err := setRemoteCmd.Run(); err != nil {
		log.Fatalf("Failed to set remote to SSH: %v", err)
	}

	fmt.Println("Force pushing to origin...")
	pushCmd := exec.Command("git", "push", "origin", currentBranch, "--force")
	pushCmd.Stdout = os.Stdout
	pushCmd.Stderr = os.Stderr
	if err := pushCmd.Run(); err != nil {
		log.Fatalf("Force push failed: %v", err)
	}

	if err := os.Chdir(".."); err != nil {
		log.Fatalf("Failed to change back to parent directory: %v", err)
	}
	fmt.Println("Cleaning up local files...")
	os.RemoveAll(repo)
	os.Remove("updated_commits.txt")
	os.Remove("edited_commits.txt")
	os.Remove(repo + "/env-filter.sh")
	fmt.Println("Git history rewriting completed successfully!")
}

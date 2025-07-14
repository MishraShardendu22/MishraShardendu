package model

import "time"

type UserDetail struct {
	Commits       int `json:"commits"`
	Stars         int `json:"stars"`
	Issues        int `json:"issues"`
	PullRequests  int `json:"pull_requests"`
	Contributions int `json:"contributions"`
	Repostries    int `json:"repositories"`
}


type User struct {
	Name         string     `json:"name"`
	Email        string     `json:"email"`
	Username     string     `json:"login"`
	Blog         string     `json:"blog"`
	Bio          string     `json:"bio"`
	Company      string     `json:"company"`
	Location     string     `json:"location"`
	Followers    int        `json:"followers"`
	Following    int        `json:"following"`
	Repo         string     `json:"repos_url"`
	Image        string     `json:"avatar_url"`
	CreatedAt    time.Time  `json:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at"`
	PublicRepos  int        `json:"public_repos"`
	Twitter      string     `json:"twitter_username"`
	Subscription string     `json:"subscriptions_url"`
	Organisation string     `json:"organizations_url"`
	Userdetails  UserDetail `json:"user_detail"`
}

type RepoDetail struct {
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Language    string    `json:"language"`
	Stars       int       `json:"stargazers_count"`
	Forks       int       `json:"forks_count"`
	Watchers    int       `json:"watchers_count"`
	Owner       string    `json:"owner"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	Url         string    `json:"url"`
	CloneUrl    string    `json:"clone_url"`
	License     string    `json:"license"`
	Topics      []string  `json:"topics"`
}

type RepoList struct {
	TotalCount int          `json:"total_count"`
	Items      []RepoDetail `json:"items"`
}
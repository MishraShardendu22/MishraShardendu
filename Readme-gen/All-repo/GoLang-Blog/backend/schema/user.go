package schema

import "time"

type User struct {
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	Password  string    `json:"password"`
	Level     int       `json:"level"`
	Bio       string    `json:"bio"`
	Followers []*User   `json:"followers"`
	Following []*User   `json:"following"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// Method to set default values
func (u *User) SetDefaults() {
	if u.Level == 0 {
		u.Level = 0
	}
	if u.Bio == "" {
		u.Bio = ""
	}
	if u.Followers == nil {
		u.Followers = []*User{}
	}
	if u.Following == nil {
		u.Following = []*User{}
	}
}

type Comment struct {
	ID        uint      `json:"id"`
	PostID    uint      `json:"post_id"`
	UserID    uint      `json:"user_id"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
} 

type Like struct {
	ID        uint      `json:"id"`
	PostID    uint      `json:"post_id"`
	UserID    uint      `json:"user_id"`
}

type Post struct {
	Username  string    `json:"username"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	Likes     []Like       `json:"likes"`
	Comments  []Comment `json:"comments"`
	Image     string    `json:"image"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

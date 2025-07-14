interface User {
    bio: string;
    name: string;
    blog: string;
    login: string;
    email: string;
    company: string;
    repos_url: string;
    location: string;
    avatar_url: string;
    created_at: string;
    updated_at: string;
    followers: number;
    following: number;
    public_repos: number;
    twitter_username: string;
    subscriptions_url: string;
    organizations_url: string;
}

export type { User };

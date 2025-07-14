import { useState,useEffect } from "react";
import axios from "axios";

export default function Card() {

    const [user, setUser] = useState({
        name: "",
        followers: 0,
        repos: 0,
        avatarUrl: "",
        blog: "Coming Soon !!",
        bio: "Coming Soon !!",
    });
    

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get("https://api.github.com/users/ShardenduMishra22")
            .then(res => {
                setUser({
                    name: res.data.name,
                    followers: res.data.followers,
                    repos: res.data.public_repos,
                    avatarUrl: res.data.avatar_url,
                    blog: res.data.blog || "Coming Soon !!",
                    bio: res.data.bio || "Coming Soon !!",
                });
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <p className="bg-yellow-300 text-orange-500 font-extrabold text-center text-xl p-4 rounded-lg shadow-md">
                Loading, please wait...
            </p>
        );
    }

    if (error) {
        return (
            <p className="bg-red-300 text-orange-500 font-extrabold text-center text-xl p-4 rounded-lg shadow-md">
                Error loading data. Please try again later.
            </p>
        );
    }

    return (
        <div className="p-5 rounded-2xl text-lg text-red-900 font-extrabold text-center w-96">
            <img
                src={user.avatarUrl}
                alt="User Avatar"
                width="150"
                height="150"
                className=" mx-auto rounded-3xl border-4 border-gray-300 shadow-md"
            /><br/><hr/>
            <h2 className="text-2xl font-extrabold mt-4 mb-2">{user.name}</h2><hr/>
            <p className="px-4 py-4 text-left">Followers: <span>{user.followers}</span></p><hr/>
            <p className="px-4 py-4 text-left">Repositories: <span>{user.repos}</span></p><hr/>
            <p className="px-4 py-4 text-left">Blog: <span>{user.blog}</span></p><hr/>
            <p className="px-4 py-4 text-left">Bio: <span>{user.bio}</span></p><hr/>
        </div>
    );
}
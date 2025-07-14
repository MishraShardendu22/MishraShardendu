/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { sendRequest } from '../util/utils';
import Loader from '@/components/Loading';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
import Cookies from 'js-cookie';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle, Lock, CheckCircle, XCircle } from "lucide-react";

const Home: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    let user1;
    useEffect(() => {
        const fetchUser = async () => {
            user1 = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
            if (!user1 || !user1._id) {
                console.error("User not found in local storage");
                return;
            }

            try {
                const response = await sendRequest('get', `/user/${user1._id}`, {});
                setUser(response.user);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    const jwt = Cookies.get('jwt');
    if (!jwt) {
        navigate('/login');
    }

    if (!user) {
        return <Loader />
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <nav className="flex justify-end gap-4 mb-8">
                <Button 
                    variant="outline" 
                    onClick={() => navigate('/reset')}
                    className="flex bg-green-300 items-center gap-2"
                >
                    <Lock className="w-4 h-4" />
                    Reset Password
                </Button>
                {!user.verified && (
                    <Button 
                        onClick={() => navigate('/otp')}
                        className="flex items-center gap-2"
                    >
                        <CheckCircle className="w-4 h-4" />
                        Verify
                    </Button>
                )}
                {jwt && <Logout />}
            </nav>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                        <UserCircle className="w-8 h-8" />
                        Welcome, {user.name}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex justify-center">
                        <img
                            src={user.image}
                            alt={`${user.name}'s avatar`}
                            className="rounded-full w-32 h-32 object-cover border-4 border-slate-200 dark:border-slate-700"
                        />
                    </div>
                    
                    <div className="space-y-3">
                        <p className="flex items-center gap-2 text-lg">
                            <strong>Email:</strong> 
                            <span className="text-slate-600 dark:text-slate-300">{user.email}</span>
                        </p>
                        <p className="flex items-center gap-2 text-lg">
                            <strong>Gender:</strong> 
                            <span className="text-slate-600 dark:text-slate-300">{user.gender}</span>
                        </p>
                        <p className="flex items-center gap-2 text-lg">
                            <strong>Verified:</strong> 
                            {user.verified ? 
                                <CheckCircle className="w-5 h-5 text-green-500" /> : 
                                <XCircle className="w-5 h-5 text-red-500" />
                            }
                        </p>
                        <p className="flex items-center gap-2 text-lg">
                            <strong>Account Created:</strong> 
                            <span className="text-slate-600 dark:text-slate-300">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </span>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Home;
import React from 'react';
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import userConversation from '@/zustand/useConversation';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, UserCheck, MessageCircle, Users, ChevronRight } from "lucide-react";

interface ProfileItemProps {
  label: string;
  text: string;
  icon?: React.ReactNode;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ label, text, icon }) => (
  <div className="group relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="flex items-center gap-4 p-5 bg-slate-800/30 rounded-2xl border border-slate-700/30 backdrop-blur-lg transform transition-all duration-300 hover:translate-x-1 hover:shadow-xl">
      <div className="flex-shrink-0 p-3.5 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl text-slate-200 shadow-lg group-hover:shadow-xl group-hover:text-white transition-all duration-300 ring-1 ring-slate-600/30">
        {icon}
      </div>
      <div className="flex-grow">
        <p className="text-sm font-medium text-slate-400 mb-1 transition-colors duration-300 group-hover:text-slate-300">{label}</p>
        <p className="text-base font-semibold text-slate-200 break-all transition-colors duration-300 group-hover:text-white">{text}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-500 opacity-0 group-hover:opacity-100 transform transition-all duration-300 group-hover:translate-x-1" />
    </div>
  </div>
);

const ProfileLayout: React.FC<{
  children: React.ReactNode;
  title: string;
}> = ({ children, title }) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4 md:p-8">
      <Button
        variant="outline"
        onClick={() => navigate("/")}
        className="mb-8 flex items-center gap-2 hover:shadow-lg transition-all duration-300 bg-slate-800/40 text-slate-300 border-slate-700/30 hover:bg-slate-800/60 hover:text-slate-200 backdrop-blur-lg hover:translate-x-1"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Button>
      
      <Card className="max-w-3xl mx-auto shadow-2xl border-slate-700/30 bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-600/30 rounded-3xl">
        <CardHeader className="text-center pb-2 px-8 pt-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 tracking-tight">
            {title}
          </h1>
        </CardHeader>
        <CardContent className="p-8">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export const Profile = () => {
  const authContext = useAuth();
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { authUser } = authContext;
  const { fullname, message, profilepic, username, _id } = authUser;

  return (
    <ProfileLayout title="My Profile">
      <div className="flex flex-col items-center mb-10">
        <div className="relative mb-8 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-75 group-hover:opacity-100 blur-md transition duration-500"></div>
          <div className="relative rounded-full p-1 bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="relative rounded-full overflow-hidden h-40 w-40 ring-4 ring-slate-800">
              <img
                src={profilepic}
                alt={username}
                className="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 rounded-full border-4 border-slate-800 shadow-lg ring-2 ring-emerald-400/50"></div>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3 tracking-tight">{fullname}</h2>
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
          <p className="relative text-slate-300 bg-slate-800/50 px-8 py-2.5 rounded-full text-sm font-medium shadow-xl ring-1 ring-slate-600/30 backdrop-blur-lg">
            @{username}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <ProfileItem label="Username" text={username} icon={<User className="w-5 h-5" />} />
        <ProfileItem label="User ID" text={_id} icon={<UserCheck className="w-5 h-5" />} />
        <ProfileItem label="Status" text={message} icon={<MessageCircle className="w-5 h-5" />} />
      </div>
    </ProfileLayout>
  );
};

export const ProfileSelected = () => {
  const { selectedConversation } = userConversation();
  
  return (
    <ProfileLayout title="User Profile">
      <div className="flex flex-col items-center mb-10">
        <div className="relative mb-8 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-75 group-hover:opacity-100 blur-md transition duration-500"></div>
          <div className="relative rounded-full p-1 bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="relative rounded-full overflow-hidden h-40 w-40 ring-4 ring-slate-800">
              <img
                src={selectedConversation?.profilepic}
                alt={selectedConversation?.username || 'User'}
                className="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 rounded-full border-4 border-slate-800 shadow-lg ring-2 ring-emerald-400/50"></div>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3 tracking-tight">
          {selectedConversation?.fullname || 'Unknown User'}
        </h2>
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
          <p className="relative text-slate-300 bg-slate-800/50 px-8 py-2.5 rounded-full text-sm font-medium shadow-xl ring-1 ring-slate-600/30 backdrop-blur-lg">
            @{selectedConversation?.username || 'unavailable'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <ProfileItem
          label="Username"
          text={selectedConversation?.username || 'Unavailable'}
          icon={<User className="w-5 h-5" />}
        />
        <ProfileItem
          label="User ID"
          text={selectedConversation?._id || 'No ID Available'}
          icon={<UserCheck className="w-5 h-5" />}
        />
        <ProfileItem
          label="Gender"
          text={selectedConversation?.gender || 'No Gender Provided'}
          icon={<Users className="w-5 h-5" />}
        />
      </div>
    </ProfileLayout>
  );
};

export default {
  Profile,
  ProfileSelected
};
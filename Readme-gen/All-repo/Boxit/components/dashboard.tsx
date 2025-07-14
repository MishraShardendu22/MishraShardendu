"use client"

import FileList from "./files"

interface DashboardProps {
  userId: string;
  parentId?: string | null;
}

const Dashboard = ({userId}: DashboardProps) => {


  return (
    <div>
      <FileList userId={userId} />
    </div>
  );
}

export default Dashboard

"use client"
import React from "react";
import { useUser} from "@clerk/clerk-react";
import Image from "next/image";

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image src="/empty.png" height={300} width={300} alt="empty" />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s WorkSpace
      </h2>
    </div>
  );
};

export default Dashboard;


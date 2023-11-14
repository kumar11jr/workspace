"use client"
import React from "react";
import { useUser} from "@clerk/clerk-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
 
const Dashboard = () => {
  const { user } = useUser();
  const create = useMutation(api.document.create);

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image src="/empty.png" height={300} width={300} alt="empty" />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s WorkSpace
      </h2>
      <Button>
      <PlusCircle className="h-4 w-4 mr-2" />
        Create a Note
      </Button>
    </div>
  );
};

export default Dashboard;


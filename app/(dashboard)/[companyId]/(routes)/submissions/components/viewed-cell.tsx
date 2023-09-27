"use client";

import axios from "axios";
import { Mail, MailOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { SubmissionColumn } from "../page";

interface ViewedCellProps {
  data: SubmissionColumn;
}

export const ViewedCell: React.FC<ViewedCellProps> = ({ data }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [isViewed, setIsViewed] = useState(data.viewed);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    setIsViewed((viewed) => !viewed);

    try {
      setIsLoading(true);

      const newSubmission = await axios.put(`/api/submissions/${data.id}`, {
        viewed: !data.viewed,
      });

      setIsViewed(newSubmission.data.viewed);

      toast({
        title: !newSubmission.data.viewed
          ? "Marked as unviewed"
          : "Marked as viewed",
      });
    } catch (error) {
      console.log(error);
      setIsViewed((viewed) => !viewed);
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <Button variant="secondary" disabled={isLoading} onClick={handleOnClick}>
      {isViewed ? (
        <MailOpen className="h-5 w-5 text-gray-500" />
      ) : (
        <Mail className="h-5 w-5 text-yellow-600" />
      )}
    </Button>
  );
};

import { Company } from "@prisma/client";
import axios from "axios";
import { FileEdit, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface CellActionsProps {
  data: Company;
}

export const CellActions: React.FC<CellActionsProps> = ({ data }) => {
  const router = useRouter();
  const { toast } = useToast();

  const editUrl = `/${data.uuid}/edit`;

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/companies/${data.uuid}`);

      toast({
        title: "Company Deleted",
        description: "Company has been deleted",
      });

      router.refresh();
    } catch (error) {
      console.error(error);

      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push(editUrl)}>
          <FileEdit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-400" onClick={handleDelete}>
          <FileEdit className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

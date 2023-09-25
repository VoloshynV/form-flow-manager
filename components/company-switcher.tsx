"use client";

import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { Separator } from "./ui/separator";

interface CompanySwitcherProps {
  items: { value: string; label: string }[];
}

export const CompanySwitcher: React.FC<CompanySwitcherProps> = ({ items }) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);

  const currentCompany = items.find((item) => item.value === params.companyId);

  const onSelect = (company: (typeof items)[0]) => {
    setOpen(false);
    router.push(`/${company.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentCompany?.label || "Select company..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search company..." />
          <CommandEmpty>No company found.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem key={item.value} onSelect={() => onSelect(item)}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentCompany?.value === item.value
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <Separator />
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                setOpen(false);
                router.push(`/${params.companyId}/add`);
              }}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add new company
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Company } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface CompanyFormProps {
  initialData: Company | null;
}

const formSchema = z.object({
  name: z.string().min(3),
  frontendUrl: z.string().url().or(z.literal("")),
  validationFields: z.string().min(3),
});

export const CompanyForm: React.FC<CompanyFormProps> = ({ initialData }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      frontendUrl: "",
      validationFields: "",
    },
  });
  const { handleSubmit, control } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      if (initialData) {
        await axios.put(`/api/companies/${initialData.uuid}`, data);
        toast({
          title: "Company updated",
        });
        router.refresh();
      } else {
        const company = await axios.post("/api/companies", data);
        toast({
          title: "Company created",
        });
        router.refresh();
        router.push(`/${company.data.uuid}`);
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Creating Company</CardTitle>
            <CardDescription>
              Creating new Company for your new site
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Landing Page 1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="frontendUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Frontend URL{" "}
                      <span className="text-xs text-muted-foreground">
                        (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="https://landing.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="validationFields"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Validation Fields</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="name, email, phone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={isLoading} type="submit">
              Submit
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

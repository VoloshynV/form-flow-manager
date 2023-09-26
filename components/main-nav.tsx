"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils";

export const MainNav = () => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      path: `/${params.companyId}/companies`,
      name: "Companies",
    },
    {
      path: `/${params.companyId}/submissions`,
      name: "Submissions",
    },
  ];

  return (
    <nav className="flex items-center gap-x-4">
      <Link
        href={`/${params.companyId}`}
        className="mr-7 font-mono text-2xl font-bold"
      >
        <span className="text-orange-400">Form</span>Flow
      </Link>
      {routes.map((route) => (
        <Link
          key={route.path}
          href={route.path}
          className={cn(
            "text-m hover:text-blue-500",
            pathname === route.path && "text-blue-300",
          )}
        >
          {route.name}
        </Link>
      ))}
    </nav>
  );
};

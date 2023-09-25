"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export const MainNav = () => {
  const params = useParams();

  const routes = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: `/${params.companyId}/companies `,
      name: "Companies",
    },
    {
      path: `/${params.companyId}/submissions `,
      name: "Submissions",
    },
  ];

  return (
    <div className="flex space-x-4">
      {routes.map((route) => (
        <Link
          key={route.path}
          href={route.path}
          className="text-m hover:text-blue-500"
        >
          {route.name}
        </Link>
      ))}
    </div>
  );
};

"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { Container } from "./container";

const routes = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/about",
    name: "About",
  },
];

export const Navigation = () => {
  return (
    <div className="border-b py-4">
      <Container>
        <div className="flex items-center gap-7">
          <Link href="/" className="text-3xl">
            CRM Name
          </Link>
          <div className="flex space-x-4">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className="text-xl hover:text-blue-500"
              >
                {route.name}
              </Link>
            ))}
          </div>
          <div className="ml-auto">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </Container>
    </div>
  );
};

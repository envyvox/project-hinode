"use client";

import { useUserStore } from "@/store/user-store";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function UserProvider({ children }: Props) {
  const { data: session } = useSession();
  const getUser = useUserStore((state) => state.getUser);

  useEffect(() => {
    if (session) {
      getUser(session.user?.email!);
    }
  }, [session, getUser]);

  return children;
}

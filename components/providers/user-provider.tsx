"use client";

import { useUserStore } from "@/store/user-store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const getUser = useUserStore((state) => state.getUser);

  useEffect(() => {
    if (session) {
      getUser(session.user?.email!);
    }
  }, [session]);

  return <>{children}</>;
}

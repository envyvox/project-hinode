"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/user-store";
import { useSession } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: Props) => {
  const { data: session } = useSession();
  const getUser = useUserStore((state) => state.getUser);

  useEffect(() => {
    if (session) {
      getUser(session.user?.email!);
    }
  }, [session, getUser]);

  return children;
};

export default UserProvider;

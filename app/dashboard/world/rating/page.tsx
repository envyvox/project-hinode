"use client";

import { TypographyH3 } from "@/components/typography/h3";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsers } from "@/data-access/user";
import { useDictionaryStore } from "@/store/dictionary-store";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

export default function WorldRating() {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then((users) => setUsers(users));
  }, []);

  return (
    <div className="flex flex-col space-y-3">
      <TypographyH3>
        {dictionary.dashboard.world.rating["table.title"]}
      </TypographyH3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              {dictionary.dashboard.world.rating["table.user.name"]}
            </TableHead>
            <TableHead>
              {dictionary.dashboard.world.rating["table.user.level"]}
            </TableHead>
            <TableHead>
              {dictionary.dashboard.world.rating["table.user.xp"]}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.level}</TableCell>
              <TableCell>{user.xp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

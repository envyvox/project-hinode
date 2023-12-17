"use client";

import { User } from "@prisma/client";
import { useDictionaryStore } from "@/store/dictionary-store";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TypographyH3 from "./typography/h3";
import Image from "next/image";

type Props = {
  users: User[];
};

const RatingTable = ({ users }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);

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
              <TableCell className="flex items-center gap-2">
                <Image
                  className="h-6 w-6"
                  width={27}
                  height={27}
                  src={`/title/${user.title}.png`}
                  alt={user.title}
                />
                <span>{user.title}</span>
                <span>{user.name}</span>
              </TableCell>
              <TableCell>{user.level}</TableCell>
              <TableCell>{user.xp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RatingTable;

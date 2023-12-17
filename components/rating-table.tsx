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
import TypographyMuted from "./typography/muted";
import displayLevel from "@/util/display-level";
import displayPosition from "@/util/display-position";

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
              {dictionary.dashboard.world.rating["table.user.position"]}
            </TableHead>
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
          {users.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-2 text-center">
                  {displayPosition(index + 1)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Image
                    className="h-6 w-6"
                    width={27}
                    height={27}
                    src={`/title/${user.title}.png`}
                    alt={user.title}
                  />
                  <TypographyMuted>{user.title}</TypographyMuted>
                  <span>{user.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {displayLevel(user.level)}
                  {user.level}
                </div>
              </TableCell>
              <TableCell>{user.xp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RatingTable;

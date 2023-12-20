import React from "react";
import TypographyMuted from "./typography/muted";

type Props = {
  label: string;
};

const UserTitlesEmpty = ({ label }: Props) => {
  return (
    <div className="flex flex-col justify-center gap-1 rounded-lg border bg-card p-5">
      <TypographyMuted>{label}</TypographyMuted>
    </div>
  );
};

export default UserTitlesEmpty;

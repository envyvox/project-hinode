import React from "react";
import TypographyMuted from "../typography/muted";

type Props = {
  label: string;
};

const InventoryEmpty = ({ label }: Props) => {
  return (
    <div className="flex flex-col justify-center gap-1 rounded-lg border p-2">
      <TypographyMuted>{label}</TypographyMuted>
    </div>
  );
};

export default InventoryEmpty;

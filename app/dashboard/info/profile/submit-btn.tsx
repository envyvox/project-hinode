import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const status = useFormStatus();

  return (
    <Button disabled={status.pending} type="submit">
      Save
    </Button>
  );
}

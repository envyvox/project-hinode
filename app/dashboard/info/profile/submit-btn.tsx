import { Button } from "@/components/ui/button";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const status = useFormStatus();

  return (
    <Button disabled={status.pending} type="submit">
      {dictionary.dashboard["info.profile.save"]}
    </Button>
  );
}

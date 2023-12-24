import { cn } from "@/lib/utils";

import { ScrollArea } from "./ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

type Props = {
  trigger: React.ReactNode;
  title: string;
  description: string;
  content: React.ReactNode;
  scrollAreaClassName?: string;
};

const FullscreenSheet = ({
  trigger,
  title,
  description,
  content,
  scrollAreaClassName = "h-[85vh]",
}: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-full">
        <div className="container flex flex-col gap-5">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          <ScrollArea className={cn("pr-4", scrollAreaClassName)}>
            {content}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FullscreenSheet;

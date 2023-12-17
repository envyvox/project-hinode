import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";

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
          <ScrollArea className={scrollAreaClassName}>{content}</ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FullscreenSheet;

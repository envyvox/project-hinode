import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDictionaryStore } from "@/store/dictionary-store";
import { HelpCircle } from "lucide-react";
import formatString from "@/util/format-string";
import { Icons } from "@/components/icons";

const CasinoBetsTooltip = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const formattedStrings = {
    caseLose: formatString(
      dictionary.dashboard[
        "dashboard.actions.capital.casino.bet.tooltip.case-lose"
      ],
      <Icons.Ien />,
    ),
    caseX2: formatString(
      dictionary.dashboard[
        "dashboard.actions.capital.casino.bet.tooltip.case-x2"
      ],
      <Icons.Ien />,
    ),
    caseX4: formatString(
      dictionary.dashboard[
        "dashboard.actions.capital.casino.bet.tooltip.case-x4"
      ],
      <Icons.Ien />,
    ),
    caseX10: formatString(
      dictionary.dashboard[
        "dashboard.actions.capital.casino.bet.tooltip.case-x10"
      ],
      <Icons.Ien />,
    ),
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <HelpCircle className="h-6 w-6" />
        </TooltipTrigger>
        <TooltipContent className="tooltip-content text-sm text-muted-foreground">
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>{formattedStrings.caseLose}</li>
            <li>{formattedStrings.caseX2}</li>
            <li>{formattedStrings.caseX4}</li>
            <li>{formattedStrings.caseX10}</li>
          </ul>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CasinoBetsTooltip;

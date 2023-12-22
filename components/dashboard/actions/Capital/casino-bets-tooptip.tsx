import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDictionaryStore } from "@/store/dictionary-store";
import { HelpCircle } from "lucide-react";
import { IconIen } from "@/components/icons";
import formatString from "@/util/format-string";

const CasinoBetsTooltip = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const formattedStrings = {
    caseLose: formatString(
      dictionary.dashboard[
        "dashboard.actions.capital.casino.bet.tooltip.case-lose"
      ],
      <IconIen />,
    ),
    caseX2: formatString(
      dictionary.dashboard[
        "dashboard.actions.capital.casino.bet.tooltip.case-x2"
      ],
      <IconIen />,
    ),
    caseX4: formatString(
      dictionary.dashboard[
        "dashboard.actions.capital.casino.bet.tooltip.case-x4"
      ],
      <IconIen />,
    ),
    caseX10: formatString(
      dictionary.dashboard[
        "dashboard.actions.capital.casino.bet.tooltip.case-x10"
      ],
      <IconIen />,
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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CasinoBets = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ставки</CardTitle>
        <CardDescription>Тут обязательно что-то появится...</CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[100px]" />
      </CardContent>
    </Card>
  );
};

export default CasinoBets;

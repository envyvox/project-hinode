import { TypographyP } from "@/components/typography/p";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserStore } from "@/store/user-store";
import Image from "next/image";

export default function DashboardAboutLocation() {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const user = useUserStore((state) => state.user);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {/* @ts-ignore: Implicit any */}
          {dictionary.location[user.location]}
        </CardTitle>
        <CardDescription>
          <Image
            src={`/location/${user.location}.png`}
            width={1100}
            height={150}
            alt={user.location}
            priority
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="leading-7"
          dangerouslySetInnerHTML={
            /* @ts-ignore: Implicit any */
            { __html: dictionary.location[user.location + ".description"] }
          }
        />
      </CardContent>
    </Card>
  );
}

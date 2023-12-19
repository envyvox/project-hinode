"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useWorldState from "@/hooks/use-world-state";
import { useDictionaryStore } from "@/store/dictionary-store";
import formatString from "@/util/format-string";
import { TimesDay } from "@prisma/client";
import React from "react";

const WorldIntoPage = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const worldState = useWorldState();

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <Card className="flex flex-col justify-between md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>
            {formatString(
              dictionary.dashboard["world.info.season.title"],
              dictionary.season[worldState.season],
            )}
          </CardTitle>
          <CardDescription>
            {dictionary.dashboard["world.info.season.description"]}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* TODO: Replace with Image */}
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
      <Card className="flex flex-col justify-between">
        <CardHeader>
          <CardTitle>
            {formatString(
              dictionary.dashboard["world.info.timesDay.title"],
              dictionary.timesDay[TimesDay.Day],
            )}
          </CardTitle>
          <CardDescription>
            {dictionary.dashboard["world.info.timesDay.description"]}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* TODO: Replace with Image */}
          <Skeleton className="h-[100px] w-full" />
        </CardContent>
      </Card>
      <Card className="flex flex-col justify-between">
        <CardHeader>
          <CardTitle>
            {formatString(
              dictionary.dashboard["world.info.weatherToday.title"],
              dictionary.weather[worldState.weatherToday],
            )}
          </CardTitle>
          <CardDescription>
            {dictionary.dashboard["world.info.weatherToday.description"]}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* TODO: Replace with Image */}
          <Skeleton className="h-[100px] w-full" />
        </CardContent>
      </Card>
      <Card className="flex flex-col justify-between">
        <CardHeader>
          <CardTitle>
            {formatString(
              dictionary.dashboard["world.info.weatherTomorrow.title"],
              dictionary.weather[worldState.weatherTomorrow],
            )}
          </CardTitle>
          <CardDescription>
            {dictionary.dashboard["world.info.weatherTomorrow.description"]}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* TODO: Replace with Image */}
          <Skeleton className="h-[100px] w-full" />
        </CardContent>
      </Card>
    </div>
  );
};

export default WorldIntoPage;

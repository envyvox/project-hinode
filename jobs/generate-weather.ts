import {
  getWorldState,
  updateWeather,
} from "@/services/data-access/world-state";
import { client } from "@/trigger";
import getRandomNumberBetween from "@/util/get-random-number";
import { Weather } from "@prisma/client";
import { cronTrigger } from "@trigger.dev/sdk";

client.defineJob({
  id: "generate-weather",
  name: "Generate Weather",
  version: "0.0.1",
  trigger: cronTrigger({ cron: "0 0 * * *" }),
  run: async (payload, io, cxt) => {
    const worldState = await getWorldState();
    const chance = getRandomNumberBetween(1, 101);

    const newWeatherToday = worldState.weatherTomorrow;
    const newWeatherTomorrow =
      worldState.weatherTomorrow === Weather.Clear
        ? chance + (worldState.weatherToday === Weather.Clear ? 10 : 20) > 50
          ? Weather.Rain
          : Weather.Clear
        : chance + (worldState.weatherToday === Weather.Rain ? 10 : 20) > 50
          ? Weather.Clear
          : Weather.Rain;

    await io.runTask("update-weather", async () => {
      await updateWeather(newWeatherToday, newWeatherTomorrow);
    });
  },
});

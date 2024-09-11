using System;
using StardewValley;
using StardewValley.Extensions;

namespace SeedFinding.Routines
{
    public class Weather
    {
        public enum WeatherType
        {
            Sunny,
            Rain,
            Storm,
            Snow,
            GreenRain
        }

        public static WeatherType getWeather(int day, int gameId)
        {
            if (day == 1 || day == 2 || day == 4 || day % 28 == 1)
            {
                return WeatherType.Sunny;
            }

            if (day == 3)
            {
                return WeatherType.Rain;
            }

            // Off by one error forcing day 5 to be sunny
            if (day == 5)
            {
                return WeatherType.Sunny;
            }

            if (Utility.isGreenRainDay(day, gameId))
            {
                return WeatherType.GreenRain;
            }

            int dayOfMonth = Utility.getDayOfMonthFromDay(day);

            Season season = Utility.getSeasonFromDay(day);
            Random random;
            switch (season)
            {
                case Season.Spring:
                    if (dayOfMonth == 13 || dayOfMonth == 24)
                    {
                        return WeatherType.Sunny;
                    }
                    if (dayOfMonth == 2 || dayOfMonth == 3 || dayOfMonth == 5)
                    {
                        return WeatherType.Sunny;
                    }
                    if (dayOfMonth == 4)
                    {
                        return WeatherType.Rain;
                    }
                    random = Utility.CreateRandom(
                        Game1.hash.GetDeterministicHashCode("location_weather"),
                        gameId,
                        day - 1
                    );
                    if (random.NextDouble() < 0.183)
                    {
                        return WeatherType.Rain;
                    }
                    break;
                case Season.Fall:
                    if (dayOfMonth == 16 || dayOfMonth == 27)
                    {
                        return WeatherType.Sunny;
                    }
                    random = Utility.CreateRandom(
                        Game1.hash.GetDeterministicHashCode("location_weather"),
                        gameId,
                        day - 1
                    );
                    if (random.NextDouble() < 0.183)
                    {
                        return WeatherType.Rain;
                    }
                    break;
                case Season.Summer:
                    if (dayOfMonth % 13 == 0)
                    {
                        return WeatherType.Storm;
                    }
                    if (dayOfMonth == 11 || dayOfMonth == 28)
                    {
                        return WeatherType.Sunny;
                    }

                    random = Utility.CreateDaySaveRandom(
                        day - 1,
                        gameId,
                        Game1.hash.GetDeterministicHashCode("summer_rain_chance")
                    );
                    float chanceToRain =
                        0.12f + (float)Utility.getDayOfMonthFromDay(day - 1) * 0.003f;
                    if (random.NextBool(chanceToRain))
                    {
                        return WeatherType.Rain;
                    }
                    break;
                default:
                    break;
            }

            return WeatherType.Sunny;
        }
    }
}

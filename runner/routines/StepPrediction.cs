using System;
using System.Collections.Generic;
using StardewValley;

namespace SeedFinding.Routines
{
    public struct StepResult
    {
        public double DailyLuck;
        public int Dish;
        public int DishAmount;
        public string Gifter;
        public int HeartsRequired;
        public int Day;
        public int Steps;

        public StepResult(
            double luck,
            int dish,
            int amount,
            string gifter,
            int hearts,
            int day,
            int steps
        )
        {
            DailyLuck = luck;
            Dish = dish;
            DishAmount = amount;
            Gifter = gifter;
            HeartsRequired = hearts;
            Day = day;
            Steps = steps;
        }

        public override string ToString()
        {
            return string.Format(
                "DailyLuck: {0}, Dish: {1} {2}, Gifter:{3}, Hearts:{4}",
                DailyLuck,
                Item.Get(Dish.ToString()).Name,
                DishAmount,
                Gifter,
                HeartsRequired
            );
        }
    }

    public class StepPredictions
    {
        private static List<string> List = new();

        public static bool IsForbiddenDishOfTheDay(string id)
        {
            switch (id)
            {
                case "346":
                case "196":
                case "197":
                case "216":
                case "224":
                case "206":
                case "395":
                    return true;
                default:
                    return false;
            }
        }

        public static (int, int) DishOfTheDay(Random random)
        {
            int itemId;
            do
            {
                itemId = random.Next(194, 240);
            } while (IsForbiddenDishOfTheDay(itemId.ToString()));
            int count = random.Next(1, 4 + ((random.NextDouble() < 0.08) ? 10 : 0));
            random.NextDouble();

            return (itemId, count);
        }

        public static StepResult Predict(
            int gameid,
            int day,
            int steps,
            List<string> friends,
            int numberMachinesProcessing = 0
        )
        {
            int seed = (int)(gameid / 100) + (int)(day * 10) + 1 + steps;
            Random random = Utility.CreateRandom(seed);

            for (int k = 0; k < Utility.getDayOfMonthFromDay(day); k++)
            {
                random.Next();
            }

            (int dish, int dishAmount) = DishOfTheDay(random);

            for (int index = 0; index < numberMachinesProcessing; index++)
                random.Next();

            if (friends == null)
            {
                friends = new() { "Lewis", "Robin" };
            }

            string friend = friends[random.Next(friends.Count)];
            int amountRequired = random.Next(10) + 1;

            random.Next();

            double dailyLuck = Math.Min(
                0.10000000149011612,
                (double)random.Next(-100, 101) / 1000.0
            );

            StepResult result =
                new()
                {
                    DailyLuck = dailyLuck,
                    Dish = dish,
                    DishAmount = dishAmount,
                    Day = day,
                    Steps = steps,
                    Gifter = friend,
                    HeartsRequired = amountRequired
                };
            return result;
        }
    }
}

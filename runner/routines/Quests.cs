using System;
using System.Collections.Generic;
using System.Linq;
using StardewValley;

namespace SeedFinding
{
    public class Quests
    {
        public enum QuestType
        {
            ResourceCollectionQuest,
            SlayMonsterQuest,
            FishingQuest,
            SocializeQuest,
            ItemDeliveryQuest,
            None

        }
        public struct QuestResults
        {
            public string Person;
            public string Id;
            public QuestType Type;
            public QuestResults(string person, string id, QuestType type = QuestType.None)
            {
                
                Person = person;
                Id = id;
                Type = type;
            }
            public override string ToString()
            {
                return string.Format("{0}: {1}", Item.Get(Id).Name, Person);
            }
        }

        public static QuestType GetQuestType(int day, int gameId, bool hasSocialiseQuest = true, int mineLevel = 0)
        {
            if (day <= 1)
            {
                return QuestType.None;
            }
            double d = Utility.CreateDaySaveRandom(day, gameId, 100.0, day * 777).NextDouble();
            if (d < 0.08)
            {
                return QuestType.ResourceCollectionQuest;
            }
            if (d < 0.2 && mineLevel > 0 && day > 5)
            {
                return QuestType.SlayMonsterQuest;
            }
            if (d < 0.5)
            {
                return QuestType.None;
            }
            if (d < 0.6)
            {
                return QuestType.FishingQuest;
            }
            if (d < 0.66 && day % 7 == 1)
            {
                if (!hasSocialiseQuest)
                {
                    return QuestType.SocializeQuest;
                }
                return QuestType.ItemDeliveryQuest;
            }
            return QuestType.ItemDeliveryQuest;
        }
        public static QuestResults GetItemDeliveryQuest(int day, int gameId, int cookingRecipesKnown, List<string> persons, bool hasFurnace = false, bool hasDesert = false, int mines = 0, bool hasSocialiseQuest = true)
        {
            QuestType questType = GetQuestType(day, gameId, hasSocialiseQuest, mines);
            if (questType != QuestType.ItemDeliveryQuest)
            {
                return new QuestResults("", "");
            }
            Random random = Utility.CreateRandom(gameId, day);

            int resource;
            int dayOfMonth = (day - 1) % 28 + 1;
            int year = (day - 1) / (28 * 4) + 1;

            string target = "";
            string item = "";

            if (persons.Count == 0)
                return new QuestResults("", "");

            target = persons[random.Next(persons.Count)];

            Season season = Utility.ConvertDaysToSeason(day);
            if (season != Season.Winter && random.NextDouble() < 0.15)
            {
                List<int> crops = Utility.possibleCropsAtThisTime(season, (dayOfMonth <= 7) ? true : false, year, hasDesert);
                resource = crops.ElementAt(random.Next(crops.Count));
            }
            else
            {
                resource = Utility.getRandomItemFromSeason(season, 1000, true, cookingRecipesKnown, gameId, day, true, hasFurnace, hasDesert, mines);
                if (resource == -5)
                {
                    resource = 176;
                }
                if (resource == -6)
                {
                    resource = 184;
                }

            }
            item = resource.ToString();

            return new QuestResults(target, item, questType);
        }
        public static int GetItemDeliveryQuestItem(int day, int gameId, int cookingRecipesKnown, bool hasFurnace = false, bool hasDesert = false, int mines = 0)
        {
            Random random = Utility.CreateRandom(gameId, day);
            
            int resource;
            int dayOfMonth = (day - 1) % 28 + 1;
            int year = (day - 1) / (28 * 4) + 1;

            // Choose person
            random.NextDouble();

            Season season = Utility.ConvertDaysToSeason(day);
            if (!(season == Season.Winter) && random.NextDouble() < 0.15)
            {
                List<int> crops = Utility.possibleCropsAtThisTime(season, (dayOfMonth <= 7) ? true : false, year, hasDesert);
                resource = crops.ElementAt(random.Next(crops.Count));
            }
            else
            {
               
                resource = Utility.GetRandomItemFromSeason(season, 1000, true, cookingRecipesKnown, gameId, day, true, hasFurnace, hasDesert, mines);
                if (resource == -5)
                {
                    resource = 176;
                }
                if (resource == -6)
                {
                    resource = 184;
                }

            }
            return resource;
        }

        
    }
}
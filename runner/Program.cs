using System;
using System.IO;
using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Amazon.SimpleSystemsManagement;
using Amazon.SimpleSystemsManagement.Model;
using Newtonsoft.Json;
using SeedFinding.Models;
using SeedFinding.Routines;
using StardewValley;

namespace SeedFinding
{
    class Program
    {
        public static bool CheckRequirements(JobRequirements req, int seed)
        {
            Game1.UseLegacyRandom = req.UseLegacyRandom;
            if (req.Weather != null)
            {
                for (int i = 0; i < req.Weather.Count; i++)
                {
                    var weather = req.Weather[i];
                    var result = Weather.getWeather(weather.Day, seed);
                    // Console.WriteLine("Day: {0}, Weather: {1}", weather.Day, result);
                    if (result != weather.Weather)
                    {
                        return false;
                    }
                }
            }
            
            if (req.NightEvents != null)
            {
                for (int i = 0; i < req.NightEvents.Count; i++)
                {
                    var nightEvent = req.NightEvents[i];
                    var result = NightEvent.getEvent(nightEvent.Day, seed);
                    // Console.WriteLine("Day: {0}, Event: {1}", nightEvent.Day, result);
                    if (result != nightEvent.Event)
                    {
                        return false;
                    }
                }
            }

            if (req.ItemQuests != null)
            {
                for (int i = 0; i < req.ItemQuests.Count; i++)
                {
                    var quest = req.ItemQuests[i];
                    var result = Quests.GetItemDeliveryQuest(
                        quest.Day,
                        seed,
                        quest.CookingRecipesKnown,
                        quest.PeopleKnown,
                        quest.HasFurnace,
                        quest.HasDesert,
                        quest.DeepestMineLevel,
                        quest.HasSocializeQuest
                    );
                    // Console.WriteLine("Day: {0}, Quest: {1} {2}", quest.Day, result.Person, result.Id);
                    if (result.Type == Quests.QuestType.None)
                    {
                        return false;
                    }
                    if (result.Person != quest.Person || (quest.Id != "" && result.Id != quest.Id))
                    {
                        return false;
                    }
                }
            }
            return true;
        }

        static async void TestAWS()
        {
            var ddb = await Services.DynamoDB.GetClient();
            var res = await ddb.DescribeTableAsync();
            foreach (var key in res.Table.KeySchema)
            {
                Console.WriteLine("Key: {0}", key.AttributeName);
            }

            var job = await ddb.GetJob("144903467981340673", "45cf821f");
            Console.WriteLine("Job: {0} ", job);
            var status = job.Status;
            // update the state
            job.Status = "completed";
            await ddb.UpdateJob(job);
            job = await ddb.GetJob("144903467981340673", "45cf821f");
            Console.WriteLine("Job: {0} ", job);
            // reset
            job.Status = status;
            await ddb.UpdateJob(job);
        }

        static async Task Main(string[] args)
        {
            Console.WriteLine("Hello, World!");
            
            JobRequirements req = JsonConvert.DeserializeObject<JobRequirements>(
                File.ReadAllText("data/example.json")
            );
            // CheckRequirements(req, req.StartSeed);
            for (int seed = req.StartSeed; seed <= req.EndSeed; seed++)
            {
                if (CheckRequirements(req, seed))
                {
                    Console.WriteLine($"Seed {seed} meets requirements");
                }
            }
        }
    }
}

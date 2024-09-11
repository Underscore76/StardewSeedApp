using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        static async Task Main(string[] args)
        {
            var userId = Environment.GetEnvironmentVariable("USER_ID");
            if (userId == null)
                userId = "144903467981340673";

            var jobId = Environment.GetEnvironmentVariable("JOB_ID");
            if (jobId == null)
                jobId = "8ade586a";

            Console.WriteLine($"Pulling job {jobId} for user {userId}");
            var ddb = await Services.DynamoDB.GetClient();
            var job = await ddb.GetJob(userId, jobId);

            Console.WriteLine(JsonConvert.SerializeObject(job, Formatting.Indented));

            if (job.Status != "pending")
            {
                Console.WriteLine("Job is not pending, skipping");
                return;
            }

            // update the status to running
            await ddb.SetJobRunning(job);

            string envNumSeeds = Environment.GetEnvironmentVariable("MAX_VALID_SEEDS");
            int maxValidSeeds = envNumSeeds != null ? int.Parse(envNumSeeds) : 100;

            // run the parallel job
            var req = job.Payload;
            int blockSize = 1 << 12;
            var bag = new ConcurrentBag<int>();
            var partioner = Partitioner.Create(req.StartSeed, req.EndSeed, blockSize);
            Parallel.ForEach(
                partioner,
                (range, loopState) =>
                {
                    for (int seed = range.Item1; seed < range.Item2; seed++)
                    {
                        if (CheckRequirements(req, seed))
                        {
                            bag.Add(seed);

                            Console.WriteLine(seed);
                        }

                        // our search wasn't that specific, let's just bail because we have enough seeds
                        if (bag.Count >= maxValidSeeds)
                        {
                            loopState.Stop();
                        }
                    }
                }
            );
            // aggregate the results
            List<int> validSeeds = bag.ToList();
            await ddb.SetJobComplete(job, validSeeds);
        }
    }
}

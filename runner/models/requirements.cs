using System;
using System.Collections.Generic;
using Amazon.DynamoDBv2.Model;
using Newtonsoft.Json;
using SeedFinding.Routines;

namespace SeedFinding.Models
{
    public class JobRequirements
    {
        [JsonProperty("legacy_rng")]
        public bool UseLegacyRandom;

        [JsonProperty("start_seed")]
        public int StartSeed;

        [JsonProperty("end_seed")]
        public int EndSeed;

        // on this day, what is the weather
        [JsonProperty("weather")]
        public List<WeatherRequirement> Weather;

        // during the night after this day, this event should happen
        [JsonProperty("night_event")]
        public List<NightEventRequirement> NightEvents;

        [JsonProperty("item_quest")]
        public List<ItemQuestRequirement> ItemQuests;

        public JobRequirements()
        {
            Weather = new List<WeatherRequirement>();
            NightEvents = new List<NightEventRequirement>();
            ItemQuests = new List<ItemQuestRequirement>();
        }

        public JobRequirements(Dictionary<string, AttributeValue> payload)
        {
            UseLegacyRandom = payload["legacy_rng"].BOOL;
            StartSeed = int.Parse(payload["start_seed"].N);
            EndSeed = int.Parse(payload["end_seed"].N);
            Weather = new List<WeatherRequirement>();
            NightEvents = new List<NightEventRequirement>();
            ItemQuests = new List<ItemQuestRequirement>();
            payload["weather"].L.ForEach(w => Weather.Add(new WeatherRequirement(w.M)));
            payload["night_event"].L.ForEach(n => NightEvents.Add(new NightEventRequirement(n.M)));
            payload["item_quest"].L.ForEach(i => ItemQuests.Add(new ItemQuestRequirement(i.M)));
        }

        public override string ToString()
        {
            return $"JobRequirements: {Weather.Count} weather, {NightEvents.Count} night events, {ItemQuests.Count} item quests";
        }
    }

    public class WeatherRequirement
    {
        [JsonProperty("day")]
        public int Day;

        [JsonProperty("weather")]
        public Weather.WeatherType Weather;

        public WeatherRequirement() { }

        public WeatherRequirement(Dictionary<string, AttributeValue> payload)
        {
            Day = int.Parse(payload["day"].N);
            Enum.TryParse(payload["weather"].S, out Weather);
        }
    }

    public class NightEventRequirement
    {
        [JsonProperty("day")]
        public int Day;

        [JsonProperty("event")]
        public NightEvent.Event Event = NightEvent.Event.None;

        public NightEventRequirement() { }

        public NightEventRequirement(Dictionary<string, AttributeValue> payload)
        {
            Day = int.Parse(payload["day"].N);
            Enum.TryParse(payload["event"].S, out Event);
        }
    }

    public class ItemQuestRequirement
    {
        [JsonProperty("day")]
        public int Day;

        [JsonProperty("person")]
        public string Person;

        [JsonProperty("id")]
        public string Id = "";

        [JsonProperty("people_known")]
        public List<string> PeopleKnown;

        [JsonProperty("has_furnace")]
        public bool HasFurnace = false;

        [JsonProperty("has_desert")]
        public bool HasDesert = false;

        [JsonProperty("mine_level")]
        public int DeepestMineLevel = 0;

        [JsonProperty("has_socialize_quest")]
        public bool HasSocializeQuest = true;

        [JsonProperty("cooking_recipes_known")]
        public int CookingRecipesKnown = 1;

        public ItemQuestRequirement() { }

        public ItemQuestRequirement(Dictionary<string, AttributeValue> payload)
        {
            Day = int.Parse(payload["day"].N);
            Person = payload["person"].S;
            Id = payload["id"].S;
            PeopleKnown = new List<string>();
            payload["people_known"].L.ForEach(p => PeopleKnown.Add(p.S));
            HasFurnace = payload["has_furnace"].BOOL;
            HasDesert = payload["has_desert"].BOOL;
            if (!int.TryParse(payload["mine_level"].N, out DeepestMineLevel))
            {
                CookingRecipesKnown = 1;
            }
            HasSocializeQuest = payload["has_socialize_quest"].BOOL;
            if (!int.TryParse(payload["cooking_recipes_known"].N, out CookingRecipesKnown))
            {
                CookingRecipesKnown = 1;
            }
        }
    }
}

/*
public double DailyLuck;
public int Dish;
public int DishAmount;
public string Gifter;
public int HeartsRequired;
public int Day;
public int Steps;
*/

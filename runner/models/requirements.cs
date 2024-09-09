using System.Collections.Generic;
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
        [JsonProperty("night_events")]
        public List<NightEventRequirement> NightEvents;

        [JsonProperty("item_quests")]    
        public List<ItemQuestRequirement> ItemQuests;
    }

    public class WeatherRequirement
    {
        [JsonProperty("day")]
        public int Day;

        [JsonProperty("weather")]
        public Weather.WeatherType Weather;
    }

    public class NightEventRequirement
    {
        [JsonProperty("day")]
        public int Day;

        [JsonProperty("event")]
        public NightEvent.Event Event;
    }

    public class ItemQuestRequirement
    {
        [JsonProperty("day")]
        public int Day;

        [JsonProperty("person")]
        public string Person;

        [JsonProperty("id")]
        public string Id = "";

        [JsonProperty("known")]
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
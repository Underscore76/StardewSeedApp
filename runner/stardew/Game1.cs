using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using StardewValley.Enums;
using StardewValley.GameData;
using StardewValley.GameData.Locations;
using StardewValley.Hashing;

namespace StardewValley
{
    public static class Game1
    {
        public static bool UseLegacyRandom = true;
        public static ulong uniqueIDForThisGame = 0;
        public static uint DaysPlayed = 0;
        public static IHashUtility hash = new HashUtility();
		public static float DailyLuck = 0.0f;
		public static Season season = Season.Spring;
		public static bool archaeologyEnchant = false;
		public static bool magnifyingGlass = false;
		public static bool QiBeansActive = false;
		public static string location = "";

		public static Dictionary<string, LocationData> locations = JsonConvert.DeserializeObject<Dictionary<string, LocationData>>(File.ReadAllText($@"data/Locations.json"));
	}
}
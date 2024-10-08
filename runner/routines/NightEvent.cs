using System;
using StardewValley;

namespace SeedFinding.Routines
{
    public class NightEvent
    {
        public enum Event
        {
            None,
            Fairy,
            Witch,
            Meteor,
            StoneOwl,
            StrangeCapsule,
            WindStorm
        }

        public static Event getEvent(
            int day,
            int gameID,
            bool pantryComplete = false,
            bool raccoonsValid = false,
            bool hasFairyRose = false,
            bool capsuleValid = false
        )
        {
            if (day == 31)
            {
                return Event.None;
            }
            Random random = Utility.CreateDaySaveRandom(day, gameID);
            for (int i = 0; i < 10; i++)
            {
                random.NextDouble();
            }

            if (pantryComplete && random.NextDouble() < 0.1 && raccoonsValid)
            {
                return Event.WindStorm;
            }

            if (random.NextDouble() < 0.01 + (hasFairyRose ? 0.007 : 0.0) && day % 28 != 1) // && !Game1.currentSeason.Equals("winter"))
            {
                return Event.Fairy;
            }
            if (random.NextDouble() < 0.01 && day > 20)
            {
                return Event.Witch;
            }
            if (random.NextDouble() < 0.01 && day > 5)
            {
                return Event.Meteor;
            }
            if (random.NextDouble() < 0.005)
            {
                return Event.StoneOwl;
            }
            if (random.NextDouble() < 0.008 && day > 28 * 4 && capsuleValid) // && Game1.year > 1 && !Game1.MasterPlayer.mailReceived.Contains("Got_Capsule"))
            {
                return Event.StrangeCapsule;
            }

            return Event.None;
        }
    }
}

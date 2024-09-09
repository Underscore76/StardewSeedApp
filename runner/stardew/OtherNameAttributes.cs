using System;

namespace StardewValley
{
    public class OtherNamesAttribute : Attribute
    {
        /// <summary>The alternate names for the method.</summary>
        public string[] Aliases { get; }

        /// <summary>Construct an instance.</summary>
        /// <param name="aliases">The alternate names for the method.</param>
        public OtherNamesAttribute(params string[] aliases)
        {
            this.Aliases = aliases;
        }
    }
}
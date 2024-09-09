namespace StardewValley.Hashing
{
    public interface IHashUtility
    {
        /// <summary>Get a deterministic hash code for a string.</summary>
        /// <param name="value">The string value to hash.</param>
        int GetDeterministicHashCode(string value);

        /// <summary>Get a deterministic hash code for a set of values.</summary>
        /// <param name="values">The values to hash.</param>
        int GetDeterministicHashCode(params int[] values);
    }
}
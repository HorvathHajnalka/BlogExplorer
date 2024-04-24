using System.Security.Cryptography;

namespace Server.Helpers
{
    // Class responsible for hashing and verifying passwords
    public class PasswordHasher
    {
        // A cryptographic generator to generate the salt (random number)
        private static RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();


        private static readonly int SaltSize = 16; // 16 bytes will be used for the salt
        private static readonly int HashSize = 20; // SHA-1 hash size (160 bits or 20 bytes)
        private static readonly int Iterations = 10000; 

        // Method to hash a password
        public static string HashPassword(string password)
        {
            // Generate a random salt
            byte[] salt;
            rng.GetBytes(salt = new byte[SaltSize]); // Fill the byte array with a random salt

            // Use PBKDF2 algorithm to generate the hash
            var key = new Rfc2898DeriveBytes(password, salt, Iterations);
            var hash = key.GetBytes(HashSize); // The actual hash

            // Combine salt and hash for storage
            var hashBytes = new byte[SaltSize + HashSize];
            Array.Copy(salt, 0, hashBytes, 0, SaltSize); // Copy salt to hashBytes
            Array.Copy(hash, 0, hashBytes, SaltSize, HashSize); // Copy hash to hashBytes after the salt

            // Convert combined salt+hash to base64 for easier storage
            var base64Hash = Convert.ToBase64String(hashBytes);

            return base64Hash;
        }

        // Method to verify a password against a stored hash
        public static bool VerifyPassword(string password, string base64Hash)
        {
            // Extract bytes from base64 stored hash
            var hashBytes = Convert.FromBase64String(base64Hash);

            // Extract the salt from the stored hash
            var salt = new byte[SaltSize];
            Array.Copy(hashBytes, 0, salt, 0, SaltSize); // Copy salt from stored hashBytes

            // Generate the hash of the provided password using the extracted salt
            var key = new Rfc2898DeriveBytes(password, salt, Iterations);
            byte[] hash = key.GetBytes(HashSize); // The actual hash of the provided password

            // Compare computed hash with the stored hash
            for (int i = 0; i < HashSize; i++)
            {
                if (hashBytes[i + SaltSize] != hash[i]) // Check each byte
                {
                    return false; // If mismatch, return false
                }
            }
            return true; // If all bytes match, return true
        }
    }
}

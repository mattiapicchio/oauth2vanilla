import { randomBytes } from 'crypto'

// Function to generate a random state value
export function generateCryptoRandomValue(): string {
  const randomValues = randomBytes(16) // Generate 16 random bytes

  // Base64 encode the random bytes
  return randomValues.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

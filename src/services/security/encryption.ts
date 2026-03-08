import crypto from 'crypto';

// The key should be a 32-byte string (256 bits). If it's not provided or is the wrong length, 
// we'll pad or truncate it to 32 bytes for the AES-256-CBC algorithm.
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-secret-key-must-be-changed';

// Ensure the key is exactly 32 bytes
const getKey = () => {
  const hash = crypto.createHash('sha256');
  hash.update(ENCRYPTION_KEY);
  return hash.digest();
};

const IV_LENGTH = 16; // For AES, this is always 16

export function encrypt(text: string): string {
  if (!text) return text;
  
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', getKey(), iv);
  
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(text: string): string {
  if (!text) return text;
  
  try {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift()!, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    
    const decipher = crypto.createDecipheriv('aes-256-cbc', getKey(), iv);
    
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    
    return decrypted.toString();
  } catch (error) {
    console.error('Decryption failed', error);
    throw new Error('Failed to decrypt value');
  }
}

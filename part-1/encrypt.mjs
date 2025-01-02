import _sodium from 'libsodium-wrappers';
import fs from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();

await (async () => {
  await _sodium.ready;
  const sodium = _sodium;

  const keyPair = sodium.crypto_box_keypair();
  const privateKey = keyPair.privateKey;
  const publicKey = keyPair.publicKey;

  const recipientPublicKey = sodium.from_hex(process.env.RECIPIENT_PUBLIC_KEY);

  const message = {
    "name": "Azrul Hakimi bin Azmi",
    "email": "azrulkimi00@gmail.com",
    "role": "Front-End Developer",
    "asking-salary": "MYR 5,000",
    "can-start": "2 months from now",
    "myself": "I'm always eager to learn and embrace new challenges."
  };

  const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);
  const ciphertext = sodium.crypto_box_easy(
    sodium.from_string(JSON.stringify(message)), 
    nonce,
    recipientPublicKey,
    privateKey
  );

  console.log(ciphertext)

  const ciphertextHex = sodium.to_hex(ciphertext);
  const nonceHex = sodium.to_hex(nonce);
  const publicKeyHex = sodium.to_hex(publicKey);
  const privateKeyHex = sodium.to_hex(privateKey)

  const details = {
    ciphertext: ciphertextHex,
    nonce: nonceHex,
    publicKey: publicKeyHex,
    privateKey: privateKeyHex
  };
  
  try {
    await fs.writeFile('details.json', JSON.stringify(details, null, 2));
    console.log("Details saved to details.json");
  } catch (err) {
    console.error("Error writing to file", err);
  }
})();

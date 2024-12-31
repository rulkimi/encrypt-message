import _sodium from 'libsodium-wrappers';
import fs from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();

await (async () => {
  await _sodium.ready;
  const sodium = _sodium;

  try {
    const fileContent = await fs.readFile('details.json', 'utf8');
    const { ciphertext, nonce, publicKey, privateKey } = JSON.parse(fileContent);

    const ciphertextUint8 = sodium.from_hex(ciphertext);
    const nonceUint8 = sodium.from_hex(nonce);
    const senderPublicKeyUint8 = sodium.from_hex(publicKey);
    const privateKeyUint8 = sodium.from_hex(privateKey)

    const recipientPublicKey = sodium.from_hex(process.env.RECIPIENT_PUBLIC_KEY);

    const decryptedMessage = sodium.crypto_box_open_easy(
      ciphertextUint8,
      nonceUint8,
      recipientPublicKey,
      privateKeyUint8
    );

    const messageString = sodium.to_string(decryptedMessage);
    const messageObject = JSON.parse(messageString);
    console.log("Decrypted Message:", messageObject);
  } catch (err) {
    console.error("Error decrypting message", err);
  }
})();

# Assessment Solution

This README provides steps to execute the web3 and Libsodium-based assessment tasks.

## Structure

- **Part 1**: Message Encryption (in `part-1` folder)
  - `encrypt.mjs`: Encrypts the message.
  - `check.mjs`: Verifies encryption.
- **Part 2**: Send Message via Web3 (in `part-2` folder)
  - `index.html`: Frontend to send encrypted message.

## Requirements

1. **Node.js** (Part 1)
2. **Metamask** (Part 2)
3. **Live Server** (or any HTTP server for Part 2)

## Part 1: Message Encryption

1. Navigate to `part-1` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Encrypt message:
   ```bash
   node encrypt.mjs
   ```
4. Verify encryption:
   ```bash
   node check.mjs
   ```

## Part 2: Send Message via Web3

1. Navigate to `part-2` folder.
2. Serve `index.html` using a live server:
   ```bash
   live-server
   ```
3. Open the page in a browser and connect Metamask.
4. Click **Send Message** to dispatch the transaction.
5. Record the transaction hash.


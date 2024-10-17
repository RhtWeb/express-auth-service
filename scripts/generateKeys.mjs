import crypto from "crypto";
import fs from "fs";

const {
  publicKey,
  privateKey,
} = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
    // cipher: 'aes-256-cbc',
    // passphrase: 'top secret',
  },
});

console.log({
  publicKey,
  privateKey,
});

fs.writeFileSync("certs/private.pem", privateKey);
fs.writeFileSync("certs/public.pem", publicKey);

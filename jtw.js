import jwt from 'jsonwebtoken';

export default function criaJWT() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

  const now = Math.floor(Date.now() / 1000);

  const payload = {
    iss: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    scope: 'https://www.googleapis.com/auth/androidpublisher',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600
  };

  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    keyid: process.env.GOOGLE_PRIVATE_KEY_ID
  });
}

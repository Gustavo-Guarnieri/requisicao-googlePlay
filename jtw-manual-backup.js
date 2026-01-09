import crypto from 'crypto';

export default function criaJWT(){
    function base64url(input) {
    return Buffer.from(input)
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    }

    const privateKey = process.env.google_private_key
    
    const header = {
    "alg":"RS256",
    "typ":"JWT", 
    "kid": process.env.google_id_private_key
    } 

    // Obtém o timestamp atual em segundos (iat)
    const iat = Math.floor(Date.now() / 1000);

    // Define a expiração para exatamente 3.600 segundos depois (60 minutos)
    const exp = iat + 3600;

    const payload = {
    "iss": process.env.google_service_account_email,
    "scope": "https://www.googleapis.com/auth/androidpublisher",
    "aud": "https://oauth2.googleapis.com/token",
    "exp": exp,
    "iat": iat
    }

    // Codificação do header e payload
    const encodedHeader = base64url(JSON.stringify(header));
    const encodedPayload = base64url(JSON.stringify(payload));

    // signingInput = base64url(header) + "." + base64url(payload)
    const signingInput = `${encodedHeader}.${encodedPayload}`;

    // Assinatura RSA SHA256
    const signature = crypto
    .createSign('RSA-SHA256')
    .update(signingInput)
    .sign(privateKey);

    // Converter assinatura para Base64URL
    const encodedSignature = signature.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

    const jwt = `${encodedHeader}.${encodedPayload}.${encodedSignature}`
    
    return jwt
} 


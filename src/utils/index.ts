import Speakeasy from 'speakeasy';

export function createSecret() {
  const secret = Speakeasy.generateSecret({length: 7});
  const secretGenerated = secret.base32;
  return secretGenerated
}

import Speakeasy from "speakeasy";

export async function createSecret() {
  const secret = Speakeasy.generateSecret({ length:10});
  const secretGenerated = secret.base32
  return secretGenerated
}

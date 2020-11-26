import Speakeasy from "speakeasy";

export async function createSecret() {
  const secret = Speakeasy.generateSecret({ length: 10});
  const secretGenerated = secret.base32
  return secretGenerated
}

export async function createToken() {
  const token = {
    token: Speakeasy.totp({
      secret: await createSecret(),
      encoding: "base32"
    }),
    remaining: (120 - Math.floor((new Date()).getTime() / 1000.0 % 30)),
  }
  return token
}


app.post("/totp-validate", (request, response) => {
  const {secret, token} = request.body
  console.log(secret, token)
  response.send({
    "valid": Speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
      window: 0
    })
  })
 });

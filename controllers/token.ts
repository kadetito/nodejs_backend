import jwt from "jsonwebtoken";
import usuarios from "../router/router.usuarios";

export default class Token {
  private static seed: string = "43735032A";
  private static caducidad: string = "30d";

  constructor() {}

  static getJwtToken(payload: any): string {
    return jwt.sign(
      {
        usuarios: payload,
      },
      this.seed,
      { expiresIn: this.caducidad }
    );
  }

  static comprobarToken(userToken: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(userToken, this.seed, (err, decoded) => {
        if (err) {
          reject();
        } else {
          resolve(decoded);
        }
      });
    });
  }
}

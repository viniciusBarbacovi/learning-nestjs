import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') { // <-- 'jwt'
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'minha_chave_secreta',
    });
  }

  async validate(payload: any) {
    console.log("PAYLOAD:", payload);
    return { sub: payload.sub, email: payload.email };
  }
}


// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: 'minha_chave_secreta', // ⚡ mesma usada no JwtModule
//     });
//   }

//   async validate(payload: any) {
//     return { sub: payload.sub, email: payload.email }; // payload -> req.user
//   }
// }

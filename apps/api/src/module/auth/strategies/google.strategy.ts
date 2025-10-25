// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, VerifyCallback } from 'passport-google-oauth20';
// import { Injectable } from '@nestjs/common';

// interface Profile {
//   id: string;
//   displayName: string;
//   name?: {
//     familyName?: string;
//     givenName?: string;
//   };
//   emails?: Array<{ value: string }>;
//   photos?: Array<{ value: string }>;
// }

// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
//   constructor() {
//     super({
//       clientID: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL!,
//       scope: ['email', 'profile'],
//     });
//   }
//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: Profile,
//     done: VerifyCallback,
//   ) {
//     const email = profile.emails?.[0]?.value ?? '';
//     const name = profile.name?.givenName ?? profile.displayName ?? '';
//     const picture = profile.photos?.[0]?.value ?? '';
//     const user = {
//       email,
//       name,
//       picture,
//     };
//     done(null, user);
//   }
// }

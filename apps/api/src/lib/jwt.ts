import { SignJWT, jwtVerify } from 'jose';

export interface AuthJwtPayload {
  sub: string;
  email: string;
}

const getSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  return new TextEncoder().encode(secret);
};

export const signAccessToken = async (payload: AuthJwtPayload) =>
  new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecretKey());

export const verifyAccessToken = async (
  token: string,
): Promise<AuthJwtPayload> => {
  const { payload } = await jwtVerify(token, getSecretKey());

  if (typeof payload.sub !== 'string' || typeof payload.email !== 'string') {
    throw new Error('Invalid token payload');
  }

  return {
    sub: payload.sub,
    email: payload.email,
  };
};

export const getBearerToken = (authorization?: string) => {
  if (!authorization?.startsWith('Bearer ')) {
    return null;
  }
  return authorization.slice(7).trim() || null;
};

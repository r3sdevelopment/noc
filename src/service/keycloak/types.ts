
export interface KeycloakConfig {
    url: string;
    realm: string;
    clientId: string;
}

export interface JWK {
    keys: {
        kid: string;
        kty: 'RSA';
        alg: 'RS256';
        use: 'sig';
        n: string;
        e: 'AQAB';
        x5c: string[];
        x5t: string[];
        'x5t#S256': string[];
    }[];
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: string;
    'not-before-policy': number;
    session_state: string;
    scope: string;
}

export interface Roles {
    roles: string[];
}
export interface RealmAccess extends Roles {}

export interface ResourceAccess {
    [K: string]: Roles;
}

export interface VerifiedToken {
    exp: number;
    iat: number;
    jti: string;
    iss: string;
    aud: string[];
    sub: string;
    typ: string;
    azp: string;
    session_state: string;
    acr: string;
    realm_access: RealmAccess;
    resource_access: ResourceAccess;
    scope: string;
    sid: string;
    email_verified: boolean;
    roles: string[];
    name: string;
    preferred_username: string;
    given_name: string;
    family_name: string;
    email: string;
}

export interface Keys {
    keys: any[]
}

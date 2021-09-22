import axios from 'axios';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

// Types
import { VerifiedToken, Keys } from './types';

export class Token {
    public url: string;
    public realm: string;
    public clientId: string;
    public rawToken?: string;
    private _jwksUrl: string;
    private _tokenUrl: string;
    private verifiedToken?: VerifiedToken;

    constructor(url: string, realm: string, clientId: string) {
        this.url = url;
        this.realm = realm;
        this.clientId = clientId;
        this._jwksUrl = `${this.url}/auth/realms/${this.realm}/protocol/openid-connect/certs`;
        this._tokenUrl = `${this.url}/auth/realms/${this.realm}/protocol/openid-connect/token`;
    }

    async verify(token: string): Promise<void> {
        const {data} = await axios.get<Keys>(this._jwksUrl);
        const decoded = jwt.decode(token, { complete: true });
        const jwk = data.keys.find((key) => key.kid === decoded?.header.kid)
        if (jwk) {
            const pem = jwkToPem(jwk);
            const verifiedToken = jwt.verify(token, pem) as VerifiedToken;

            this.verifiedToken = verifiedToken
        }

        console.log('IAT', this.issuedAt)
        console.log('EXP', this.expiresAt)
    }

    get jwksUrl(): string {
        return this._jwksUrl;
    }

    get tokenUrl(): string {
        return this._tokenUrl;
    }

    get valid(): boolean {
        return !!this.verifiedToken;
    }

    get issuedAt(): Date | null {
        if (!this.verifiedToken) {
            return null
        }
        return new Date(this.verifiedToken.iat * 1000)
    }

    get expiresAt(): Date | null {
        if (!this.verifiedToken) {
            return null
        }
        return new Date(this.verifiedToken.exp * 1000)
    }

    get profile() {
        const { email, family_name, given_name, name } = this.verifiedToken || {}

        return {
            email,
            familyName: family_name,
            givenName: given_name,
            fullName: name,


        }
    }

    hasRole(role: string | string[]): boolean {
        if (Array.isArray(role)) {
            return role.some(r => !!this.verifiedToken?.roles.includes(r))
        }

        return !!this.verifiedToken?.roles.includes(role)
    }

    hasRealmRole(role: string | string[]): boolean {
        if (Array.isArray(role)) {
            return role.some(r => !!this.verifiedToken?.realm_access.roles.includes(r))
        }
        return !!this.verifiedToken?.realm_access.roles.includes(role)
    }
}
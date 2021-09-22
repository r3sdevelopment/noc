import { Keycloak } from './keycloak';
import jwksClient from 'jwks-rsa';
import jwt from 'jsonwebtoken';

jest.mock('jwks-rsa', () => {
    return {
        __esModule: true,
        default: jest.fn(() => {
            return {
                getSigningKey: jest.fn(),
            };
        }),
        foo: jest.fn(() => 43),
    };
});

jest.mock('jsonwebtoken', () => {
    return {
        __esModule: true,
        default: {
            verify: jest.fn(),
        },
        foo: jest.fn(() => 43),
    };
});

describe('Keycloak', () => {
    process.env.KEYCLOAK_URL = 'env_url';
    process.env.KEYCLOAK_REALM = 'env_realm';
    process.env.KEYCLOAK_CLIENT_ID = 'env_client_id';

    it('accepts the config being passed and overwrites ENV', () => {
        expect.assertions(3);
        const kc = new Keycloak({ url: 'url', realm: 'realm', clientId: 'clientId' });

        expect(kc.url).toBe('url');
        expect(kc.realm).toBe('realm');
        expect(kc.clientId).toBe('clientId');
    });

    it('accepts a config through env variables only', () => {
        expect.assertions(3);
        const kc = new Keycloak();

        expect(kc.url).toBe('env_url');
        expect(kc.realm).toBe('env_realm');
        expect(kc.clientId).toBe('env_client_id');
    });

    it('creates the token', () => {
        expect.assertions(1);
        const kc = new Keycloak();

        expect(kc.token).toBeDefined();
    });

    describe('token', () => {
        const kc = new Keycloak();

        it('sets the JWK URL', () => {
            expect.assertions(1);
            expect(kc.token.jwksUrl).toBe('env_url/auth/realms/env_realm/protocol/openid-connect/certs');
        });

        it('sets the token URL', () => {
            expect.assertions(1);

            expect(kc.token.tokenUrl).toBe('env_url/auth/realms/env_realm/protocol/openid-connect/token');
        });

        it.only('gets the correct key', async () => {
            const kc = new Keycloak();
            const client = jwksClient({
                jwksUri: 'http://test',
            });
            // const res = jwt.verify('token', 'getSigningKey', {});
            await kc.token.verify('token');
            expect(client.getSigningKey).toHaveBeenCalledWith('bla');
            expect(jwt.verify).toHaveBeenCalledWith('token', expect.any(Function), {}, expect.any(Function));
        });
    });
});

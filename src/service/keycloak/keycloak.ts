import axios from 'axios';
import {Token} from './token';
import { MissingConfigError } from './errors';

// Types
import { KeycloakConfig, LoginPayload, LoginResponse } from './types';

export class Keycloak {
    public url: string;
    public realm: string;
    public clientId: string;

    token: Token;

    constructor(config?: KeycloakConfig & Record<string, string>) {

        if (!config?.url || !config?.realm || !config?.clientId) {
            console.error(config);
            throw new MissingConfigError();
        }

        this.url = config.url;
        this.realm = config.realm;
        this.clientId = config.clientId;

        this.token = new Token(this.url, this.realm, this.clientId);

        console.log(this.url, this.realm, this.clientId, this.token)
    }

    async login(payload: LoginPayload): Promise<LoginResponse> {
        const { username, password } = payload;
        const params = new URLSearchParams();

        params.append('grant_type', 'password');
        params.append('client_id', this.token.clientId);
        params.append('username', username);
        params.append('password', password);

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };
        const { data } = await axios.post<LoginResponse>(this.token.tokenUrl, params, config);

        this.token.rawToken = data.access_token;
        this.token.verify(this.token.rawToken)

        return data;
    }
}



const keycloak = new Keycloak({
    url: 'https://id.r3s.dev',
    realm: 'r3s-dev',
    clientId: 'noc-r3s-dev',
});

export default keycloak
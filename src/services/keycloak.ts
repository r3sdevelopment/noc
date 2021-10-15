import { Keycloak } from "@r3s-dev/keycloak-js";

export const keycloak = new Keycloak({
    clientId: 'noc-r3s-dev',
    url: 'https://id.r3s.dev',
    realm: 'r3s-dev'
})

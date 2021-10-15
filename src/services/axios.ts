import { axiosClient } from "@r3s-dev/keycloak-js";
import { keycloak } from "./keycloak";

export const axios = axiosClient(keycloak);

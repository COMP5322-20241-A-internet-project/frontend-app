import { jwtDecode } from "jwt-decode";
export function decodeJwt(jwt){
    const decoded = jwtDecode(jwt);
    return decoded
}
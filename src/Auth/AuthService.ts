import { getServiceEndpoint } from "../ServiceEndpoint"

export async function login(username: string, password: string) {
    const options: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
    }
    return await fetch(getServiceEndpoint("login"), options);
}
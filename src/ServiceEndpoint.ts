
const endpoint = buildEndpoint();

function buildEndpoint() {
    let endpoint = `${import.meta.env.VITE_SERVICE_PROTO}://${import.meta.env.VITE_SERVICE_HOSTNAME}`;
    if (typeof import.meta.env.VITE_SERVICE_PORT !== 'undefined') {
        endpoint += ":" + import.meta.env.VITE_SERVICE_PORT;
    }
    return endpoint;
}

export function getServiceEndpoint(path: string) {
    return `${endpoint}/${path}`;
}